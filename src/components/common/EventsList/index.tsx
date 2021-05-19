import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { Fragment, useState } from 'react';
import { useAsync } from 'react-use';
import { uniqueArray } from '../../../lib/common/uniqueArray';
import { fetchPlayerEvents } from '../../../lib/sbucket-api/playerEvents';
import { SBucketPlayerEvent } from '../../../lib/sbucket-api/types.ts/SBucketPlayerEvent';
import Link from '../../design-system/Link';
import JsonEditor from '../JsonEditor';
import styles from "./styles.module.scss";


export interface IEventList {
    organisationId: string,
    code?: string,
    playerIds?: string[];
    canCreateNew?: boolean
}
const EventList: React.FC<IEventList> = ({ organisationId, playerIds, canCreateNew, code }) => {

    const [page, setPage] = useState(0);
    const [events, setEvents] = useState([]);


    let { loading } = useAsync(async () => {
        let pageToLoad = Math.ceil(((events ?? []).length) / 10);
        let newEvents = await fetchPlayerEvents(organisationId, playerIds, code, pageToLoad);
        let allEvents: SBucketPlayerEvent[] = uniqueArray([...events, ...newEvents], 'id');

        allEvents = allEvents.sort((a, b) => {
            return b?.createdAt.localeCompare(a?.createdAt ?? "");
        });

        setEvents(allEvents);
        return allEvents;
    }, [page, playerIds, organisationId]);

    const loadMore = () => {
        setPage(page + 1);
    };

    const showModal = (data) => {
        let dataToShow = {
            id: data?.id,
            created: data?.createdAt,
            code: data?.code,
            playerId: data?.playerId,
            metadata: data?.metadata ?? {}
        }
        Modal.info({
            title: "JSON Data",
            content: <JsonEditor readOnly value={dataToShow} />
        });
    }


    const columns = [
        {
            Title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
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
            title: 'Details',
            render: (text, record, index) => {
                return (
                    <Fragment key={index}>
                        <Button onClick={() => { showModal(record) }} type='primary'>View</Button>
                    </Fragment>
                )
            }
        },
    ];


    return (
        <>
            <div>
                <Link button href={`/organisation/${organisationId}/events`} icon={<PlusCircleOutlined />}>Create New</Link>
            </div>
            <Table
                pagination={false}
                columns={columns}
                rowKey={record => record.id}
                dataSource={events}
                loading={loading}
            />
            <div className={styles['load-more-button']}>
                <Button disabled={loading} type='primary' onClick={() => { loadMore() }}>Load more</Button>
            </div>

        </>
    );
}

export default EventList;