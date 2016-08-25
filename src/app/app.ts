import { Component } from '@angular/core';
import { MainComponent } from './containers/main';

@Component({
  selector: 'app',
  directives: [
    MainComponent
  ],
  template: `
    <div>
      <main-container></main-container>
    </div>
  `
})
export class App {}
