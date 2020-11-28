import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Account, CreditDebitIndicators, TransactionTypes, Transfer } from 'src/app/models';
import { NavigationService, QueryParams } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnChanges {

  constructor(
    private navigationService: NavigationService
  ) { }

  @Input()
  accounts: Account[] = [];

  @Input()
  selectedFromAccount: Account | null = null;

  @Input()
  contacts: Account[] = [];

  @Input()
  selectedToAccount: Account | null = null;

  @Input()
  accountBalance = 0;

  @Input()
  transferLimit = 0;

  @Input()
  canTransfer = false;

  transferForm = new FormGroup({
    fromAccount: new FormControl('', Validators.required),
    toAccount: new FormControl('', Validators.required),
    amount: new FormControl('')
  });

  @Output()
  submitTransfer = new EventEmitter<Transfer>();

  private get amountValidators(): ValidatorFn[] {
    return [Validators.required, Validators.max(this.transferLimit)];
  }

  ngOnChanges(): void {
    this.transferForm.controls.amount.setValidators(this.amountValidators);
    this.transferForm.controls.amount.updateValueAndValidity();
  }

  onFromAccountSelect(account: Account): void {
    this.transferForm.controls.fromAccount.setValue(account);
    if (!!account) {
      this.navigationService.navigateToAccountsOverview(account);
    }
  }

  onToAccountSelect(account: Account): void {
    this.transferForm.controls.toAccount.setValue(account);
    this.navigationService.setQueryParams({
      [QueryParams.toAccount]: account ? account.accountNumber : ''
    });
  }

  makePayment(): void {
    if (this.transferForm.valid) {
      this.submitTransfer.emit(this.mapFormToTransfer());
      this.transferForm.reset();
    }
  }

  private mapFormToTransfer(): Transfer {
    const transferForm = this.transferForm.controls;
    return {
      categoryCode: [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''), // TODO: Move to common function library
      dates: {
        valueDate: new Date().getTime()
      },
      transaction: {
        amountCurrency: {
          amount: transferForm.amount.value,
          currencyCode: 'EUR' // TODO: Make it part of form
        },
        type: TransactionTypes.Transfer,
        creditDebitIndicator: CreditDebitIndicators.DBIT
      },
      merchant: {
        name: transferForm.toAccount.value.name,
        accountNumber: transferForm.toAccount.value.accountNumber
      }
    };
  }
}
