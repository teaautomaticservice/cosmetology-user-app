import { CreateEntityModal } from '@components/ui/createEntityModal/CreateEntityModal';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { Currency } from '@typings/api/cashier';

type FormData = {
  name: string;
  code: string;
};

export const CreateCurrencyModal: React.FC = () => {
  const {
    isCurrenciesLoading,
    updateCurrenciesList,
    createCurrency,
  } = useCurrenciesStore();

  const onSubmit = async (formData: FormData) => {
    await createCurrency(formData);
    updateCurrenciesList();
  };

  return (
    <CreateEntityModal<Currency, FormData>
      title="Create currency"
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
      ]}
      isLoading={isCurrenciesLoading}
    />
  );
};
