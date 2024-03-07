import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authServices = inject( AuthService );
  private router = inject( Router );

  finishedAuthCheck = computed<boolean>( () => {

    if ( this.authServices.authStatus() === AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  authStatusChangedEffect = effect( () => {

    switch( this.authServices.authStatus() ) {

      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
      return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
    }
  })

  title = 'authApp';

}
