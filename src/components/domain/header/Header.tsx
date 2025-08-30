import { useAppConfigStore } from "@stores/appConfig"
import { TeaLeafSvg } from '@svg';
import { Button, Typography } from "antd"

import s from './header.module.css';

const { Title } = Typography;

export const Header: React.FC = () => {
  const { logOut } = useAppConfigStore();

  return (
    <header className={s.root}>
      <div className={s.leftSection}>
        <TeaLeafSvg className={s.logoIcon} />
        <Title level={3} className={s.logoTitle}>TAS: Cosmetology</Title>
      </div>
      <Button type="primary" onClick={logOut}>LogOut</Button>
    </header>
  )
}