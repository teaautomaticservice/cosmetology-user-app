import { ChangeEventHandler, useLayoutEffect, useState } from 'react';
import { useAppParams } from '@shared/hooks/useParams';
import { Input } from 'antd';
import { debounce } from 'lodash';

type Props = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputParams: React.FC<Props> = ({
  placeholder,
  className,
  value,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const { isReady } = useAppParams();

  const onCHangeDebounced = onChange ?
    debounce(onChange, 333) :
    undefined;

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentValue(e.currentTarget.value);
    onCHangeDebounced?.(e);
  };

  useLayoutEffect(() => {
    if (isReady) {
      setCurrentValue(value);
    }
  }, [isReady]);

  return (
    <Input
      placeholder={placeholder}
      className={className}
      onChange={onChangeInput}
      defaultValue={value}
      value={currentValue}
      disabled={!isReady}
    />
  );
};
