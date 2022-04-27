import { Component, OnInit } from '@angular/core'
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

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes$ = this.notesService.getAllNotes()
  }
}
