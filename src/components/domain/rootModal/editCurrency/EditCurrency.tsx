import { EditEntityModal } from '@components/ui/editEntityModal/EditEntityModal';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { Currency, CurrencyStatus, CurrencyStatusEnum } from '@typings/api/cashier';
import { Badge, BadgeProps } from 'antd';

import s from './editCurrency.module.css';

const statusColorsMap: Record<CurrencyStatus, BadgeProps['color']> = {
  [CurrencyStatusEnum.ACTIVE]: 'green',
  [CurrencyStatusEnum.DISABLED]: 'red',
};

type FormData = {
  name?: string;
  code?: string;
}

type Props = {
  currentCurrency?: Currency | null;
}

export const EditCurrency: React.FC<Props> = ({
  currentCurrency,
}) => {
  const {
    updateCurrenciesList,
    deleteCurrency,
  } = useCurrenciesStore();

  const SubtitleComponent = () => {
    if (!currentCurrency) {
      return null;
    }

    return (
      <>
        <strong>ID: {currentCurrency.id}</strong>
        <Badge
          className={s.badge}
          color={statusColorsMap[currentCurrency.status]}
          text={currentCurrency.status}
        />
      </>
    );
  };

  const onUpdate = async () => {
    await updateCurrenciesList();
  };

  const onDelete = async () => {
    if (currentCurrency) {
      await deleteCurrency(currentCurrency.id);
    }
  };

  return (
    <EditEntityModal<Currency, FormData>
      className={s.root}
      title="Currency"
      SubtitleComponent={SubtitleComponent}
      rows={[
        {
          label: 'Name',
          name: 'name',
        },
        {
          label: 'Code',
          name: 'code',
        },
      ]}
      onUpdate={onUpdate}
      entity={currentCurrency}
      editDropdown={{
        title: 'Status',
        dropdownProp: 'status',
        dropdownItems: [
          { key: CurrencyStatusEnum.ACTIVE, label: 'Activate' },
          { key: CurrencyStatusEnum.DISABLED, label: 'Disable' },
        ],
        onDelete,
      }}
    />
  );
};
