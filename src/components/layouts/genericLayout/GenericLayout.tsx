import { colors } from '@ant/colors';
import { RootModal } from '@components/domain/rootModal/RootModal';
import { cssVars } from '@constants/theme';
import { ConfigProvider, ThemeConfig } from 'antd';
import cn from 'classnames';

import s from './genericLayout.module.css';

const themeConfig: ThemeConfig = {
  components: {
    Layout: {
      bodyBg: colors.blue1,
      headerBg: colors.colorWhite,
    }
  }
};

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export const GenericLayout: React.FC<Props> = ({
  children,
  className,
}) => {
  return (
    <ConfigProvider theme={themeConfig}>
      <div className={s.root} style={cssVars as React.CSSProperties}>
        <div className={cn(s.mainWrapper, className)}>
          {children}
        </div>

        <RootModal />
      </div>
    </ConfigProvider>
  )
}