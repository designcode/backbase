import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models';

@Component({
  selector: 'app-bank-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements OnInit, OnChanges {
  constructor() { }

  @Input()
  accounts: Account[] = [];

  @Input()
  selectedAccount: Account | null = null;

  @Input()
  disableOnSelection = false;

  @Output()
  accountSelect = new EventEmitter<Account | null>();

  get disabled(): boolean {
    return !!this.selectedAccount && this.disableOnSelection;
  }

  get selectedAccountFormatted(): string {
    return `${this.selectedAccount?.name} (${this.selectedAccount?.accountNumber})`;
  }

  ngOnInit(): void {
    this.onAccountChange();
  }

  ngOnChanges(): void {
    this.onAccountChange();
  }

  onAccountChange(): void {
    this.accountSelect.emit(this.selectedAccount);
  }

  reset(): void {
    this.selectedAccount = null;
    this.onAccountChange();
  }
}
