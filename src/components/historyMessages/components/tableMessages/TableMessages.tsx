import React from "react";
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { History } from "../../../../typings/api/historyMessage";
import { useTableMessages } from "./services/useTableMessages";
import { dateUtils } from "../../../../utils/dateUtils";


export const TableMessages: React.FC = () => {
  const { data, deleteMessage, editMessage, isHistoryLoading } = useTableMessages();

  const columns: ColumnsType<History> = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '150px',
      render: (date: string) => <span>{dateUtils.formattedDateWithTime(new Date(date))}</span>,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '100px',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'id',
      width: '300px',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'id',
    },
    {
      title: 'Action',
      key: 'action',
      width: '200px',
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" htmlType="button" size="small" onClick={() => editMessage(record)}>
            Change message
          </Button>
          <Button type="default" htmlType="button" size="small" onClick={() => deleteMessage(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return(
    <Table columns={columns} dataSource={data} rowKey={"id"} loading={isHistoryLoading} />
  );
};
