import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { ToastContainerComponent } from './shared/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `<router-outlet /><app-toast-container />`,
})
export class App implements OnInit {
  constructor(private auth: AuthService, private cart: CartService) {}

  ngOnInit() {
    this.auth.loadProfile().subscribe(() => {
      if (this.auth.isLoggedIn()) this.cart.load().subscribe();
    });
  }
}
