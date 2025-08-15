import React from "react";
import { withAntTheme } from "@hocs/withAntTheme";
import compose from "@shared/utils/compose";

import { HistoryMessage } from "./components/historyMessages/HistoryMessage";

const withAppData = (Component: React.FC): React.FC => compose(
  withAntTheme,
)(Component);

const App: React.FC = () => {
  return (
    <HistoryMessage />
  );
}

export default withAppData(App);
