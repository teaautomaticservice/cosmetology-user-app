import React from "react";
import { Input, Button, Space } from 'antd';
import { Controller } from 'react-hook-form';

import { style } from "./style";
import { useAddMessageForm } from "./services/useAddMessageForm";

export const AddMessageForm: React.FC = () => {
  const { formControl, submitForm } = useAddMessageForm();

  return (
    <>
      <h3>Add message</h3>
      <form action="" onSubmit={submitForm} >
        <Space direction="vertical">
          <Controller name="message" control={formControl} render={({ field } ) => <Input {...field }/>}/>
          <Button type="primary" htmlType="submit" style={style.buttonForm}>Отправить запрос</Button>
        </Space>
      </form>
    </>
  );
};
