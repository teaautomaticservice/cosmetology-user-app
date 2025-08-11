import React from "react";
import { Button, Layout, Space } from 'antd';

// import { env } from '../../utils/env';
import { AddMessageForm } from "./components/addMessageForm/AddMessageForm";
import { MessageModal } from "./components/messageModal/MessageModal";
import { TableMessages } from "./components/tableMessages/TableMessages";
import { useHistoryMessage } from "./services/useHistoryMessage";
import { style } from "./style";

const { Header, Content, Sider } = Layout;

export const HistoryMessage: React.FC = () => {
  const { updateHistories, isHistoryLoading } = useHistoryMessage();

  // const testVars = () => {
  //   console.log(env.REACT_APP_API_URL);
  // }

  return (
    <Layout style={style.layout}>
      <Sider style={style.leftSider}>
        <AddMessageForm />
      </Sider>
      <Layout>
        <Header style={style.header}>
          <h1>Header</h1>
        </Header>
        <Content style={style.content}>
          <Space direction="vertical" style={style.tableWrap}>
            <Button type="primary" loading={isHistoryLoading} onClick={updateHistories}>Refresh data</Button>
            <TableMessages />
          </Space>
        </Content>
      </Layout>
      <MessageModal />
    </Layout>
  );
};
