/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAccountDto } from './GetAccountDto';
import type { OperationType } from './OperationType';
import type { TransactionStatus } from './TransactionStatus';
export type GetTransactionDto = {
    id: number;
    parentTransactionId: string | null;
    transactionId: string;
    amount: number;
    debitId: number | null;
    debitAccount: GetAccountDto | null;
    creditId: number | null;
    creditAccount: GetAccountDto | null;
    status: TransactionStatus;
    operationType: OperationType;
    executionDate: string | null;
    expireDate: string | null;
    description: string | null;
};

