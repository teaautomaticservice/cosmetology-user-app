import { useHistoryMessagesStore } from "@stores/historyMessages";
import { UserDataApiError } from "@typings/errors";
import { Button, Form, Input } from "antd"
import cn from "classnames";

import s from './headerHistory.module.css';

type MessageForm = {
  message: string;
}

type Props = {
  className?: string;
}

export const HeaderHistory: React.FC<Props> = ({ className }) => {
  const {
    isHistoryLoading,
    updateHistoryMessagesFromApi,
    createHistoryMessage,
  } = useHistoryMessagesStore();
  const [formInstance] = Form.useForm<MessageForm>();

  const submit = async ({ message }: MessageForm) => {
    try {
      await createHistoryMessage(message);
    } catch (e) {
      const { statusCode, message } = e as UserDataApiError;

      if (statusCode === 400) {
        if (message) {
          formInstance.setFields([{
            name: 'message',
            errors: [message],
          }])
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <Form
        layout="vertical"
        name="historyMessage"
        autoComplete="off"
        onFinish={submit}
        disabled={isHistoryLoading}
        form={formInstance}
        className={cn(s.section, s.form)}
      >
        <Form.Item<MessageForm>
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input new message!' }]}
          className={s.formItem}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Send</Button>
        </Form.Item>
      </Form>
      <div className={s.section}>
        <Button
          type="primary"
          loading={isHistoryLoading}
          onClick={() => updateHistoryMessagesFromApi()}
        >
          Refresh data
        </Button>
      </div>
    </div>
  )
}