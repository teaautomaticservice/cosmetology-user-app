import { useEffect } from 'react';
import { HeaderHistory } from '@components/domain/historyMessages/headerHistory/HeaderHistory';
import { TableMessages } from '@components/domain/historyMessages/tableMessages/TableMessages';
import { useHistoryMessagesStore } from '@stores/historyMessages';

import s from './historyPage.module.css';

export const HistoryPage: React.FC = () => {
  const { updateHistoryMessagesFromApi } = useHistoryMessagesStore();

  useEffect(() => {
    updateHistoryMessagesFromApi();
  }, []);
  
  return (
    <div className={s.root}>
      <HeaderHistory className={s.header} />
      <TableMessages />
    </div>
  );
};
