import { PlusCircleOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import List from 'antd/lib/list'
import React from 'react'
import { random } from '../../../lib/common/random'
import { SbucketOrganisation } from '../../../lib/sbucket-api/types.ts/SBucketOrganisation'
import Link from '../../design-system/Link'

export interface IOrganisationList {
    organisations: SbucketOrganisation[],
    canCreateNew?: boolean
}
const OrganisationList: React.FC<IOrganisationList> = ({ organisations, canCreateNew }) => {

    return (
        <>
            <List
                header={<div>Your Organisations</div>}
                footer={canCreateNew && (
                    <div>
                        <Link button href='/organisation' icon={<PlusCircleOutlined />}>Create New</Link>
                    </div>
                )}
                locale={{
                    emptyText: "You are not part of any organisations."
                }}
                bordered
                dataSource={organisations}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`/images/shrek${random.integer(1, 7)}.png`} />}
                            title={<Link href={`/organisation/${item.id}`}>{item.name}</Link>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default OrganisationList