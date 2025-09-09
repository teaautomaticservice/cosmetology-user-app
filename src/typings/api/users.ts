import { CurrentUserDto, UsersDto, UsersPaginatedDto } from "./generated";

export type UserType =  `${CurrentUserDto['type']}`;
export const UserTypeEnum = CurrentUserDto['type'];
export type CurrentUser = CurrentUserDto;

export type User = UsersDto;
export type UsersList = UsersPaginatedDto;

export const UserStatusEnum = CurrentUserDto['status'];