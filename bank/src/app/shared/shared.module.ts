import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectorComponent } from './components/account-selector/account-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from './services/navigation.service';
import { HttpClientModule } from '@angular/common/http';
import { TransferListComponent } from './components/transfer-list/transfer-list.component';
import { SearchSortHeaderComponent } from './components/search-sort-header/search-sort-header.component';
import { SortButtonComponent } from './components/sort-button/sort-button.component';
import { RemoveHostDirective } from './directives/remove-host.directive';

@NgModule({
  declarations: [AccountSelectorComponent, TransferListComponent, SearchSortHeaderComponent, SortButtonComponent, RemoveHostDirective],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [
    AccountSelectorComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TransferListComponent,
    SearchSortHeaderComponent,
    SortButtonComponent,
    RemoveHostDirective
  ],
  providers: [NavigationService]
})
export class SharedModule {}
