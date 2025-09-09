import { FC } from 'react';
import { type UserType, UserTypeEnum } from '@typings/api/users';

export type RouterRole = UserType | 'unauthorized' | 'pending' | 'all';
export const RouterRoleEnum = {
  ...UserTypeEnum,
  UNAUTHORIZED: 'unauthorized',
  PENDING: 'pending',
  ALL: 'all',
} as const;

export type RouterPage = {
  path: string;
  Component: FC;
  Layout?: FC;
  roles?: RouterRole[];
};