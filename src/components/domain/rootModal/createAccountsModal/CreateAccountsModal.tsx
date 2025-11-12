import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { CreateAccount, CurrencyStatusEnum, MoneyStorageStatusEnum } from '@typings/api/cashier';

type FormData = {
  name: string;
  description?: string;
  moneyStorageIds: string[];
  currencyId: string;
}

export const CreateAccountsModal: React.FC = () => {
  const {
    isAccountsLoading,
    updateAccountsList,
    createAccount,
  } = useAccountsStore();
  const {
    currencies,
  } = useCurrenciesStore();
  const {
    moneyStorages,
  } = useMoneyStoragesStore();

  const onSubmit = async ({
    currencyId,
    moneyStorageIds,
    name,
    description,
  }: FormData) => {
    await createAccount({
      currencyId: Number(currencyId),
      description: description ?? null,
      moneyStorageIds,
      name,
    });
    await updateAccountsList();
  };

  const currenciesOptions = currencies
    .filter(({ status }) => status === CurrencyStatusEnum.ACTIVE)
    .map(({ id, name }) => ({
      value: id,
      label: name,
    }));

  const moneyStoragesOptions = moneyStorages
    .filter(({ status }) => status === MoneyStorageStatusEnum.ACTIVE)
    .map(({
      id, name,
    }) => ({
      value: id,
      label: name,
    }));

  return (
    <CreateEntityModal<CreateAccount, FormData>
      title="Create Account"
      onSubmit={onSubmit}
      rows={[
        { label: 'Name', name: 'name', isRequired: true },
        {
          label: 'Currency',
          name: 'currencyId',
          isRequired: true,
          type: 'select',
          options: currenciesOptions,
        },
        {
          label: 'Money storages',
          name: 'moneyStorageIds',
          isRequired: true,
          type: 'select',
          options: moneyStoragesOptions,
          isMultiply: true,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isAccountsLoading}
    />
  );
};
