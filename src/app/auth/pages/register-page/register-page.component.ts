import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private authService = inject( AuthService );
  private router      = inject( Router );
  private fb          = inject( FormBuilder );

  myForm: FormGroup = this.fb.group({
    email:           ['', [ Validators.required, Validators.email ] ],
    name:            ['', [ Validators.required ] ],
    password:        ['', [ Validators.required, Validators.minLength(6) ] ],
    confirmPassword: ['', [ Validators.required, Validators.minLength(6) ] ],
  })


  register() {
    const user = this.myForm.value;
    this.authService.register( user )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire( 'Error', message, 'error' )
        }
      })
  }

}
