import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from 'src/app/models';

export enum QueryParams {
  fromAccount = 'fromAccount',
  toAccount = 'toAccount',
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateToAccountsOverview(account: Account, toAccount?: Account): void {
    const queryParams = {
      [QueryParams.toAccount]: toAccount?.accountNumber
    };
    this.router.navigate(['accounts', account.accountNumber], { queryParams });
  }

  setQueryParams(queryParams: Params): void {
    this.router.navigate(
    [],
    {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });

  }
}
