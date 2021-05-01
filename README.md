# LanguageApps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1. 

## About
### Micro-apps
This project is currently experimental. The goal is to migrate multiple one-off applications into a common Angular monorepo workspace, following a micro application architecture. Existing language apps will be refactored micro-apps and imported into app containers (e.g. language website, container for mobile build with NativeScript). 
### Libraries
While we prefer minimal dependencies, we do make use of well-established libraries. When adding new UI componenets, we first look at the Angular Material library. If no component exists, and we anticipate possible reuse of the proposed component across multiple applications in the workspace, we will develop the custom component as a library within the same workspace.

## Development server

Run `ng serve --project <project-name>` for a dev server. Navigate to `http://localhost:4200/`. 

## Code scaffolding

Run `ng generate component component-name --project <project-name>` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Building and Linking
To use a library locally in development, you must first build and link the library. For example, here's how you build and link the audio library.
```
ng build --project audio
cd <project-base-dir>/dist/audio
npm link
cd <project-base-dir>
npm link audio

```
Then within a given project, you should be able to 
`import { AudioService } from 'audio';`

For a different local library, just substitute `<library-name>` for audio in the above directions.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
