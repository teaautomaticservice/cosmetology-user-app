import React from "react";
import { Modal, Input } from 'antd';
import { Controller } from 'react-hook-form';

import { useMessageModal } from "./services/useMessageModal";
import { dateUtils } from "../../../../utils/dateUtils";

export const MessageModal: React.FC = () => {
  const { isOpen, close, history, submitForm, formControl, okClick } = useMessageModal();

  if (!history) {
    return null;
  }

  const date = dateUtils.formattedDateWithTime(new Date(history.date));
  const title = `Message from '${history.owner}' Date: ${date}`;

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={okClick}
      // confirmLoading={confirmLoading}
      onCancel={close}
    >
      <h4>Old message:</h4>
      <p>{history.message}</p>
      <h3>Enter new message</h3>
      <form action="/" onSubmit={submitForm}>
        <Controller name="message" control={formControl} render={({ field } ) => <Input {...field }/>}/>
      </form>
    </Modal>
  );
} 
