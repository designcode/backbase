import { HttpErrorResponse } from '@angular/common/http';

export interface Account {
  name?: string;
  accountNumber: string;
}

export interface Transfer {
  categoryCode?: string;
  dates?: BankDate;
  transaction: Transaction;
  merchant: Account;
}

export interface BankDate {
  valueDate: number;
}

export interface Transaction {
  amountCurrency: AmountCurrency;
  type: TransactionTypes;
  creditDebitIndicator: CreditDebitIndicators;
}

export interface AmountCurrency {
  amount: number;
  currencyCode: string;
}

export enum TransactionTypes {
  Salary = 'Salaries',
  Payment = 'Card Payment',
  Transfer = 'Online Transfer',
}

export enum CreditDebitIndicators {
  CRDT = 'CRDT',
  DBIT = 'DBIT',
}

export interface FailedActionPayload {
  errorMessage: string;
  errorResponse: HttpErrorResponse;
}
