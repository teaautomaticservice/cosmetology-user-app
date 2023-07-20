import React, { FormEventHandler } from "react";
import { Layout, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import { style } from "./style";

const { Header, Content, Sider } = Layout;

export const HistoryMessage: React.FC = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      message: "",
    }
  });
  
  const formSubmitHandler = handleSubmit((data: unknown) =>
    // TODO: Mock handler
    console.log('Submit!', data)
  );

  return (
    <Layout style={style.layout}>
      <Sider style={style.leftSider}>
        <h1>Sider</h1>
        <form action="" onSubmit={formSubmitHandler}>
          <Controller name="message" control={control} render={({ field } ) => <Input {...field }/>}/>
        </form>
      </Sider>
      <Layout>
        <Header style={style.header}>
          <h1>Header</h1>
        </Header>
        <Content style={style.content}>
          <h1>Content</h1>
        </Content>
      </Layout>
    </Layout>
  );
};
