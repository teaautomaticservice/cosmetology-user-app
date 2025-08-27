import { Typography } from 'antd';

import s from './authLayout.module.css';

import authBanner from '@assets/png/auth-banner.png';

const { Title, Text } = Typography;

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.titleContainer}>
        <Title className={s.title}>TAS: Cosmetology</Title>
        <Text className={s.titleDescription}>Tea Automatic Service</Text>
      </div>
      <div className={s.bannerContainer}>
        <img src={authBanner} alt="auth-banner" className={s.bannerImg} />
        <div className={s.formContainer}>
          {children}
        </div>
      </div>
    </div>
  )
}