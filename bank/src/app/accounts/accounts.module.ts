import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { StoreModule } from '@ngrx/store';
import * as fromAccount from './store';

@NgModule({
  declarations: [SelectAccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    StoreModule.forFeature(fromAccount.accountFeatureKey, fromAccount.reducer),
  ],
})
export class AccountsModule {}
