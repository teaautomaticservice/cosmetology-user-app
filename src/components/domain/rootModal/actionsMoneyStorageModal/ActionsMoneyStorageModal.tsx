import { useState } from 'react';
import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useModalStore } from '@stores/modal';
import { useUpdateMoneyStorageStore } from '@stores/updateMoneyStorage';
import { UserDataApiError } from '@typings/errors';
import {
  Button,
  Form,
  Input,
  Modal,
  Skeleton,
  Typography
} from 'antd';

import s from './actionsMoneyStorageModal.module.css';

const { Text } = Typography;

type FormData = {
  name?: string;
  code?: string;
  description?: string;
}

export const ActionsMoneyStorageModal: React.FC = () => {
  const { modalType, close } = useModalStore();
  const { updateAllMoneyStorages } = useMoneyStoragesStore();
  const {
    isLoading,
    currentMoneyStorage,
    updateMoneyStorageData,
  } = useUpdateMoneyStorageStore();
  const [formInstance] = Form.useForm<FormData>();

  // const { handleSubmit, control: formControl, getValues } = useForm<FormData>();
  const [editRow, setEditRow] = useState<string | null>(null);

  const title = currentMoneyStorage ?
    `${currentMoneyStorage?.name}, ${currentMoneyStorage?.code}` :
    'Money storage detail';

  const updateMessage = async (value: FormData) => {
    if (currentMoneyStorage) {
      try {
        await updateMoneyStorageData(value);
        updateAllMoneyStorages();
        setEditRow(null);
      } catch (e) {
        const { statusCode, cause } = e as UserDataApiError<FormData>;

        if (statusCode === 400 && cause) {
          Object.entries(cause).forEach(([name, errors]) => {
            formInstance.setFields([{
              name: name as keyof FormData,
              errors,
            }]);
          });
        } else {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    }
  };

  const cancelEdit = () => {
    setEditRow(null);
    formInstance.resetFields();
  };

  const row = ({
    label,
    name,
    value,
  }: {
    label: string;
    name: keyof FormData;
    value: string;
  }) => (

    <div className={s.row}>
      {editRow !== label && (
        <div className={s.rowInfo}>
          <strong className={s.listLabel}>
            {label}
          </strong> <Text>
            {value}
          </Text> <Button
            type='text'
            className={s.editBtn}
            onClick={() => setEditRow(label)}
          >
            Edit
          </Button>
        </div>
      )}

      {editRow === label && (
        <div className={s.rowEdit}>
          <Form.Item name={name} label={label} className={s.formItem}>
            <Input />
          </Form.Item>
          <div className={s.rowEditActions}>
            <Button
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
            <Button
              type='text'
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>

        </div>
      )}
    </div>
  );

  const footer = (
    <div className={s.footer}>
      {/* <Button type='primary' onClick={submitForm}>Update</Button> */}
      <Button onClick={close}>Cancel</Button>
    </div>
  );

  return (
    <Modal
      title={title}
      open={modalType === 'actionsMoneyStorage'}
      confirmLoading={isLoading}
      footer={footer}
      onCancel={close}
      getContainer={false}
      className={s.root}
    >
      <Skeleton loading={isLoading || !currentMoneyStorage}>
        {currentMoneyStorage && (
          <div className={s.mainContainer}>
            <div className={s.title}>
              <strong>ID: {currentMoneyStorage.id}</strong>
              <MoneyStorageBadge
                className={s.badge}
                moneyStorageStatus={currentMoneyStorage.status}
              />
            </div>

            <div className={s.contentContainer}>
              <Form
                form={formInstance}
                layout="vertical"
                initialValues={{
                  name: currentMoneyStorage?.name,
                  code: currentMoneyStorage?.code,
                  description: currentMoneyStorage?.description ?? undefined,
                }}
                onFinish={(updateMessage)}
                className={s.form}
                disabled={isLoading}
              >
                {row({ label: 'Name:', name: 'name', value: currentMoneyStorage.name })}
                {row({ label: 'Code:', name: 'code', value: currentMoneyStorage.code })}
                {row({
                  label: 'Description:',
                  name: 'description',
                  value: currentMoneyStorage.description ?? 'N/A',
                })}
              </Form>
            </div>

          </div>
        )}
      </Skeleton>
    </Modal>
  );
};
