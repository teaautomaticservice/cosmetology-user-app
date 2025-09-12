import React from "react";
import { dateUtils } from "@shared/utils/dateUtils";
import { useHistoryMessagesStore } from "@stores/historyMessages";
import { useModalStore } from "@stores/modal";
import { History } from "@typings/api/historyMessage";
import { MODALS_TYPE } from "@typings/modals";
import { Button,Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


export const TableMessages: React.FC = () => {

  const { historyMessages, isHistoryLoading, deleteHistoryMessage } = useHistoryMessagesStore();
  const { open } = useModalStore();
  
  const deleteMessage = async (id: number) => {
    deleteHistoryMessage(id.toString())
  }
  
  const editMessage = (history: History) => {
    open(MODALS_TYPE.HISTORY, { history });
  }

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
    <Table columns={columns} dataSource={historyMessages} rowKey={"id"} loading={isHistoryLoading} />
  );
};
