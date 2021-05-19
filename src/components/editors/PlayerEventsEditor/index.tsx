import { Button, Form, Input, message, PageHeader, Spin } from "antd";
import React, { useState } from "react";
import "reflect-metadata";
import exceptionModal from "../../../lib/exceptionModal";
import { savePlayerEvents } from "../../../lib/sbucket-api/playerEvents";
import { SBucketPlayerEvent } from "../../../lib/sbucket-api/types.ts/SBucketPlayerEvent";
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

interface IPlayerEvent {
    redirectOnSave?: boolean;
    organisationId: string,
    onSave?: (playerEvent: SBucketPlayerEvent[]) => Promise<void>

}
const PlayerEventsEditor: React.FC<IPlayerEvent> = ({ organisationId, onSave }) => {
    const [disabled, setDisabled] = useState(false);

    const onFinish = async (values: any) => {
        setDisabled(true);
        try {
            let playerIds = (values?.playerIds?.split(',')).map((item) => {
                return item.trim();
            });

            let newEvents = [];
            for (let i in playerIds) {
                newEvents.push({
                    playerId: playerIds[i],
                    code: values?.code,
                    metadata: values?.metadata
                });
            }
            let payload = {
                organisationId: organisationId,
                events: newEvents
            }

            let events = await savePlayerEvents(payload);

            if (onSave != null) {
                await onSave(events);
            }
            let expected = newEvents.length;
            let actual = events.length;

            if (expected != actual) {
                message.warn(`${actual} Player Events created, we expected ${expected}!`);
            } else {
                message.success(`${actual} Player Events created!`);
            }


        } catch (e) {
            exceptionModal('Error creating playerEvent', e);
        }
        setDisabled(false);
    };

    const onJsonChange = (value) => {
        return value;
    }

    return (
        <div>
            <PageHeader>
                Player Events
            </PageHeader>
            <Spin spinning={disabled} tip="Saving...">
                <Form  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['playerIds']} label="Player Ids" tooltip="Comma seperated for more than 1 id" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['code']} label="Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['metadata']} label="metadata" tooltip="To remove a property, set this as null." getValueFromEvent={onJsonChange}>
                        <JsonEditor onChange={onJsonChange} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button disabled={disabled} type="primary" htmlType="submit">
                            Save PlayerEvent
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div >
    )
};

export default PlayerEventsEditor
