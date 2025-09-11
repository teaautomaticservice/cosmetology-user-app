import { useEffect } from "react"
import { HistoryMessage } from "@components/domain/historyMessages/HistoryMessage"
import { useHistoryMessagesStore } from "@stores/historyMessages";

export const HistoryPage: React.FC = () => {
  const { updateHistoryMessagesFromApi } = useHistoryMessagesStore();

  useEffect(() => {
    updateHistoryMessagesFromApi();
  }, []);
  
  return (
    <HistoryMessage />
  )
}