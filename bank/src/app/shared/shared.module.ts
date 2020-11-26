import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectorComponent } from './components/account-selector/account-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from './services/navigation.service';

@NgModule({
  declarations: [AccountSelectorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AccountSelectorComponent, FormsModule, ReactiveFormsModule],
  providers: [NavigationService]
})
export class SharedModule {}
