import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'
import { DataSharingService } from 'src/app/core/services/dataSharing.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  errorHttp!: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.errorHttp.subscribe((value) => {
      this.errorHttp = value
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onLogin(): void {
    this.auth
      .login(this.loginForm.value)
      .pipe(
        tap(() => this.dataSharingService.isUserLoggedIn.next(true)),
        tap(() => this.router.navigateByUrl('/notes'))
      )
      .subscribe()
  }
}
