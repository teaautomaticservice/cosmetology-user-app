import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useAccountsStore } from '@stores/cashier/accounts';
import { CreateAccount } from '@typings/api/cashier';

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

  const onSubmit = async ({
    currencyId,
    description,
    moneyStorageIds,
    name,
  }: FormData) => {
    await createAccount({
      currencyId,
      description: description ?? null,
      moneyStorageIds,
      name,
    });
    await updateAccountsList();
  };

  return (
    <CreateEntityModal<CreateAccount, FormData>
      title="Create Account"
      onSubmit={onSubmit}
      rows={[
        { label: 'Name', name: 'name', isRequired: true },
        { label: 'Currency', name: 'currencyId', isRequired: true },
        { label: 'Money storages', name: 'moneyStorageIds', isRequired: true },
        { label: 'Description', name: 'description', type: 'textarea' },
      ]}
      isLoading={isAccountsLoading}
    />
  );
};
