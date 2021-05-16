import { Button, Card, Form, Input, Skeleton, Spin } from "antd";
import React, { useState } from "react";
import "reflect-metadata";
import { useNavigation } from "../../../hooks/useNavigation";
import exceptionModal from "../../../lib/exceptionModal";
import { saveOrganisation } from "../../../lib/sbucket-api/organisations";
import { SbucketOrganisation } from "../../../lib/sbucket-api/types.ts/SBucketOrganisation";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

interface IOrganisationEditor {
    organisation: SbucketOrganisation,
    redirectOnSave?: boolean;
    onSave?: (organisation: SbucketOrganisation) => Promise<void>
}

const OrganisationEditor: React.FC<IOrganisationEditor> = ({ organisation, onSave, redirectOnSave }) => {
    let navigate = useNavigation();

    const [disabled, setDisabled] = useState(false);
    const isNew = organisation?.id == null;

    const onFinish = async (values: any) => {

        setDisabled(true);
        try {
            let newOrganisation = { ...organisation, ...values };
            console.log(newOrganisation);
            newOrganisation = await saveOrganisation(newOrganisation);
            if (onSave != null) {
                await onSave(newOrganisation);
            }
            if (redirectOnSave) {
                navigate(`/organisation/${newOrganisation?.id}`);
            }
        } catch (e) {
            console.error(e);
            exceptionModal('Error creating organisation', e);
        }
        setDisabled(false);
    };

    let title = isNew ? 'New Organisation' : `Organisation - ${organisation?.name}`;

    if (organisation == null) {
        return <Skeleton />;
    }

    return (
        <Card title={title}>
            <Spin spinning={disabled} tip="Saving...">
                {organisation != null && (
                    <Form initialValues={organisation} {...layout} name="Organisation" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={['name']} label="Name" rules={[{ required: true }]} tooltip="Must be unique">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['description']} label="Description">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['website']} label="Website">
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Save
                        </Button>
                        </Form.Item>
                    </Form>
                )}
            </Spin>
        </Card>
    );

};

export default OrganisationEditor;
