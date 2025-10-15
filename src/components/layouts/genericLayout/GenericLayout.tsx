import '@assets/css/index.css';

import { RootModal } from '@components/domain/rootModal/RootModal';
import { Toasts } from '@components/ui/toasts/Toasts';
import { colors } from '@constants/colors';
import { cssVars } from '@constants/theme';
import { ConfigProvider, ThemeConfig } from 'antd';
import cn from 'classnames';

import s from './genericLayout.module.css';

const themeConfig: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: colors['--accent'],
      primaryColor: colors['--text-invert'],
    },
    Input: {
      colorBorder: colors['--light-accent'],
      activeBorderColor: colors['--accent'],
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
        <Toasts />
      </div>
    </ConfigProvider>
  );
};
