import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  hideHeaderRoutes = ['', 'loginadmin', 'info'];
  
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.shouldShowHeader();
      this.shouldShowFooter();
    });
  }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url.split('/')[1];
    return !this.hideHeaderRoutes.includes(currentRoute);
  }

  shouldShowFooter(): boolean {
    const currentRoute = this.router.url.split('/')[1];
    return !this.hideHeaderRoutes.includes(currentRoute);
  }
}
