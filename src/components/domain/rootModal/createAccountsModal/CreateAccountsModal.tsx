import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { CreateAccount } from '@typings/api/cashier';
import { fromEntityToOptionsList } from 'src/adapters/fromEntityToOptionsList';

type FormData = {
  name: string;
  description?: string;
  moneyStorageIds: string[];
  currencyId: string;
}

export const CreateAccountsModal: React.FC = () => {
  const {
    isAccountsLoading,
    createAccount,
  } = useAccountsStore();
  const {
    activeCurrencies,
  } = useCurrenciesStore();
  const {
    activeMoneyStorages,
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
    window.location.reload();
  };

  const currenciesOptions = fromEntityToOptionsList(activeCurrencies);
  const moneyStoragesOptions = fromEntityToOptionsList(activeMoneyStorages);

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
          isSearch: true,
          options: currenciesOptions,
        },
        {
          label: 'Money storages',
          name: 'moneyStorageIds',
          isRequired: true,
          type: 'select',
          isSearch: true,
          options: moneyStoragesOptions,
          isMultiply: true,
        },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isAccountsLoading}
    />
  );
};
