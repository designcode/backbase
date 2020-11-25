import { Injectable } from '@angular/core';
import { AppDispatchers } from './store/app/app.dispatchers';
import { UserDispatchers } from './store/user/user.dispatchers';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private appDispatchers: AppDispatchers,
    private userDispatchers: UserDispatchers
  ) {}

  initApplication(): Promise<any> {
    return new Promise(
      async (resolve: any, reject: any): Promise<any> => {
        try {
          this.userDispatchers.loadUserInformation();
          this.appDispatchers.loadApplicationCompleted();
          resolve();
        } catch (error) {
          reject();
        }
      }
    );
  }
}
