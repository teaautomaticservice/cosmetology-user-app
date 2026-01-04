import Title from 'antd/es/typography/Title';

import { CurrenciesActions } from '../accounts/currenciesActions/CurrenciesActions';
import { CurrenciesList } from '../accounts/currenciesList/CurrenciesList';

import s from './currencies.module.css';

type Props = {
  className?: string;
};

export const Currencies: React.FC<Props> = () => {
  return (
    <div className={s.root}>
      <Title>Currencies</Title>
      <CurrenciesActions className={s.actions} />
      <CurrenciesList />
    </div>
  );
};
