import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, map, Observable, of, tap, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { DataSharingService } from '../services/dataSharing.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')

    if (token) {
      const headers = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.auth.getToken()}`
      )

      const modifyReq = req.clone({ headers })

      return next.handle(modifyReq).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) throw err

            this.dataSharingService.errorHttp.next(err.error.message)
            this.dataSharingService.isUserLoggedIn.next(false)
            localStorage.removeItem('token')
            this.router.navigateByUrl('/auth/login')
          }

          throw err
        })
      )
    } else {
      return next.handle(req)
    }
  }
}
