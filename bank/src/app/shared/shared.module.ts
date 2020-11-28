import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectorComponent } from './components/account-selector/account-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from './services/navigation.service';
import { HttpClientModule } from '@angular/common/http';
import { TransferListComponent } from './components/transfer-list/transfer-list.component';

@NgModule({
  declarations: [AccountSelectorComponent, TransferListComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [AccountSelectorComponent, HttpClientModule, FormsModule, ReactiveFormsModule, TransferListComponent],
  providers: [NavigationService]
})
export class SharedModule {}
