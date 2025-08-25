import React from "react";
import { withCssVars } from "@hocs/cssVars";
import { withAntTheme } from "@hocs/withAntTheme";
import { RouterHistory } from "@router/RouterHistory";
import compose from "@shared/utils/compose";

const withAppData = (Component: React.FC): React.FC => compose(
  withAntTheme,
  withCssVars,
)(Component);

const App: React.FC = () => {
  return (
    <RouterHistory />
  );
}

export default withAppData(App);
