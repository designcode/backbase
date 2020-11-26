import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models';
import { AccountDispatchers } from '../../store/account.dispatchers';
import { AccountSelectors } from '../../store/account.selectors';

@Component({
  selector: 'app-bank-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss'],
})
export class SelectAccountComponent implements OnInit {
  get accounts$(): Observable<Account[]> {
    return this.accountSelectors.getAccounts$;
  }

  get contacts$(): Observable<Account[]> {
    return this.accountSelectors.getContacts$;
  }

  constructor(private accountDispatchers: AccountDispatchers, private accountSelectors: AccountSelectors) {}

  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
    this.accountDispatchers.loadContacts();
  }

  setSelectedAccount(account: Account): void {
    console.log(account);
  }

  setSelectedContact(contact: Account): void {
    console.log(contact);
  }
}
