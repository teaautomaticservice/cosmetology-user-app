import React from "react";
import { compose } from "@k88/pipe-compose";

import { withAntTheme } from "./ant/theme";
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
