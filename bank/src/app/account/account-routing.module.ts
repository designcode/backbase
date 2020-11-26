import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';

const routes: Routes = [
  {
    path: '',
    component: SelectAccountComponent,
  },
  {
    path: ':account',
    component: OverviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
