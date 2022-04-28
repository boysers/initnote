import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs'

const { protocol, hostname, port } = location

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private token!: string

  url = `${protocol}//${hostname}:${port}/api`

  constructor(private http: HttpClient) {}

  login(formValue: { email: string; password: string }) {
    return this.http
      .post<{ userId: string; token: string }>(
        `${this.url}/v1/auth/login`,
        formValue
      )
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token)
        })
      )
  }

  signup(formValue: { email: string; password: string }) {
    return this.http.post(`${this.url}/v1/auth/signup`, formValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false
  }
}
