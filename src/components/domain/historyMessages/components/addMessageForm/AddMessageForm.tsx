import React from "react";
import { Button, Input, Space } from 'antd';
import { Controller } from 'react-hook-form';

import { useAddMessageForm } from "./services/useAddMessageForm";
import { style } from "./style";

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
