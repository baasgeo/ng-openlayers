import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
      <ul class="topnav">
          <li *ngFor="let route of routes">
              <a [routerLink]="route.path" routerLinkActive="active">{{route.path}}</a>
          </li>
      </ul>

      <div class="container">
          <router-outlet></router-outlet>
      </div>
  `
})
export class AppComponent implements OnInit {
  routes;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routes = this.router.config;
  }
}
