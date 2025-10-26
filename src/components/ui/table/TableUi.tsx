import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

export type { ColumnsType };

type Props<T extends Object> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  className?: string;
  loading?: boolean;
  footer?: TableProps['footer'];
}

export const TableUi = <T extends Object, >({
  columns,
  dataSource,
  className,
  loading,
  footer,
}: Props<T>) => {
  return (
    <Table
      className={cn(className)}
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      footer={footer}
      size="small"
      bordered
    />
  );
};
