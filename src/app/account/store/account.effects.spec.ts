import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Subject } from 'rxjs';

import { accountSelectorsMock } from 'src/testing/mocks';

import { AccountsPayload } from './index';
import { AccountEffects } from './account.effects';
import { AccountSelectors } from './account.selectors';
import * as AccountActions from './account.actions';
import { filter } from 'rxjs/operators';


describe('AccountEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: AccountEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
        ],
      providers: [
        AccountEffects,
        provideMockActions(() => actions$),
        { provide: AccountSelectors, useValue: accountSelectorsMock },
      ]
    });

    effects = TestBed.inject(AccountEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('loadAccounts Effect', () => {
    actions$ = new ReplaySubject();
    actions$.next(AccountActions.loadAccounts);

    effects.loadAccounts$
      .pipe(filter(
        (response: AccountsPayload) => response.accounts !== undefined
      ))
      .subscribe((response: AccountsPayload) => {
        expect(response.accounts.length).toBeGreaterThan(1);
      });
  });
});
