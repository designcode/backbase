import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectAccountComponent } from './components/select-account/select-account.component';

const routes: Routes = [
  {
    path: '',
    component: SelectAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
