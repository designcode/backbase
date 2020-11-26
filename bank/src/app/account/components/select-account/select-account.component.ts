import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  get contacts$(): Observable<Account[]> {
    return this.accountSelectors.getContacts$;
  }

  accountSelectorForm = new FormGroup({
    fromAccount: new FormControl(''),
    toAccount: new FormControl(''),
  });


  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
    this.accountDispatchers.loadContacts();
  }

  makePayment(): void {
    this.navigationService.navigateToAccountsOverview(
      this.accountSelectorForm.controls.fromAccount.value,
      this.accountSelectorForm.controls.toAccount.value
    );
  }
}
