import { SubmitHandler,useForm } from 'react-hook-form';

import { historyMessagesMethods } from "../../../../../apiMethods/historyMessages";
import { useHistoryMessagesStore } from '../../../../../stores/historyMessages';
import { useModalStore } from "../../../../../stores/modal";
import type { UpdateMessageForm } from "../types";

export const useMessageModal = () => {
  const { isOpen, close, history } = useModalStore();
  const { updateHistoryMessages } = useHistoryMessagesStore();
  const { handleSubmit, control: formControl, reset, getValues } = useForm({
    defaultValues: {
      message: "",
    }
  });

  const updateMessage: SubmitHandler<UpdateMessageForm> = async ({ message }) => {
    if (!history) {
      return null;
    }

    const { data } = await historyMessagesMethods.updateHistory(history.id, message);
    updateHistoryMessages(data);
    close();
    reset();
  };

  const okClick = () => updateMessage(getValues());
  const submitForm = handleSubmit(updateMessage);

  return {
    history,
    isOpen,
    close: () => close(),
    submitForm,
    formControl,
    okClick,
  }
}