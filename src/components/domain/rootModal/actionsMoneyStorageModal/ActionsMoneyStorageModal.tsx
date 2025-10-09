import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { INTERNAL_ERROR } from '@constants/errors';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useModalStore } from '@stores/modal';
import { useUpdateMoneyStorageStore } from '@stores/updateMoneyStorage';
import { MoneyStorageStatus, MoneyStorageStatusEnum } from '@typings/api/moneyStorage';
import { UserDataApiError } from '@typings/errors';
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
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

  const [editRow, setEditRow] = useState<keyof FormData | null>(null);
  const [commonApiError, setCommonApiError] = useState<string | null>(null);

  const title = currentMoneyStorage ?
    `${currentMoneyStorage?.name}, ${currentMoneyStorage?.code}` :
    'Money storage detail';

  const handleError = (e: UserDataApiError<FormData>) => {
    const { statusCode, cause } = e as UserDataApiError<FormData>;

    if (statusCode === 400 && cause) {
      Object.entries(cause).forEach(([name, errors]) => {
        if (name !== editRow) {
          setCommonApiError(errors.join('\n'));
        }
        formInstance.setFields([{
          name: name as keyof FormData,
          errors,
        }]);
      });
    } else {
      setCommonApiError((e as UserDataApiError)?.message ?? INTERNAL_ERROR);
    }
  };

  const update = async (value: FormData & { status?: MoneyStorageStatus }) => {
    setCommonApiError(null);
    if (currentMoneyStorage) {
      try {
        await updateMoneyStorageData(value);
        updateAllMoneyStorages();
        setEditRow(null);
      } catch (e) {
        handleError(e as UserDataApiError<FormData>);
      }
    }
  };

  const cancelEdit = () => {
    setEditRow(null);
    formInstance.resetFields();
  };

  const changeStatus = (newStatus: MoneyStorageStatus) => update({
    status: newStatus,
  });

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Activate',
      onClick: () => changeStatus(MoneyStorageStatusEnum.ACTIVE),
    },
    {
      key: 2,
      label: 'Freeze',
      onClick: () => changeStatus(MoneyStorageStatusEnum.FREEZED),
    },
    {
      key: 3,
      label: 'Deactivate',
      onClick: () => changeStatus(MoneyStorageStatusEnum.DEACTIVATED),
    },
    {
      type: 'divider',
    },
    {
      key: 4,
      label: 'Delete',
      danger: true,
    },
  ];

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
            onClick={() => setEditRow(name)}
          >
            Edit
          </Button>
        </div>
      )}

      {editRow === name && (
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
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button type='primary' ghost loading={isLoading}>
          Change status <DownOutlined />
        </Button>
      </Dropdown>

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
                onFinish={(update)}
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
              {Boolean(commonApiError) && (
                <Text type='danger' className={s.commonError}>{commonApiError}</Text>
              )}
            </div>

          </div>
        )}
      </Skeleton>
    </Modal>
  );
};
