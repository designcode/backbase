import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, from, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountActions from './account.actions';
import * as AppActions from './../../store/app/app.actions';
import { Account, FailedActionPayload, Transfer } from 'src/app/models';
import { Action } from '@ngrx/store';
import { AccountSelectors } from './account.selectors';

@Injectable()
export class AccountEffects {
  constructor(private http: HttpClient, private actions$: Actions, private accountSelectors: AccountSelectors) {}

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

  loadContacts$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.loadContacts),
    mergeMap(() => {
      return concat(
        of(AppActions.showLoadingIndicator()),
        this.loadContacts(),
        of(AppActions.hideLoadingIndicator())
      ).pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            const errorMessage = errorResponse && errorResponse.error && errorResponse.error.message;
            const payload: FailedActionPayload = {
              errorMessage,
              errorResponse
            };
            return of(AccountActions.loadContactsFailure(payload));
          })
        );
    })
  ));

  loadTransfers$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.loadTransfers),
    concatMap((action: Action) => of(action).pipe(withLatestFrom(this.accountSelectors.getSelectedAccount$))),
    mergeMap(([action, selectedAccount]: [Action, Account]) => {
      console.log('effects selectedAccount', selectedAccount);
      return concat(
        of(AppActions.showLoadingIndicator()),
        this.loadTransfers(selectedAccount),
        of(AppActions.hideLoadingIndicator())
      ).pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            const errorMessage = errorResponse && errorResponse.error && errorResponse.error.message;
            const payload: FailedActionPayload = {
              errorMessage,
              errorResponse
            };
            return of(AccountActions.loadTransfersFailure(payload));
          })
        );
      }
    )
  ));

  private loadTransfers(selectedAccount: Account): Observable<any> {
    return this.http.get<any[]>(`/assets/mocks/transactions-${selectedAccount.accountNumber}.json`).pipe(
      map(
        (transfers: any) => {
          console.log('transfers', transfers);
          return AccountActions.loadTransfersSuccess({transfers: transfers.data as Transfer[]});
        }
      )
    );
  }

  private loadAccounts(): Observable<any> {
    const accountsMock: Account[] = [{
        name: 'Abdullah',
        accountNumber: 'NL15ABNA1234567890'
    }, {
        name: 'Ibrahim',
        accountNumber: 'NL15ABNA0987654321'
    }];

    // Faking a backend call
    return from([accountsMock]).pipe(
      map((accounts: Account[]) => {
        return AccountActions.loadAccountsSuccess({ accounts });
      })
    );
  }

  private loadContacts(): Observable<any> {
    const contactsMock: Account[] = [{
        name: 'Steve',
        accountNumber: 'NL15ABNA1234567890'
    }, {
        name: 'Adam',
        accountNumber: 'NL15ABNA0987654321'
    }];

    // Faking a backend call
    return from([contactsMock]).pipe(
      map((accounts: Account[]) => {
        return AccountActions.loadContactsSuccess({ accounts });
      })
    );
  }
}
