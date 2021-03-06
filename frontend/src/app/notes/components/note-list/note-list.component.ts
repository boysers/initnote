import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Note } from 'src/app/core/models/note.model'
import { NotesService } from 'src/app/core/services/notes.service'

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notes$!: Observable<Note[]>

  constructor(private notesService: NotesService, private route: Router) {}

  ngOnInit(): void {
    this.notes$ = this.notesService.getAllNotes()
  }

  onCreateNote(): void {
    this.route.navigateByUrl('/notes/create')
  }
}
