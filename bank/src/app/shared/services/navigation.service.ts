import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navigateToAccountsOverview(account: Account, toAccount?: Account): void {
    const queryParams = {
      toAccount: toAccount?.accountNumber
    };
    this.router.navigate(['accounts', account.accountNumber], { queryParams });
  }
}
