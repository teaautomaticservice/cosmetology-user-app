import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAppParams } from '@shared/hooks/useParams';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
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
    updateAccountsList,
  } = useAccountsStore();
  const {
    activeCurrencies,
  } = useCurrenciesStore();
  const {
    activeMoneyStorages,
    updateMoneyStoragesList,
  } = useMoneyStoragesStore();
  const {
    updateAccountsAggregatedWithStorage,
  } = useAccountsAggregatedWithStorageStore();
  const { clearParams } = useAppParams();

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
    clearParams();
    Promise.all([
      updateAccountsList(),
      updateMoneyStoragesList(),
      updateAccountsAggregatedWithStorage(),
    ]);
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
