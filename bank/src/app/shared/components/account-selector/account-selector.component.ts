import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Account } from 'src/app/models';

@Component({
  selector: 'app-bank-account-selector',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountSelectorComponent),
      multi: true
    }
  ],
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements ControlValueAccessor {
  constructor() { }

  @Input()
  accounts: Account[] = [];

  @Output()
  accountSelect = new EventEmitter<Account>();

  val = '';

  set value(val: any) {
    if (val !== undefined && this.val !== val){
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
      this.accountSelect.emit(val);
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
