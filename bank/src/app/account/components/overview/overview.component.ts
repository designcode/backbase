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

  subscriptions = new Subscription();

  ngOnInit(): void {

    this.subscriptions.add(
      this.route.params.subscribe((params: Params) => {
        console.log('params', params);
        this.accountDispatchers.setSelectedAccount(params.account);
        this.accountDispatchers.loadTransfers();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
