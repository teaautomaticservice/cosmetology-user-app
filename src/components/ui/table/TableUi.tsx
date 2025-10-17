import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

import s from './tableUi.module.css';

type Props<T extends Object> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  className?: string;
  loading?: boolean;
}

export const TableUi = <T extends Object, >({
  columns,
  dataSource,
  className,
  loading,
}: Props<T>) => {
  return (
    <Table
      className={cn(s.root, className)}
      columns={columns}
      dataSource={dataSource}
      rowKey={'id'}
      loading={loading}
    />
  );
};
