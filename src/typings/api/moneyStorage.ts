import { MoneyStorageDto } from './generated';

export type MoneyStorage = MoneyStorageDto;
export type MoneyStorageStatus =  `${MoneyStorageDto['status']}`;
export const MoneyStorageStatusEnum = MoneyStorageDto['status'];
