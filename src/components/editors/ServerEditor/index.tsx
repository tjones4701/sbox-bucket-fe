import { Button, Form, Input, PageHeader, Spin } from "antd";
import React, { useState } from "react";
import "reflect-metadata";
import exceptionModal from "../../../lib/exceptionModal";
import { SBucketServer } from "../../../lib/sbucket-api/types.ts/SBucketServer";
import JsonEditor from "../../common/JsonEditor";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!'
};
/* eslint-enable no-template-curly-in-string */

interface IServer {
    server: SBucketServer,
    onSave: (server: SBucketServer) => Promise<void>
}
const ServerEditor: React.FC<IServer> = ({ server, onSave }) => {
    const [disabled, setDisabled] = useState(false);
    const isNew = server?.id != null;

    const onFinish = async (values: any) => {
        if (onSave == null) {
            return;
        }
        setDisabled(true);
        try {
            let newServer = { ...server, ...values };
            await onSave(newServer);
        } catch (e) {
            exceptionModal('Error creating server', e);
        }
        setDisabled(false);
    };

    const onJsonChange = (value) => {
        return value;
    }

    return (
        <div>
            <PageHeader>
                {server?.id == null ? 'New Server' : `Server Details - ${server?.name}`}
            </PageHeader>
            <Spin spinning={disabled} tip="Saving...">
                <Form initialValues={server}  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['name']} label="Name" rules={[{ required: true }]} tooltip="Must be unique">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['host']} label="host">
                        <Input />
                    </Form.Item>
                    {server?.id != null && (
                        <Form.Item name={['metadata']} label="metadata" getValueFromEvent={onJsonChange}>
                            <JsonEditor onChange={onJsonChange} />
                        </Form.Item>
                    )}
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button disabled={disabled} type="primary" htmlType="submit">
                            Save Server
                </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div >
    )
};

export default ServerEditor
