import { PlusCircleOutlined } from '@ant-design/icons'
import { Avatar, Card, Skeleton } from 'antd'
import List from 'antd/lib/list'
import React from 'react'
import { random } from '../../../lib/common/random'
import { SBucketServer } from '../../../lib/sbucket-api/types.ts/SBucketServer'
import Link from '../../design-system/Link'
import JsonEditor from '../JsonEditor'

export interface IServerList {
    organisationId: string;
    loading?: boolean;
    servers: SBucketServer[],
    canCreateNew?: boolean
}
const ServerList: React.FC<IServerList> = ({ organisationId, servers, canCreateNew, loading }) => {
    servers = servers ?? [];
    if (loading) {
        servers = ([{}, {}] as any);
    }

    return (
        <Card title={"Servers"}>
            <List
                footer={canCreateNew && organisationId != null && (
                    <div>
                        <Link button href={`/organisation/${organisationId}/server`} icon={<PlusCircleOutlined />}>Create New</Link>
                    </div>
                )}
                bordered
                locale={{
                    emptyText: "No servers found"
                }}
                dataSource={servers}
                renderItem={(item) => {
                    if (loading) {
                        return (
                            <List.Item>
                                <Skeleton active />
                            </List.Item>
                        )
                    }
                    let inner = (
                        <div>
                            <b>Host </b>
                            <br />{item.host}
                            <br />
                            <b>Metadata</b>
                            <br />
                            <JsonEditor value={item?.metadata} readOnly />
                        </div>
                    );

                    return (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`/images/shrek${random.integer(1, 5)}.png`} />}
                                title={<Link href={`/organisation/${item.organisationId}/server/${item.id}`}>{item.name}</Link>}
                                description={inner}
                            />
                        </List.Item>
                    )
                }}
            />
        </Card>
    )
}

export default ServerList