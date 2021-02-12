# Country Data App

This application displays a set of informations about a particular capital in Europe or Asia, based on the filter criteria (Region and Country)

# Tools

Angular 11.1.4, 
NgRx 11.0, 
RxJs 6.6, 
TypeScript 4.1.2, 
Jasmine 3.6, 
Karma 5.2

# Istructions

To view the details of a particular capital you must select first a region and then a specific country.

The application caches the API requests. Whenever a request is done to the application checks if this requests is already cache before executing a new request.

The componentes are organised by features and can be ported to a different application.

# What could I've done if I had more time?

Improve the UI (add Angular Material and more css). It is very basic because the idea was to get it working first. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

