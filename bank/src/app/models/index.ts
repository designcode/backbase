import { HttpErrorResponse } from '@angular/common/http';

export interface Account {
  name: string;
  accountNumber: string;
}

export interface Summary {
  categoryCode: string;
  dates: BankDate;
  transaction: Transaction;
}

export interface BankDate {
  valueDate: number;
}

export interface Transaction {
  amountCurrency: Currency;
  type: TransactionTypes;
  creditDebitIndicator: CreditDebitIndicators;
  merchant: Account;
}

export interface Currency {
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

export interface Transfer {
  fromAccount: Account;
  toAccount: Account;
  amount: Currency;
}
