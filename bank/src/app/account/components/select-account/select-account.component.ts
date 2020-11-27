import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/models';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AccountDispatchers } from '../../store/account.dispatchers';
import { AccountSelectors } from '../../store/account.selectors';

@Component({
  selector: 'app-bank-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss'],
})
export class SelectAccountComponent implements OnInit {
  constructor(
    private navigationService: NavigationService,
    private accountDispatchers: AccountDispatchers,
    private accountSelectors: AccountSelectors
  ) {}

  get accounts$(): Observable<Account[]> {
    return this.accountSelectors.getAccounts$;
  }

  get selectedFromAccount$(): Observable<Account> {
    return this.accounts$.pipe(
      map((accounts: Account[]) => {
        return accounts[0];
      })
    );
  }

  get contacts$(): Observable<Account[]> {
    return this.accountSelectors.getContacts$;
  }

  get selectedToAccount$(): Observable<Account> {
    return this.contacts$.pipe(
      map((accounts: Account[]) => {
        return accounts[0];
      })
    );
  }

  accountSelectorForm = new FormGroup({
    fromAccount: new FormControl(''),
    toAccount: new FormControl(''),
  });


  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
    this.accountDispatchers.loadContacts();
  }

  onFromAccountSelect(account: Account): void {
    this.accountSelectorForm.controls.fromAccount.setValue(account);
  }

  onToAccountSelect(account: Account): void {
    this.accountSelectorForm.controls.toAccount.setValue(account);
  }

  makePayment(): void {
    console.log(this.accountSelectorForm.value);
    this.navigationService.navigateToAccountsOverview(
      this.accountSelectorForm.controls.fromAccount.value,
      this.accountSelectorForm.controls.toAccount.value
    );
  }
}
