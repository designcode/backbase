import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, from, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountActions from './account.actions';
import * as AppActions from './../../store/app/app.actions';
import { Account, FailedActionPayload, QueryModel, SortBy, SortingOrders, Transfer } from 'src/app/models';
import { Action } from '@ngrx/store';
import { AccountSelectors } from './account.selectors';
import { TransferPayload } from '.';

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
    ofType(AccountActions.loadTransfers, AccountActions.setTransferQuery),
    concatMap((action: Action) => of(action).pipe(
      withLatestFrom(this.accountSelectors.selectedAccount$, this.accountSelectors.transferQuery$)
    )),
    mergeMap(([action, selectedAccount, query]: [Action, Account, QueryModel]) => {
      return concat(
        of(AppActions.showLoadingIndicator()),
        this.loadTransfers(selectedAccount, query),
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

  createTransfer$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.createTransfer),
    mergeMap((action: TransferPayload) => {
      return concat(
        of(AppActions.showLoadingIndicator()),
        this.createTransfer(action.transfer),
        of(AppActions.hideLoadingIndicator())
      ).pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = errorResponse && errorResponse.error && errorResponse.error.message;
          const payload: FailedActionPayload = {
            errorMessage,
            errorResponse
          };
          return of(AccountActions.createTransferFailure(payload));
        })
      );
    })
  ));

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

  private loadTransfers(selectedAccount: Account, query: QueryModel): Observable<any> {
    return this.http.get<any[]>(`./assets/mocks/transactions-${selectedAccount.accountNumber}.json`).pipe(
      map(
        (transfers: any) => {
          const queriedTransfers = (transfers.data as Transfer[])
            .filter((transfer: Transfer) =>
              !!query.search?.toLowerCase() ? transfer.merchant.name?.toLowerCase().indexOf(query.search) !== -1 : true
            )
            .sort(this.sortTransfers(query));
          return AccountActions.loadTransfersSuccess({transfers: queriedTransfers as Transfer[]});
        }
      )
    );
  }

  private createTransfer(transfer: Transfer): Observable<any> {
    return from([true]).pipe(
      map(() => AccountActions.createTransferSuccess({transfer}))
    );
  }

  private sortTransfers(query: QueryModel): any {
    // TODO: This function is dirty, but then again, this logic should be in back-end
    const sortFunc = (a: Transfer, b: Transfer): number => {
      let c: any;
      let d: any;

      switch (query.sortBy) {
        case SortBy.Date:
          c = new Date(a.dates?.valueDate as string).getTime();
          d = new Date(b.dates?.valueDate as string).getTime();
          break;
        case SortBy.Beneficiary:
          c = a.merchant.name?.toLowerCase();
          d = b.merchant.name?.toLowerCase();
          break;
        case SortBy.Amount:
          c = a.transaction.amountCurrency.amount;
          d = b.transaction.amountCurrency.amount;
          break;
      }

      if (query.sortBy === SortBy.Beneficiary) {
        switch (query.sortOrder) {
          case SortingOrders.Asc:
          default:
            return c.localeCompare(d);
          case SortingOrders.Dsc:
            return d.localeCompare(c);
        }
      } else {
        switch (query.sortOrder) {
          case SortingOrders.Asc:
          default:
            return c - d;
          case SortingOrders.Dsc:
            return d - c;
        }
      }
    };

    return sortFunc;
  }
}
