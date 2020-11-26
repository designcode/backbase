import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/models';

@Component({
  selector: 'app-bank-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent {
  constructor() { }

  @Input()
  accounts: Account[] = [];

  @Output()
  accountSelect = new EventEmitter<Account>();

  accountSelector = new FormControl();

  onAccountSelect(): void {
    this.accountSelect.emit(this.accountSelector.value);
  }

}
