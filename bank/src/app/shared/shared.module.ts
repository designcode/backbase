import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectorComponent } from './components/account-selector/account-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountSelectorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AccountSelectorComponent],
})
export class SharedModule {}
