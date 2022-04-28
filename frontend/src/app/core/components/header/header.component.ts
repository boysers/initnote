import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataSharingService } from '../../services/dataSharing.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn!: boolean

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value
    })
  }

  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem('token') ? true : false
  }

  onAddNewNote(): void {
    this.router.navigateByUrl('/notes/create')
  }

  onDisconnect(): void {
    localStorage.removeItem('token')
    this.dataSharingService.isUserLoggedIn.next(false)
  }
}
