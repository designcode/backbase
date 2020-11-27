import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Account } from 'src/app/models';
import { NavigationService, QueryParams } from 'src/app/shared/services/navigation.service';
import { AccountDispatchers } from '../../store/account.dispatchers';
import { AccountSelectors } from '../../store/account.selectors';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private accountDispatchers: AccountDispatchers,
    private accountSelectors: AccountSelectors,
    private navigationService: NavigationService
  ) { }

  get accounts$(): Observable<Account[]> {
    return this.accountSelectors.getAccounts$;
  }

  get selectedFromAccount$(): Observable<Account> {
    return combineLatest([this.accounts$, this.route.params]).pipe(
      map(([accounts, queryParams]: [Account[], Params]) => {
        return accounts.filter((account: Account) => account.accountNumber === queryParams.account)[0];
      })
    );
  }

  get contacts$(): Observable<Account[]> {
    return this.accountSelectors.getContacts$;
  }

  get selectedToAccount$(): Observable<Account> {
    return combineLatest([this.contacts$, this.route.queryParams]).pipe(
      map(([accounts, queryParams]: [Account[], Params]) => {
        return accounts.filter((account: Account) => account.accountNumber === queryParams[QueryParams.toAccount])[0];
      })
    );
  }

  transferForm = new FormGroup({
    fromAccount: new FormControl(''),
    toAccount: new FormControl(''),
  });

  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
    this.accountDispatchers.loadContacts();
  }

  onFromAccountSelect(account: Account): void {
    this.transferForm.controls.fromAccount.setValue(account);
    this.navigationService.navigateToAccountsOverview(account);
  }

  onToAccountSelect(account: Account): void {
    this.transferForm.controls.toAccount.setValue(account);
    this.navigationService.setQueryParams({
      [QueryParams.toAccount]: account.accountNumber
    });
  }

  makePayment(): void {
    console.log(this.transferForm.value);
  }
}
