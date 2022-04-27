import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Note } from 'src/app/core/models/note.model'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() note!: Note
  urlApi = `${location.protocol}//${location.hostname}:${location.port}/api`

  constructor(private router: Router) {}

  onViewNote(): void {
    this.router.navigateByUrl(`notes/${this.note.id}`)
  }
}
