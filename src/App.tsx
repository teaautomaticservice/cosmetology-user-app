import React from "react";
import compose from "@shared/utils/compose";

import { HistoryMessage } from "./components/historyMessages/HistoryMessage";
import { withAntTheme } from "@hocs/withAntTheme";

const withAppData = (Component: React.FC): React.FC => compose(
  withAntTheme,
)(Component);

const App: React.FC = () => {
  return (
    <HistoryMessage />
  );
}

export default withAppData(App);
