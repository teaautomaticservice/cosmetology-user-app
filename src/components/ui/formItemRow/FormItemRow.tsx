import { Form, FormInstance, Input, Select } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import TextArea from 'antd/es/input/TextArea';
import { DefaultOptionType } from 'antd/es/select';

export type FormInputType = 'input' | 'textarea' | 'select';

const formItemMap: Record<FormInputType, React.FC> = {
  'input': Input,
  'textarea': TextArea,
  'select': Select,
};

type InputProps<FormData> = {
  type?: 'input';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, formInstance: FormInstance<FormData>) => void;
};

type TextareaProps<FormData> = {
  type: 'textarea';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, formInstance: FormInstance<FormData>) => void;
};

type MultiselectProps = {
  type: 'select';
  options: DefaultOptionType[];
  isMultiply?: boolean;
  onChange?: (value: any, option?: DefaultOptionType | DefaultOptionType[]) => void;
};

export type Props<T extends object, FormData> = {
  label: string;
  name: NamePath<T>;
  isRequired?: boolean;
  className?: string;
} & (
    InputProps<FormData> |
    TextareaProps<FormData> |
    MultiselectProps
  );

type FormItemRowProps<T extends object, FormData> = Props<T, FormData> & {
  formInstance: FormInstance<FormData>;
};

export const FormItemRow = <Entity extends object, FormData extends Record<keyof Entity, unknown>>(
  props: FormItemRowProps<Entity, FormData>
) => {
  const {
    label,
    name,
    formInstance,
    isRequired,
    className,
    type = 'input',
    onChange,
  } = props;
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

  const componentProps = {
    ...(
      type === 'select' && (props as MultiselectProps).options ?
        { options: (props as MultiselectProps).options } :
        {}
    ),
    ...(
      type === 'select' && (props as MultiselectProps).isMultiply ?
        { mode: 'multiple' } :
        {}
    ),
  };

  return (
    <Form.Item<FormData>
      key={name as string}
      label={label}
      name={name as NamePath<FormData>}
      rules={rules}
      className={className}
    >
      <Component {...componentProps} onChange={onCurrentChange} />
    </Form.Item>
  );
};
