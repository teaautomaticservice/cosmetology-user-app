import React from 'react';
import { dateUtils } from '@shared/utils/dateUtils';
import { useHistoryMessagesStore } from '@stores/historyMessages';
import { useModalStore } from '@stores/modal';
import { History } from '@typings/api/historyMessage';
import { Input, Modal } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { UpdateMessageForm } from './types';

type Props = {
  history: History;
}

export const MessageModal: React.FC<Props> = ({ history }) => {
  const { isOpen, close } = useModalStore();
  const { updateHistoryMessageById } = useHistoryMessagesStore();
  const { handleSubmit, control: formControl, reset, getValues } = useForm({
    defaultValues: {
      message: '',
    }
  });

  const updateMessage: SubmitHandler<UpdateMessageForm> = async ({ message }) => {
    if (!history) {
      return null;
    }

    await updateHistoryMessageById(history.id.toString(), message);
    close();
    reset();
  };

  const okClick = () => updateMessage(getValues());
  const submitForm = handleSubmit(updateMessage);

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
}; 
