import { useLayoutEffect, useState } from 'react';
import { useAppParams } from '@shared/hooks/useParams';
import { debounce } from 'lodash';

type Value = string | number | undefined;

type ChangeValueHandler<V = Value> = (value: V) => void;

type Props<V = Value> = {
  placeholder?: string;
  className?: string;
  value?: any;
  onChange?: ChangeValueHandler<V>;
}

type CurrentProps<V, T> = Omit<T, 'onChange'> & { onChange?: ChangeValueHandler<V> };

export const withParams = <V extends Value = Value, T extends Props<any> = Props<V>>(
  Component: React.ComponentType<T>,
): React.ComponentType<CurrentProps<V, T>> => {
  return (props: CurrentProps<V, T>) => {
    const {
      value,
      onChange,
    } = props as Props<V>;

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
