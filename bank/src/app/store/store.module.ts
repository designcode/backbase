import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { rootReducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AppDispatchers } from './app/app.dispatchers';
import { UserDispatchers } from './user/user.dispatchers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [AppDispatchers, UserDispatchers],
})
export class AppStoreModule {}
