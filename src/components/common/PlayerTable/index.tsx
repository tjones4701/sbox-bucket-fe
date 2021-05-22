import { EyeFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Modal, PaginationProps, Table } from 'antd';
import React, { Fragment, useState } from 'react';
import { useAsync } from 'react-use';
import exceptionModal from '../../../lib/exceptionModal';
import { fetchPlayers } from '../../../lib/sbucket-api/players';
import Link from '../../design-system/Link';
import JsonEditor from '../JsonEditor';


export interface IPlayerTable {
    organisationId: string,
    code?: string,
    playerIds?: string[];
    canCreateNew?: boolean
}
const PlayerTable: React.FC<IPlayerTable> = ({ organisationId, playerIds, canCreateNew, code }) => {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);


    let { value, loading } = useAsync(async () => {
        if (organisationId != null && page != null) {
            try {
                let records = await fetchPlayers(organisationId, { playerIds: playerIds }, page - 1, itemsPerPage);
                return records;
            } catch (e) {
                exceptionModal("Unable to fetch players", e);
            }
        } else {
            return {
                count: 0,
                records: []
            }
        }
    }, [page, playerIds, organisationId, itemsPerPage]);
    const { count, records: players } = value ?? {};

    const pagination: PaginationProps = {
        pageSize: itemsPerPage,
        defaultPageSize: itemsPerPage,
        total: count ?? 0,
        current: page
    };

    const showModal = (data) => {
        let dataToShow = {
            created: data?.createdAt,
            name: data?.name,
            playerId: data?.playerId,
            metadata: data?.metadata ?? {}
        }
        Modal.info({
            title: "JSON Data",
            content: <JsonEditor readOnly value={dataToShow} />
        });
    }

    const handleChange = (pagination: PaginationProps, filters, sorter) => {
        if (page != pagination) {
            setPage(pagination.current ?? 1);
        }
        if (itemsPerPage != pagination.pageSize) {
            setItemsPerPage(pagination.pageSize);
        }
    }

    const columns = [
        {
            title: 'Details',
            render: (text, record, index) => {
                return (
                    <Fragment key={index}>
                        <Link size="small" button type="link" href={`/organisation/${organisationId}/player/${record.playerId}`}> <EyeFilled /> </Link> {record.playerId}
                    </Fragment>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            Title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt'
        }
    ];


    return (
        <>
            <div>
                <Link button href={`/organisation/${organisationId}/player`} icon={<PlusCircleOutlined />}>Create New</Link>
            </div>
            <Table
                pagination={pagination}
                columns={columns}
                rowKey={record => record.id}
                dataSource={players}
                loading={loading}
                onChange={handleChange}
            />
        </>
    );
}

export default PlayerTable;