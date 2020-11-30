# Bank

This is the documentation for Backbase assignment. It can be live previewed at [https://designcode.github.io/peach-bank/accounts]

## Architecture

I have setup the application using Angular 11 (It's a green field project so why not use the latest :) and NGRX for state management.
I've setup and created components keeping in mind that this code can be extended into a full working banking app.

Business logic is setup to support multiple accounts (Current, Saving) like in any online banking environment. A lot of focus has been
put to make application extendable and making sure that the components are as slim as possible. All business logic is placed reducer and
selectors and components are mostly dumb.

As a result, I've focused very less on styling application. I've used bootstrap to setup the layout.

### NGRX

I am using NGRX Store to dispatch actions and reduce the data and Effects for side effects. I've also introduced Dispatchers which are
basically wrappers on top of Actions. Also, selectors are exposed via a Selector class. This way, components no nothing about store and
stays slim and dumb.

### Module Hierarchy

I've splitted functionality in couple of modules.

#### App Module

App module is the root module that imports Routing, Store, Shared and other modules for Root. It also uses AppInitializerService that can contain
any initialization related functionality.

#### Store Module

Store Module registers Effects and Reducer for Root. All the application/root level state management goes in there.

#### Shared Module

Shared module imports, declare and exports common modules like FormModule etc. This way you don't have import those modules individually in your feature
module but you juat import shared.

#### Layout Module

As the name implies, Layout Module contains all the dumb layout related module (header, footer etc)

## Notes on Testing

To save time, I've tested handful of items you can see the tests for following items

- remove-host.directive.spec.ts
- sort-button.component.spec.ts
- account.effects.spec

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
