import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, from, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountActions from './account.actions';
import * as AppActions from './../../store/app/app.actions';
import { Account, FailedActionPayload } from 'src/app/models';

@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions) {}

  loadAccounts$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.loadAccounts),
    mergeMap(() => {
      return concat(
        of(AppActions.showLoadingIndicator()),
        this.loadAccounts(),
        of(AppActions.hideLoadingIndicator())
      ).pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            const errorMessage = errorResponse && errorResponse.error && errorResponse.error.message;
            const payload: FailedActionPayload = {
              errorMessage,
              errorResponse
            };
            return of(AccountActions.loadAccountsFailure(payload));
          })
        );
    })
  ));

  private loadAccounts(): Observable<any> {
    const accounts: Account[] = [{
        name: 'Abdullah',
        accountNumber: 'NL15ABNA1234567890'
    }, {
        name: 'Ibrahim',
        accountNumber: 'NL15ABNA0987654321'
    }];

    // Faking a backend call
    return from([accounts]).pipe(
      map((account: Account[]) => {
        return AccountActions.loadAccountsSuccess({
          accounts: account
        });
      })
    );
  }
}
