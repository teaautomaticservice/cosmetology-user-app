import React from "react";
import { ConfigProvider, theme,ThemeConfig } from "antd";

const colors = theme.getDesignToken();

const themeConfig: ThemeConfig = {
  components: {
    Layout: {
      colorBgBody: colors.blue1,
      colorBgHeader: colors.colorWhite,
    }
  }
}

export const withAntTheme = (Component: React.FC): React.FC => {
  return (props: any) => {
    return (
      <ConfigProvider theme={themeConfig}>
        <Component {...props} />
      </ConfigProvider>
    );
  };
};
