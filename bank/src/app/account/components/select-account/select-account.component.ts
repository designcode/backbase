import { Component, OnInit } from '@angular/core';
import { AccountDispatchers } from '../../store/account.dispatchers';

@Component({
  selector: 'app-bank-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss'],
})
export class SelectAccountComponent implements OnInit {
  constructor(private accountDispatchers: AccountDispatchers) {}

  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
  }
}
