import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, tap } from 'rxjs'
import { Note } from 'src/app/core/models/note.model'
import { NotesService } from 'src/app/core/services/notes.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note!: Note
  urlApi = `${location.protocol}//${location.hostname}:${location.port}/api`

  @ViewChild('noteCard') private noteCard!: ElementRef
  @ViewChild('messageCopy') private messageCopy!: ElementRef
  @ViewChild('checked') private checked!: ElementRef

  constructor(private router: Router, private notesService: NotesService) {}

  ngOnInit(): void {}

  onViewNote(): void {
    this.router.navigateByUrl(`notes/${this.note.id}`)
  }

  onDelete(id: string): void {
    if (confirm('Voulez-vous supprimer la note ?')) {
      this.notesService
        .deleteNote(id)
        .pipe(
          tap(() => this.noteCard.nativeElement.parentNode.remove()),
          catchError((err) => {
            throw err
          })
        )
        .subscribe()
    }
  }

  onModify(): void {
    this.router.navigateByUrl(`/notes/modify/${this.note.id}`)
  }

  onCopyClipboard(id: string): void {
    const { protocol, hostname, port } = location

    const urlNote = `${protocol}//${hostname}:${port}/notes/${id}`

    navigator.clipboard.writeText(urlNote)

    this.messageCopy.nativeElement.style.display = 'block'

    setTimeout(() => {
      this.messageCopy.nativeElement.style.display = 'none'
    }, 2000)
  }

  onChecked(event: any): void {
    const checkedTodo = event.path[1]

    if (event.target.checked) {
      checkedTodo.style.textDecoration = 'line-through'
      checkedTodo.style.color = '#a8a0ab'
    } else {
      checkedTodo.style.textDecoration = ''
      checkedTodo.style.color = ''
    }
  }
}
