import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QueryParams } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-bank-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  selectedAccountNumber = this.route.snapshot.params.account;
  subscriptions = new Subscription();

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.subscriptions.add(
      // this.route.queryParams.subscribe((params: Params) => this.selectedAccountNumber = params[QueryParams.toAccount])
    );
  }

}
