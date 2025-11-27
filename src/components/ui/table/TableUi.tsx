import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetRowKey, TablePaginationConfig } from 'antd/es/table/interface';
import cn from 'classnames';

export type { ColumnsType };

type Props<T extends Object> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey?: string | keyof T | GetRowKey<T>;
  className?: string;
  loading?: boolean;
  pagination?: TablePaginationConfig;
  footer?: TableProps['footer'];
}

export const TableUi = <T extends Object>({
  columns,
  dataSource,
  rowKey = 'id',
  className,
  loading,
  pagination,
  footer,
}: Props<T>) => {
  return (
    <Table
      className={cn(className)}
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      footer={footer}
      size="small"
      bordered
      pagination={pagination}
    />
  );
};
