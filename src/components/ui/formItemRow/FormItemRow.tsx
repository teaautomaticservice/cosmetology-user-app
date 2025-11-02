import { Form, FormInstance, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import TextArea from 'antd/es/input/TextArea';

type FormInputType = 'input' | 'textarea';

const formItemMap: Record<FormInputType, React.FC> = {
  'input': Input,
  'textarea': TextArea,
};

type Props<T extends object, FormData> = {
  label: string;
  name: NamePath<T>;
  formInstance: FormInstance<FormData>;
  isRequired?: boolean;
  className?: string;
} & (
    {
      type?: 'input';
      onChange?: (event: React.ChangeEvent<HTMLInputElement>, formInstance: FormInstance<FormData>) => void;
    } | {
      type: 'textarea';
      onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, formInstance: FormInstance<FormData>) => void;
    }
  );

export const FormItemRow = <Entity extends object, FormData extends Partial<Entity>>({
  label,
  name,
  formInstance,
  isRequired,
  className,
  type = 'input',
  onChange,
}: Props<Entity, FormData>) => {
  const Component: React.FC<{ onChange?: React.ChangeEventHandler }> = formItemMap[type];

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
      className={className}
    >
      <Component onChange={onCurrentChange} />
    </Form.Item>
  );
};
