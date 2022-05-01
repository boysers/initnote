import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { catchError, tap } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'
import { DataSharingService } from 'src/app/core/services/dataSharing.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  emailRegex!: RegExp
  errorHttp!: string

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.emailRegex =
      /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required]
    })
  }

  onSignup(): void {
    this.auth
      .signup(this.signupForm.value)
      .pipe(
        tap(() => this.router.navigateByUrl('/notes')),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            this.errorHttp = err.error.message
          }

          throw err
        })
      )
      .subscribe()
  }
}
