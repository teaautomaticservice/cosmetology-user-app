import { useState } from 'react';
import { MoneyStorageBadge } from '@components/domain/moneyStorages/moneyStorageBadge/MoneyStorageBadge';
import { useModalStore } from '@stores/modal';
import { MoneyStorage } from '@typings/api/moneyStorage';
import { Button, Input, Modal, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import s from './actionsMoneyStorageModal.module.css';

const { Text } = Typography;

type Props = {
  moneyStorage?: MoneyStorage;
}

export const ActionsMoneyStorageModal: React.FC<Props> = ({
  moneyStorage,
}) => {
  const { modalType, close } = useModalStore();
  const { handleSubmit, control: formControl, getValues } = useForm({
    defaultValues: {
      message: '',
    }
  });
  const [editRow, setEditRow] = useState<string | null>(null);

  const title = moneyStorage ?
    `${moneyStorage?.name}, ${moneyStorage?.code}` :
    'Money storage detail';

  const updateMessage = () => {
    getValues();
  };

  const submitForm = handleSubmit(updateMessage);

  const row = ({
    label,
    value,
  }: {
    label: string;
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
          <Controller name="message" control={formControl} render={({ field }) => <Input
            {...field}
            placeholder={value}
          />} />
          <Button
            type='text'
            className={s.editBtn}
            onClick={() => setEditRow(null)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );

  const footer = (
    <div className={s.footer}>
      <Button type='primary' onClick={submitForm}>Update</Button>
      <Button onClick={close}>Cancel</Button>
    </div>
  );

  return (
    <Modal
      title={title}
      open={modalType === 'actionsMoneyStorage'}
      // confirmLoading={confirmLoading}
      footer={footer}
      onCancel={close}
      getContainer={false}
      className={s.root}
    >
      {moneyStorage && (
        <div className={s.mainContainer}>
          <div className={s.title}>
            <strong>ID: {moneyStorage.id}</strong>
            <MoneyStorageBadge
              className={s.badge}
              moneyStorageStatus={moneyStorage.status}
            />
          </div>

          <div className={s.contentContainer}>
            <form action="/" onSubmit={submitForm} className={s.form}>
              {row({ label: 'Name:', value: moneyStorage.name })}
              {row({ label: 'Code:', value: moneyStorage.code })}
              {row({ label: 'Description:', value: moneyStorage.description ?? 'N/A' })}

            </form>
          </div>

        </div>
      )}
    </Modal>
  );
};
