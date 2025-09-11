import React from "react";
import { Button, Layout, Space } from 'antd';

// import { env } from '../../utils/env';
import { TableMessages } from "./components/tableMessages/TableMessages";
import { useHistoryMessage } from "./services/useHistoryMessage";
import { style } from "./style";

import s from './historyMessage.module.css';

const { Content } = Layout;

export const HistoryMessage: React.FC = () => {
  const { updateHistories, isHistoryLoading } = useHistoryMessage();

  // const testVars = () => {
  //   console.log(env.REACT_APP_API_URL);
  // }

  return (
    <div className={s.root}>
      <Content style={style.content}>
        <Space direction="vertical" style={style.tableWrap}>
          <Button type="primary" loading={isHistoryLoading} onClick={updateHistories}>Refresh data</Button>
          <TableMessages />
        </Space>
      </Content>
    </div>
  );
};
