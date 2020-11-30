import { convertToParamMap } from '@angular/router';
import { from, Observable, of } from 'rxjs';

export const emptyObserver = (): Observable<any> => of(true);

export const activatedRouteMock = {
  params: of(convertToParamMap({account: {}}))
};

export const navigationServiceMock = {
  navigateToAccountsOverview(): Observable<any> { return of(true); },
  setQueryParams(): Observable<any> { return emptyObserver(); },
};

export const accountSelectorsMock = {

};

export const accountDispatchersMock = {
  loadAccounts(): Observable<any> { return emptyObserver(); },
  loadContacts(): Observable<any> { return emptyObserver(); },
  setSelectedAccount(): Observable<any> { return emptyObserver(); },
  loadTransfers(): Observable<any> { return emptyObserver(); },
};
