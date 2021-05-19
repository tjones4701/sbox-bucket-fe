import { PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { fetchPlayerEvents } from '../../../lib/sbucket-api/playerEvents';
import Link from '../../design-system/Link';


export interface IEventList {
    organisationId: string,
    code?: string,
    playerIds?: string[];
    canCreateNew?: boolean
}
const EventList: React.FC<IEventList> = ({ organisationId, playerIds, canCreateNew }) => {

    const [page, setPage] = useState(0);
    const pagination = {
        current: page + 1,
        pageSize: 10,
    };

    let { value, loading } = useAsync(async () => {
        let events = await fetchPlayerEvents(organisationId, playerIds, pagination?.current, page);
        return events;
    }, [page, playerIds, organisationId]);

    let playerData = value ?? [];

    const handleTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        let data = ({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };


    const columns = [
        {
            title: 'PlayerId',
            dataIndex: 'playerId',
            key: 'playerId',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Metadata',
            dataIndex: 'metadata',
            key: 'metadata',
        },
    ];

    return (
        <>
            <div>
                <Link button href={`/organisation/${organisationId}/events`} icon={<PlusCircleOutlined />}>Create New</Link>
            </div>
            <Table
                columns={columns}
                rowKey={record => record.playerId}
                dataSource={playerData}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    );
}

export default EventList;