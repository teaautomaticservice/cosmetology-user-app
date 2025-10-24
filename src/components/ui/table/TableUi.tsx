import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

export type { ColumnsType };

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
      className={cn(className)}
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      size="small"
      bordered
    />
  );
};
