import { paths } from '@router/paths';
import { Menu } from 'antd';
import { MenuItemGroupType, MenuItemType } from 'antd/es/menu/interface';
import cn from 'classnames';
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
      label: 'Transactions',
      key: paths.transactions,
    },
    {
      type: 'divider',
    },
    {
      label: 'Accounts',
      key: paths.accounts,
    },
    {
      label: 'Accounts by Storage',
      key: paths.accountsByStorage,
    },
    {
      label: 'Accounts aggregated',
      key: paths.accountsAggregated,
    },
    {
      type: 'divider',
    },
    {
      label: 'Money storages',
      key: paths.moneyStorages,
    },
    {
      label: 'Currencies',
      key: paths.currencies,
    },
  ],
};

const menuItems: (MenuItemType | MenuItemGroupType<MenuItemType>)[] = [
  dashboardsMenu,
];

type Props = {
  className?: string;
}

export const Navbar: React.FC<Props> = ({
  className,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick: MenuClickEventHandler = ({ key }) => {

    if (typeof key === 'string') {
      navigate(key);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <Menu
        className={s.menu}
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={[pathname]}
        items={menuItems}
      />
    </div>
  );
};
