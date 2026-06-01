import { selectFIlterOption } from '@utils/selectFIlterOption';
import { selectFilterSort } from '@utils/selectFilterSort';
import {
  Button,
  type ButtonProps as ComponentButtonProps,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import TextArea from 'antd/es/input/TextArea';
import { DefaultOptionType } from 'antd/es/select';
import cn from 'classnames';

import s from './formItemRow.module.css';

export type FormInputType =
  'input' |
  'textarea' |
  'select' |
  'inputNumber' |
  'button' |
  'custom';

type FilterOption = (input: string, option: DefaultOptionType) => boolean;
type FilterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType) => number;

const formItemMap: Record<Exclude<FormInputType, 'custom'>, React.FC> = {
  'input': Input,
  'textarea': TextArea,
  'select': Select,
  'inputNumber': InputNumber,
  'button': Button,
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

type ButtonProps<FormData> = {
  type: 'button';
  buttonLabel: string;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>, formInstance: FormInstance<FormData>) => void;
}

export type CustomRowProps<FormData> = {
  FormItem: typeof Form.Item<FormData>;
  formInstance: FormInstance<FormData>;
};

type CustomProps<FormData> = {
  type: 'custom';
  CustomComponent?: React.FC<CustomRowProps<FormData>>;
}

export type Props<T extends object, FormData> = {
  label?: string;
  name: NamePath<T>;
  isRequired?: boolean;
  className?: string;
  initialValue?: number | string;
} & (
    InputProps<FormData> |
    TextareaProps<FormData> |
    MultiselectProps<FormData> |
    InputNumberProps<FormData> |
    ButtonProps<FormData> |
    CustomProps<FormData>
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
  } = props;
  const onChange = 'onChange' in props ? props.onChange : undefined;

  const Component: React.FC<{
    onChange?: React.ChangeEventHandler;
    className?: string;
  }> | undefined = type !== 'custom' ? formItemMap[type] : undefined;

  const CustomComponent = type === 'custom' ?
    (props as CustomProps<FormData>).CustomComponent :
    undefined;

  const rules = [];
  if (isRequired) {
    rules.push({ required: true, message: `Please input ${name}` });
  }

  const onCurrentChange: React.ChangeEventHandler = (e) => {
    if (onChange) {
      onChange(e as any, formInstance);
    }
  };

  if (CustomComponent) {
    return (
      <CustomComponent
        FormItem={Form.Item<FormData>}
        formInstance={formInstance}
      />
    );
  }

  if (!Component) {
    return null;
  }

  const componentProps = {
    className: cn(s.item, props.className),
    onChange: onCurrentChange,
    ...(type === 'select' && ({
      mode: (props as MultiselectProps<FormData>).isMultiply ? 'multiple' : undefined,
      options: (props as MultiselectProps<FormData>).options,
      ...((props as MultiselectProps<FormData>).isSearch && {
        showSearch: true,
        filterOption: selectFIlterOption,
      }),
      ...((props as MultiselectProps<FormData>).isSort && {
        filterSort: selectFilterSort,
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
    ...(type === 'button' && ({
      children: 'buttonLabel' in props ? props.buttonLabel : undefined,
      onClick: 'onClick' in props ? (e) => props.onClick?.(e, formInstance) : undefined,
    } satisfies ComponentButtonProps)),
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
