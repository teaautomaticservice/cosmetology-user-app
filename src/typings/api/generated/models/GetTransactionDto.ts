/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAccountDto } from './GetAccountDto';
export type GetTransactionDto = {
    id: number;
    parentTransactionId: string | null;
    transactionId: string;
    amount: number;
    debitId: number | null;
    debitAccount: GetAccountDto | null;
    creditId: number | null;
    creditAccount: GetAccountDto | null;
    status: GetTransactionDto.status;
    operationType: GetTransactionDto.operationType;
    executionDate: string | null;
    expireDate: string | null;
    description: string | null;
};
export namespace GetTransactionDto {
    export enum status {
        DRAFT = 'draft',
        PENDING = 'pending',
        AUTHORIZED = 'authorized',
        CANCELED = 'canceled',
        FAILED = 'failed',
        COMPLETED = 'completed',
        REVERSED = 'reversed',
    }
    export enum operationType {
        OBL = 'OBL',
        CBL = 'CBL',
        RCP = 'RCP',
        CSH = 'CSH',
        TRN = 'TRN',
        RFI = 'RFI',
        RFO = 'RFO',
        LON = 'LON',
        LOR = 'LOR',
        LOO = 'LOO',
        LRO = 'LRO',
        ADJ = 'ADJ',
        WRO = 'WRO',
        DPR = 'DPR',
    }
}

