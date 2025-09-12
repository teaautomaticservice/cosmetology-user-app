import { useHistoryMessagesStore } from '@stores/historyMessages';
import { Button, Layout, Space } from 'antd';

import { TableMessages } from "./tableMessages/TableMessages";

import s from './historyMessage.module.css';

const { Content } = Layout;

export const HistoryMessage: React.FC = () => {
  const { updateHistoryMessagesFromApi, isHistoryLoading } = useHistoryMessagesStore();

  return (
    <div className={s.root}>
      <Content className={s.content}>
        <Space direction="vertical" className={s.tableWrap}>
          <Button
            type="primary"
            loading={isHistoryLoading}
            onClick={() => updateHistoryMessagesFromApi()}
          >
            Refresh data
          </Button>
          <TableMessages />
        </Space>
      </Content>
    </div>
  );
};
