import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import TextArea from 'antd/es/input/TextArea';
import { DefaultOptionType } from 'antd/es/select';
import cn from 'classnames';

import s from './formItemRow.module.css';

export type FormInputType = 'input' | 'textarea' | 'select' | 'inputNumber';

type FilterOption = (input: string, option: DefaultOptionType) => boolean;
type FilterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType) => number;

const formItemMap: Record<FormInputType, React.FC> = {
  'input': Input,
  'textarea': TextArea,
  'select': Select,
  'inputNumber': InputNumber,
};

type InputProps<FormData> = {
  type?: 'input';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, formInstance: FormInstance<FormData>) => void;
};

type TextareaProps<FormData> = {
  type: 'textarea';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, formInstance: FormInstance<FormData>) => void;
};

type MultiselectProps<FormData> = {
  type: 'select';
  options: DefaultOptionType[];
  isMultiply?: boolean;
  isSearch?: boolean;
  isSort?: boolean;
  onChange?: (value: string | number, formInstance: FormInstance<FormData>) => void;
};

type InputNumberProps<FormData> = {
  type: 'inputNumber';
  min?: number;
  max?: number;
  suffix?: string;
  precision?: number;
  step?: string;
  formatter?: (val: string) => number | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, formInstance: FormInstance<FormData>) => void;
};

export type Props<T extends object, FormData> = {
  label: string;
  name: NamePath<T>;
  isRequired?: boolean;
  className?: string;
  initialValue?: number | string;
} & (
    InputProps<FormData> |
    TextareaProps<FormData> |
    MultiselectProps<FormData> |
    InputNumberProps<FormData>
  );

type FormItemRowProps<T extends object, FormData> = Props<T, FormData> & {
  formInstance: FormInstance<FormData>;
};

export const FormItemRow = <Entity extends object, FormData extends Record<string, unknown>>(
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
  const Component: React.FC<{
    onChange?: React.ChangeEventHandler;
    className?: string;
  }> = formItemMap[type];

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
    className: cn(s.item, props.className),
    onChange: onCurrentChange,
    ...(type === 'select' && ({
      mode: (props as MultiselectProps<FormData>).isMultiply ? 'multiple' : undefined,
      options: (props as MultiselectProps<FormData>).options,
      ...((props as MultiselectProps<FormData>).isSearch && {
        showSearch: true,
        filterOption: ((input: string, option: DefaultOptionType): boolean => {
          const label = option?.label || '';
          return String(label).toLowerCase().includes(input.toLowerCase());
        }) satisfies FilterOption,
      }),
      ...((props as MultiselectProps<FormData>).isSort && {
        filterSort: ((optionA: DefaultOptionType, optionB: DefaultOptionType): number => {
          const labelA = String(optionA?.label || '');
          const labelB = String(optionB?.label || '');
          return labelA.toLowerCase().localeCompare(labelB.toLowerCase());
        }) satisfies FilterSort,
      }),
    })),
    ...(type === 'inputNumber' && ({
      min: (props as InputNumberProps<FormData>).min,
      max: (props as InputNumberProps<FormData>).max,
      suffix: (props as InputNumberProps<FormData>).suffix,
      precision: (props as InputNumberProps<FormData>).precision,
      step: (props as InputNumberProps<FormData>).step,
      formatter: (props as InputNumberProps<FormData>).formatter,
    })),
  };

  return (
    <Form.Item<FormData>
      key={name as string}
      label={label}
      name={name as NamePath<FormData>}
      rules={rules}
      className={cn(s.root, className)}
      initialValue={props.initialValue}
    >
      <Component {...componentProps} />
    </Form.Item>
  );
};
