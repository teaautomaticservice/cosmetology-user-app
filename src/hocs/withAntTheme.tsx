import React from "react";
import { colors } from '@ant/colors';
// import { Toasts } from '@components/ui/toasts/Toasts';
import { ConfigProvider, ThemeConfig, } from "antd";

const themeConfig: ThemeConfig = {
  components: {
    Layout: {
      bodyBg: colors.blue1,
      headerBg: colors.colorWhite,
    }
  }
};

export const withAntTheme = (Component: React.FC): React.FC => {
  return (props: any) => {
    return (
      <ConfigProvider theme={themeConfig}>
        <Component {...props} />
        {/* <Toasts /> */}
      </ConfigProvider>
    );
  };
};
