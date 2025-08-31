
import { GenericLayout } from '@components/layouts/genericLayout/GenericLayout';
import { Typography } from 'antd';

import s from './emptyLoader.module.css';

const { Title } = Typography;

export const EmptyLoader: React.FC = () => {
  return (
    <GenericLayout>
      <div className={s.root}>
        <span>Is loading...</span>
        <div className={s.overlay}>
          <Title>Is loading, please wait...</Title>
        </div>
      </div>
    </GenericLayout>
  )
}