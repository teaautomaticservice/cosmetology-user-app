import { paths } from '@router/paths';
import { Menu } from 'antd';
import { MenuItemGroupType, MenuItemType } from 'antd/es/menu/interface';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';

import s from './navbar.module.css';

const dashboardsMenu: MenuItemGroupType<MenuItemType> = {
  label: 'Dashboards',
  type: 'group',
  children: [
    {
      label: 'My space',
      key: paths.main,
    },
    {
      label: 'Money storages',
      key: paths.moneyStorages,
    },
  ],
};

const menuItems: (MenuItemType | MenuItemGroupType<MenuItemType>)[] = [
  dashboardsMenu,
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const chapterOfPath = `/${pathname.split('/')[1]}`;

  const onClick: MenuClickEventHandler = ({ key }) => {
    if (typeof key === 'string') {
      navigate(key);
    }
  };

  return (
    <div className={s.root}>
      <Menu
        className={s.menu}
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={[chapterOfPath]}
        items={menuItems}
      />
    </div>
  );
};
