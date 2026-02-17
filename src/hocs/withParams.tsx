import { ChangeEventHandler, useLayoutEffect, useState } from 'react';
import { useAppParams } from '@shared/hooks/useParams';
import { debounce } from 'lodash';

type Value = string | number | undefined;

type ChangeValueHandler = (value: Value) => void

type Props = {
  placeholder?: string;
  className?: string;
  value?: any;
  onChange?: ChangeEventHandler | ChangeValueHandler;
}

export const withParams = <V extends Value = Value, T extends Record<string, any> = Record<string, any>>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> => {
  return (props: T) => {
    const {
      value,
      onChange,
    } = props as Props;

    const [currentValue, setCurrentValue] = useState(value);
    const { isReady } = useAppParams();

    const onCHangeDebounced = onChange ?
      debounce(onChange, 333) :
      undefined;

    const onChangeInput = (eventOrValue: React.ChangeEvent | V) => {
      let value: V | undefined;
      const typeOfArg = typeof eventOrValue;

      if (typeOfArg === 'string' || typeOfArg === 'number') {
        value = eventOrValue as V;
      } else {
        value = (eventOrValue as React.ChangeEvent<any>)?.currentTarget?.value as V;
      }

      setCurrentValue(value);
      onCHangeDebounced?.(value);
    };

    useLayoutEffect(() => {
      if (isReady) {
        setCurrentValue(value);
      }
    }, [isReady]);

    const newProps = {
      ...props,
      onChange: onChangeInput,
      value: currentValue,
    };
    return (
      <Component {...newProps as any} />
    );
  };
};
