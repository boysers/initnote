import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isNotRequiresLogin = next.data['isNotRequiresLogin'] || false

    if (isNotRequiresLogin) {
      if (this.auth.isLoggedIn()) {
        this.router.navigateByUrl('/notes')
        return false
      } else {
        return true
      }
    } else {
      if (this.auth.isLoggedIn()) {
        return true
      } else {
        this.router.navigateByUrl('/auth/login')
        return false
      }
    }
  }
}
