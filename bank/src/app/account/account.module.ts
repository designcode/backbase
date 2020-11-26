import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AccountRoutingModule } from './account-routing.module';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import * as fromAccount from './store';
import { AccountDispatchers } from './store/account.dispatchers';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './store/account.effects';
import { AccountSelectors } from './store/account.selectors';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  declarations: [SelectAccountComponent, OverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    StoreModule.forFeature(fromAccount.accountFeatureKey, fromAccount.reducer),
    EffectsModule.forFeature([AccountEffects]),
  ],
  providers: [AccountDispatchers, AccountSelectors],
})
export class AccountModule {}
