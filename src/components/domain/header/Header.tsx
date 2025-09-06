import { useAppConfigStore } from "@stores/appConfig"
import { TeaLeafSvg } from '@svg';
import { Button, Typography } from "antd"

import s from './header.module.css';

const { Title, Text } = Typography;

export const Header: React.FC = () => {
  const { logOut, currentUser } = useAppConfigStore();

  return (
    <header className={s.root}>
      <div className={s.leftSection}>
        <TeaLeafSvg className={s.logoIcon} />
        <Title level={3} className={s.logoTitle}>TAS: Cosmetology</Title>
      </div>
      <div>
        <Text className={s.displayName}>{currentUser?.displayName}</Text>
        <Button type="primary" onClick={logOut}>LogOut</Button>
      </div>
    </header>
  )
}