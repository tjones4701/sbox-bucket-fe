import { Button, Form, Input, message, Modal, PageHeader, Spin } from "antd";
import React, { useState } from "react";
import "reflect-metadata";
import { useNavigation } from "../../../hooks/useNavigation";
import exceptionModal from "../../../lib/exceptionModal";
import { fetchPlayer, savePlayer } from "../../../lib/sbucket-api/players";
import { SBucketPlayer } from "../../../lib/sbucket-api/types.ts/SBucketPlayer";
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

interface IPlayer {
    redirectOnSave?: boolean;
    player: SBucketPlayer,
    onSave: (player: SBucketPlayer) => Promise<void>

}
const PlayerEditor: React.FC<IPlayer> = ({ player, onSave }) => {
    const [disabled, setDisabled] = useState(false);
    const isNew = player?.playerId == null;
    const organisationId = player?.organisationId;
    const navigate = useNavigation();


    const onFinish = async (values: any) => {

        if (isNew) {
            let newPlayerId = values?.playerId;
            let existing = await fetchPlayer(player?.organisationId, newPlayerId);
            if (existing != null) {
                Modal.error({
                    title: "Error creating player",
                    content: (
                        <>
                            Player already exists with this player id. Unable to create new.
                            <br />
                            <a href={`/organisation/${player?.organisationId}/player/${newPlayerId}`} target='_blank'>
                                Click here to view this player.
                            </a>
                        </>
                    )
                })
            }
        }

        setDisabled(true);
        try {
            let newPlayer = { ...player, ...values };
            newPlayer = await savePlayer(newPlayer);
            if (onSave != null) {
                await onSave(newPlayer);
            }
            if (isNew) {
                navigate(`/organisation/${organisationId}/player/${player.playerId}`);
            }
            message.success("Player saved!");
        } catch (e) {
            exceptionModal('Error creating player', e);
        }
        setDisabled(false);
    };

    const onJsonChange = (value) => {
        return value;
    }

    return (
        <div>
            <PageHeader>
                {player?.playerId == null ? 'New Player' : `Player Details - ${player?.name}`}
            </PageHeader>
            <Spin spinning={disabled} tip="Saving...">
                <Form initialValues={player}  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    {player?.playerId == null &&
                        <Form.Item name={['playerId']} label="Player Id" tooltip="Recommended to be their steam id.">
                            <Input />
                        </Form.Item>
                    }
                    {player?.playerId != null &&
                        <Form.Item name={['playerId']} label="Player Id">
                            <Input readOnly />
                        </Form.Item>
                    }
                    <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['metadata']} label="metadata" tooltip="To remove a property, set this as null." getValueFromEvent={onJsonChange}>
                        <JsonEditor onChange={onJsonChange} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button disabled={disabled} type="primary" htmlType="submit">
                            Save Player
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div >
    )
};

export default PlayerEditor
