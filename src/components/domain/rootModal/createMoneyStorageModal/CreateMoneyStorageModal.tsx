import { INTERNAL_ERROR } from '@constants/errors';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useModalStore } from '@stores/modal';
import { UserDataApiError } from '@typings/errors';
import { addToast } from '@utils/domain/toastEventBus';
import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type FormData = {
  name: string;
  code: string;
  description?: string;
}

export const CreateMoneyStorageModal: React.FC = () => {
  const { modalType, close } = useModalStore();
  const {
    isCreateItemLoading,
    createMoneyStorage,
    updateAllMoneyStorages,
  } = useMoneyStoragesStore();
  const [formInstance] = Form.useForm<FormData>();

  const handleError = (e: UserDataApiError<FormData>) => {
    const { statusCode, cause } = e as UserDataApiError<FormData>;

    if (statusCode === 400 && cause) {
      Object.entries(cause).forEach(([name, errors]) => {
        formInstance.setFields([{
          name: name as keyof FormData,
          errors,
        }]);
      });
    } else {
      addToast({
        type: 'error',
        description: (e as UserDataApiError)?.message ?? INTERNAL_ERROR,
      });
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      await createMoneyStorage(values);
      updateAllMoneyStorages();
      close();
      addToast({
        description: 'New money storage has been created',
      });
    } catch (e) {
      handleError(e as UserDataApiError<FormData>);
    }
  };

  const okClick = () => {
    formInstance.submit();
  };

  return (
    <Modal
      title="Create money storage"
      open={modalType === 'createMoneyStorageModal'}
      confirmLoading={isCreateItemLoading}
      onOk={okClick}
      onCancel={close}
      getContainer={false}
    >
      <Form
        form={formInstance}
        layout="vertical"
        onFinish={onSubmit}
        disabled={isCreateItemLoading}
      >
        <Form.Item<FormData>
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormData>
          name='code'
          label='Code'
          rules={[{ required: true, message: 'Please input code' }]}
        >
          <Input
            onChange={({ target }) => {
              const formatted = target.value.toUpperCase().replace(/\s/g, '');
              formInstance.setFieldsValue({
                code: formatted,
              });
            }}
          />
        </Form.Item>
        <Form.Item<FormData>
          name='description'
          label='Description'
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
