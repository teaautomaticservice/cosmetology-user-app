import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { INTERNAL_ERROR } from '@constants/errors';
import { useModalStore } from '@stores/modal';
import { UserDataApiError } from '@typings/errors';
import {
  Button,
  Dropdown,
  Form,
  MenuProps,
  Modal,
  Skeleton,
  Typography
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import cn from 'classnames';

import { FormInputType, FormItemRow, type Props as FormItemRowProps } from '../formItemRow/FormItemRow';

import s from './editEntityModal.module.css';

const { Text } = Typography;

export type EditModalRow<T extends object> = {
  label: string;
  name: NamePath<T>;
  type?: FormInputType;
}

export type DropdownItem<Entity extends object, Key extends keyof Entity = keyof Entity> = {
  label: string;
  key: Entity[Key];
}

export type EditDropdown<Entity extends object> = {
  title: string;
  dropdownItems: DropdownItem<Entity>[];
  dropdownProp: keyof Entity;
  onDelete?: () => Promise<void>;
}
type Props<Entity extends object, T extends Partial<Entity>> = {
  title: string;
  rows: FormItemRowProps<Entity, T>[];
  onUpdate: (formData: T) => Promise<void>;
  SubtitleComponent?: React.FC;
  rootClassName?: string;
  className?: string;
  initialValues?: T;
  isLoading?: boolean;
  entity?: Entity | null;
  editDropdown?: EditDropdown<Entity>;
  onClose?: () => Promise<void> | void;
}

export const EditEntityModal = <Entity extends object, FormData extends Partial<Entity>>({
  title,
  rows,
  onUpdate,
  SubtitleComponent,
  rootClassName,
  className,
  initialValues,
  isLoading = false,
  entity,
  editDropdown,
  onClose,
}: Props<Entity, FormData>) => {
  const { close } = useModalStore();

  const [formInstance] = Form.useForm<FormData>();

  const [editRow, setEditRow] = useState<NamePath<FormData> | null>(null);
  const [commonApiError, setCommonApiError] = useState<string | null>(null);

  const closeModal = () => {
    if (onClose) {
      onClose();
    }
    close();
  };

  const handleError = (e: UserDataApiError<FormData>) => {
    const { statusCode, cause } = e as UserDataApiError<FormData>;

    if (statusCode === 400 && cause) {
      Object.entries(cause).forEach(([name, errors]) => {
        if (name !== editRow) {
          setCommonApiError((errors as string[]).join('\n'));
        }
        formInstance.setFields([{
          name: name as NamePath<FormData>,
          errors: errors as string[],
        }]);
      });
    } else {
      setCommonApiError((e as UserDataApiError)?.message ?? INTERNAL_ERROR);
    }
  };

  const update = async (value: FormData) => {
    setCommonApiError(null);
    if (entity) {
      try {
        await onUpdate(value);
        setEditRow(null);
      } catch (e) {
        handleError(e as UserDataApiError<FormData>);
      }
    }
  };

  const cancelEdit = () => {
    setEditRow(null);
    setCommonApiError(null);
    formInstance.resetFields();
  };

  const changeDropdown = (newKey: DropdownItem<Entity>['key']) => {
    if (editDropdown?.dropdownProp) {
      update({
        [editDropdown.dropdownProp]: newKey,
      } as FormData);
    }
  };

  const deleteEntity = async () => {
    if (editDropdown?.onDelete) {
      try {
        await editDropdown.onDelete();
        closeModal();
      } catch (e) {
        handleError(e as UserDataApiError<FormData>);
      }
    }
  };

  const rawDropdownItems: MenuProps['items'] = editDropdown?.dropdownItems.map(({
    key,
    label,
  }) => ({
    key: key as string,
    label,
    type: 'item',
    onClick: () => changeDropdown(key),
  })) ?? [];

  const items: MenuProps['items'] = [
    ...rawDropdownItems,
    ...(editDropdown?.onDelete ?
      [
        {
          type: 'divider',
        } as const,
        {
          key: 'delete',
          label: 'Delete',
          danger: true,
          onClick: deleteEntity,
        },
      ] :
      []
    ),
  ];

  const filteredItems = items?.filter((val) =>
    (!val?.key ||
    (entity && editDropdown?.dropdownProp && val?.key && val?.key !== entity[editDropdown.dropdownProp]))
  );

  const row = (props: FormItemRowProps<Entity, FormData>) => {
    const {
      label,
      name,
    } = props;
    const valueText = (entity && name as keyof Entity in entity) ?
      entity[name as keyof Entity] :
      'N/A';

    const selectValue = (props.type === 'select' && props.options) ?
      props.options.find(({ value }) => value?.toString() === valueText?.toString())?.label :
      null;
    
    return (
      <div key={name as string} className={s.row}>
        {editRow !== label && (
          <div className={s.rowInfo}>
            <strong className={s.listLabel}>
              {label}
            </strong> <Text>
              {`${selectValue ?? valueText ?? 'N/A'}`}
            </Text> <Button
              type='text'
              className={s.editBtn}
              onClick={() => setEditRow(name as any)}
            >
              Edit
            </Button>
          </div>
        )}

        {editRow === name && (
          <div className={s.rowEdit}>
            <FormItemRow
              {...props}
              formInstance={formInstance}
            />
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
  };

  const footer = (
    <div className={s.footer}>
      <Button onClick={closeModal}>Cancel</Button>

      {editDropdown && (
        <Dropdown menu={{ items: filteredItems }} trigger={['click']}>
          <Button type='primary' ghost loading={isLoading}>
            {editDropdown.title} <DownOutlined />
          </Button>
        </Dropdown>
      )}
    </div>
  );

  return (
    <Modal
      title={title}
      open={true}
      confirmLoading={isLoading}
      footer={footer}
      onCancel={closeModal}
      getContainer={false}
      className={cn(s.root, rootClassName)}
      classNames={{
        content: className,
      }}
      width={'fit-content'}
    >
      <Skeleton loading={isLoading || !entity}>
        {entity && (
          <div className={s.mainContainer}>
            {SubtitleComponent && (
              <div className={s.title}>
                <SubtitleComponent />
              </div>
            )}

            <div className={s.contentContainer}>
              <Form
                form={formInstance}
                layout="vertical"
                initialValues={initialValues}
                onFinish={(update)}
                className={s.form}
                disabled={isLoading}
              >
                {rows.map((rowData) => row(rowData))}
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
