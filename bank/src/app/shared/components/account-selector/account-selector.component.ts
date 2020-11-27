import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models';

@Component({
  selector: 'app-bank-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements OnInit {
  constructor() { }

  @Input()
  accounts: Account[] = [];

  @Input()
  selectedAccount: Account | null = null;

  @Output()
  accountSelect = new EventEmitter<Account | null>();

  ngOnInit(): void {
    if (this.selectedAccount) {
      this.onAccountChange();
    }
  }

  onAccountChange(): void {
    this.accountSelect.emit(this.selectedAccount);
  }

}
