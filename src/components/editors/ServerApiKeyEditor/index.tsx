import { PlusCircleOutlined } from "@ant-design/icons";
import { Alert, Button, List, Modal, Popconfirm, Spin, Tag, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "reflect-metadata";
import { isNonEmptyArray } from "../../../lib/common/inNonEmptyArray";
import { momentFormat } from "../../../lib/common/momentFormat";
import { createApiKey, fetchServerApiKeys } from "../../../lib/sbucket-api/serverApiKeys";


interface IServerApiKeyEditor {
    serverId: string;
    canCreateNew?: boolean
}
const ServerApiKeyEditor: React.FC<IServerApiKeyEditor> = ({ serverId, canCreateNew }) => {

    const [disabled, setDisabled] = useState(false);
    const [keys, setKeys] = useState([]);

    const loadKeys = async () => {
        setDisabled(true);
        let keys = await fetchServerApiKeys(serverId);
        keys.sort((a, b) => {
            if (a.active) {
                return -1;
            } else if (b.active) {
                return 1;
            }
            return 0;
        })
        setKeys(keys);
        setDisabled(false);
    }


    useEffect(() => {
        loadKeys();
    }, [serverId]);


    const isLoading = disabled;

    const generateKey = async () => {
        setDisabled(true);
        let newKey = await createApiKey(serverId);
        loadKeys();
        let message = (
            <>
                Please note, this secret will not be accessible once you close this modal. Please copy this and keep it in a safe space.
            </>
        );

        let content = (
            <>
                <Alert type="warning" message={message} />
                <hr />
                <b>Key: </b>
                { newKey.id}
                <br />
                <br />
                <b>Secret: </b>
                { newKey.key}
            </>
        )

        Modal.info({
            title: "Api Key",
            content: content,
        });
    }

    let createButton = null;
    if (canCreateNew) {
        if (isNonEmptyArray(keys)) {
            createButton = (
                <Popconfirm title="This will invalidate all existing api keys, Are you sure？" onConfirm={generateKey} okText="Yes" cancelText="No">
                    <Button icon={<PlusCircleOutlined />}>Create New</Button>
                </Popconfirm>
            )
        } else {
            createButton = <Button icon={<PlusCircleOutlined />} onClick={generateKey}>Create New</Button>
        }
    }

    return (
        <>
            <Spin spinning={isLoading}>
                <List
                    header={<div>Your Api Keys</div>}
                    footer={createButton}
                    bordered
                    dataSource={keys ?? []}
                    renderItem={item => {
                        let title = item?.id;
                        if (item.active) {
                            title = <><Tag color="green">ACTIVE</Tag> {item.id}</>
                        } else {
                            title = <><Tag color="red">INACTIVE</Tag> {item.id}</>
                        }

                        return (
                            <List.Item>
                                <List.Item.Meta
                                    title={title}
                                    description={<Tooltip title={moment(item?.createdAt).toISOString()}>Created {momentFormat.shortDayMonthYearYY(item?.createdAt)}</Tooltip>}
                                />
                            </List.Item>
                        );
                    }}
                />
            </Spin>
        </>
    );
};

export default ServerApiKeyEditor
