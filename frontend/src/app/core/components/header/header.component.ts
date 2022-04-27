import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAddNewNote(): void {
    this.router.navigateByUrl('/notes/create')
  }

  onDisconnect(): void {
    localStorage.removeItem('token')
    this.router.navigateByUrl('auth/login')
  }
}
