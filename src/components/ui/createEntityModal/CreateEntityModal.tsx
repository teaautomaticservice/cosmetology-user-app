import { INTERNAL_ERROR } from '@constants/errors';
import { useModalStore } from '@stores/modal';
import { UserDataApiError } from '@typings/errors';
import { addToast } from '@utils/domain/toastEventBus';
import { Form, FormInstance, Input, Modal } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import TextArea from 'antd/es/input/TextArea';

type FormInputType = 'input' | 'textarea';

export type CreateModalRow<T extends object, FormData> = {
  label: string;
  name: NamePath<T>;
  isRequired?: boolean;
} & (
  {
    type?: 'input';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, formInstance: FormInstance<FormData>) => void;
  } | {
    type: 'textarea';
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, formInstance: FormInstance<FormData>) => void;
  }
);

const formItemMap: Record<FormInputType, React.FC> = {
  'input': Input,
  'textarea': TextArea,
};

type Props<Entity extends object, FormData extends Record<keyof Entity, unknown>> = {
  title: string;
  rows: CreateModalRow<Entity, FormData>[];
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export const CreateEntityModal = <Entity extends object, FormData extends Partial<Entity>>({
  title,
  rows,
  onSubmit,
  isLoading,
}: Props<Entity, FormData>) => {
  const { close } = useModalStore();
  const [formInstance] = Form.useForm<FormData>();

  const okClick = () => {
    formInstance.submit();
  };

  const handleError = (e: UserDataApiError<FormData>) => {
    const { statusCode, cause } = e as UserDataApiError<FormData>;

    if (statusCode === 400 && cause) {
      Object.entries(cause).forEach(([name, errors]) => {
        formInstance.setFields([{
          name: name as NamePath<FormData>,
          errors: errors as string[],
        }]);
      });
    } else {
      addToast({
        type: 'error',
        description: (e as UserDataApiError)?.message ?? INTERNAL_ERROR,
      });
    }
  };

  const onSubmitForm = async (values: FormData) => {
    try {
      await onSubmit(values);
      close();
      addToast({
        description: 'Successful created',
      });
    } catch (e) {
      handleError(e as UserDataApiError<FormData>);
    }
  };

  const row = ({
    label,
    name,
    type = 'input',
    isRequired,
    onChange,
  }: CreateModalRow<Entity, FormData>) => {
    const Component: React.FC<{ onChange?: React.ChangeEventHandler}> = formItemMap[type];

    const rules = [];
    if (isRequired) {
      rules.push({ required: true, message: `Please input ${name}` });
    }

    const onCurrentChange: React.ChangeEventHandler = (e) => {
      if (onChange) {
        onChange(e as any, formInstance);
      }
    };

    return (
      <Form.Item<FormData>
        key={name as string}
        label={label}
        name={name as NamePath<FormData>}
        rules={rules}
      >
        <Component onChange={onCurrentChange} />
      </Form.Item>
    );
  };

  return (
    <Modal
      title={title}
      open={true}
      confirmLoading={isLoading}
      onOk={okClick}
      onCancel={close}
      getContainer={false}
    >
      <Form
        form={formInstance}
        layout="vertical"
        onFinish={onSubmitForm}
        disabled={isLoading}
      >
        {rows.map((data) => row(data))}
      </Form>
    </Modal>
  );
};
