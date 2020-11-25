import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AccountRoutingModule } from './account-routing.module';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import * as fromAccount from './store';
import { AccountDispatchers } from './store/account.dispatchers';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './store/account.effects';

@NgModule({
  declarations: [SelectAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    StoreModule.forFeature(fromAccount.accountFeatureKey, fromAccount.reducer),
    EffectsModule.forFeature([AccountEffects]),
  ],
  providers: [AccountDispatchers],
})
export class AccountModule {}
