import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../core/guards/auth.guard'
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    data: { isNotRequiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
    data: { isNotRequiresLogin: true },
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
