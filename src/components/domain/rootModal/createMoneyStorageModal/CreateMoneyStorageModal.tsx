import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { MoneyStorage } from '@typings/api/cashier';

type FormData = {
  name: string;
  code: string;
  description?: string;
}

export const CreateMoneyStorageModal: React.FC = () => {
  const {
    isCreateItemLoading,
    createMoneyStorage,
  } = useMoneyStoragesStore();
  const onSubmit = async (values: FormData) => {
    await createMoneyStorage(values);
    window.location.reload();
  };

  return (
    <CreateEntityModal<MoneyStorage, FormData>
      title="Create money storage"
      onSubmit={onSubmit}
      rows={[
        { label: 'Name', name: 'name', isRequired: true },
        {
          label: 'Code',
          name: 'code',
          isRequired: true,
          onChange: ({ target }, formInstance) => {
            const formatted = target.value.toUpperCase().replace(/\s/g, '');
            formInstance.setFieldsValue({
              code: formatted,
            });
          }
        },
        { label: 'description', name: 'description', type: 'textarea' }
      ]}
      isLoading={isCreateItemLoading}
    />
  );
};
