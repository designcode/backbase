import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './store/store.module';
import { AppComponent } from './app.component';
import { AppInitializerService } from './app-initializer.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppStoreModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AppInitializerService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function appInitializerFactory(
  appInitializer: AppInitializerService
): () => Promise<any> {
  return (): Promise<any> => appInitializer.initApplication();
}
