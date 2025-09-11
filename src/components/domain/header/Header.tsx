import { CommentOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { paths } from "@router/paths";
import { useAppConfigStore } from "@stores/appConfig"
import { TeaLeafSvg } from '@svg';
import { Button, Dropdown, MenuProps, Typography } from "antd"
import { Link,useNavigate } from "react-router-dom";

import s from './header.module.css';

const { Title, Text } = Typography;

export const Header: React.FC = () => {
  const { logOut, currentUser } = useAppConfigStore();
  const navigation = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: 'History',
      key: '1',
      onClick: () => navigation(paths.history),
      icon: <CommentOutlined />,
    },
    {
      label: 'LogOut',
      key: '2',
      onClick: logOut,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <header className={s.root}>
      <div className={s.leftSection}>
        <Link to={paths.main} className={s.mainLink}>
          <TeaLeafSvg className={s.logoIcon} />
          <Title level={3} className={s.logoTitle}>TAS: Cosmetology</Title>
        </Link>

      </div>
      <div>
        <Text className={s.displayName}>{currentUser?.displayName}</Text>

        <Dropdown menu={menuProps} trigger={['click']}>
          <Button
            type="primary"
            icon={<MenuOutlined />}
          />
        </Dropdown>
      </div>
    </header>
  )
}