import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryParams } from 'src/app/shared/services/navigation.service';
import { AccountDispatchers } from '../../store/account.dispatchers';
import { AccountSelectors } from '../../store/account.selectors';

@Component({
  selector: 'app-bank-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private accountDispatchers: AccountDispatchers,
    private accountSelectors: AccountSelectors
  ) { }

  selectedAccountNumber = '';
  selectedToAccountNumber = '';
  subscriptions = new Subscription();

  ngOnInit(): void {
    this.accountDispatchers.loadAccounts();
    this.accountDispatchers.loadContacts();

    this.subscriptions.add(
      this.route.params.subscribe((params: Params) => this.selectedAccountNumber = params.account)
    );

    this.subscriptions.add(
      this.route.queryParams.subscribe((params: Params) => this.selectedToAccountNumber = params[QueryParams.toAccount])
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
