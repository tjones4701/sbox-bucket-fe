import { PlusCircleOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import List from 'antd/lib/list'
import React from 'react'
import { random } from '../../../lib/common/random'
import { SBucketPlayer } from '../../../lib/sbucket-api/types.ts/SBucketPlayer'
import Link from '../../design-system/Link'

export interface IPlayerList {
    organisationId: string,
    players: SBucketPlayer[],
    canCreateNew?: boolean
}
const PlayerList: React.FC<IPlayerList> = ({ organisationId, players, canCreateNew }) => {
    return (
        <>
            <List
                header={<div>Your Players</div>}
                footer={canCreateNew && (
                    <div>
                        <Link button href={`/organisation/${organisationId}/player`} icon={<PlusCircleOutlined />}>Create New</Link>
                    </div>
                )}
                locale={{
                    emptyText: "No players have been added yet."
                }}
                bordered
                dataSource={players ?? []}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`/images/shrek${random.integer(1, 7)}.png`} />}
                            title={<Link href={`/organisation/${organisationId ?? ""}/player/${item?.playerId}`}>{item?.name ?? item.playerId ?? "Player"}</Link>}
                            description={item.playerId}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default PlayerList