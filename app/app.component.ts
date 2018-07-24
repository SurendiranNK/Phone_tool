import { Component } from '@angular/core';

import { LoginComponent } from './Login/login.component';
@Component({
  selector: 'my-app',
  template: `
  <div>
  <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent { }
