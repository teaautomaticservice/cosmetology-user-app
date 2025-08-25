import { colors } from '@ant/colors';
import { RootModal } from '@components/domain/rootModal/RootModal';
import { cssVars } from '@constants/theme';
import { ConfigProvider, ThemeConfig } from 'antd';

import s from './genericLayout.module.css';

const themeConfig: ThemeConfig = {
  components: {
    Layout: {
      bodyBg: colors.blue1,
      headerBg: colors.colorWhite,
    }
  }
};

type Props = React.PropsWithChildren;

export const GenericLayout: React.FC<Props> = ({ children }) => {
  return (
    <ConfigProvider theme={themeConfig}>
      <div className={s.root} style={cssVars as React.CSSProperties}>
        <div className={s.mainWrapper}>
          {children}
        </div>

        <RootModal />
      </div>
    </ConfigProvider>
  )
}