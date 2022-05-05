import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Note } from 'src/app/core/models/note.model'
import { NotesService } from 'src/app/core/services/notes.service'

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  note$!: Observable<Note>
  urlApi = `${location.protocol}//${location.hostname}:${location.port}/api`
  noteId = this.route.snapshot.params['id']

  constructor(
    private notesServices: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const noteId = this.route.snapshot.params['id']
    this.note$ = this.notesServices.getNoteById(noteId)
  }

  isLoged(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  onDelete(): void {
    if (confirm('Voulez-vous supprimer la note ?')) {
      this.notesServices
        .deleteNote(this.noteId)
        .pipe(tap(() => this.router.navigateByUrl('/notes')))
        .subscribe()
    }
  }

  onContinueModify() {
    this.router.navigateByUrl(`/notes/modify/${this.noteId}`)
  }
}
