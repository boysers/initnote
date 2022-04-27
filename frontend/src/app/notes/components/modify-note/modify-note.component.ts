import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Note } from 'src/app/core/models/note.model'
import { NotesService } from 'src/app/core/services/notes.service'

@Component({
  selector: 'app-modify-note',
  templateUrl: './modify-note.component.html',
  styleUrls: ['./modify-note.component.scss']
})
export class ModifyNoteComponent implements OnInit {
  note$!: Observable<Note>

  title!: string
  comment!: string
  image!: File
  isPrivate!: string
  noteId!: string
  isDeleteImage!: boolean

  constructor(
    private notesServices: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['id']

    this.note$ = this.notesServices.getNoteById(this.noteId)

    this.isDeleteImage = false
  }

  onFileChange(event: any) {
    this.image = event.target.files[0]
  }

  onDeleteImage(): void {
    this.notesServices.deleteImage(this.noteId).subscribe()
  }

  onSubmitModifyForm(form: NgForm): void {
    const { title, comment, isPrivate } = form.value as {
      title: string
      comment: string
      isPrivate: string
    }

    if (this.isDeleteImage) this.onDeleteImage()

    const noteObject = {
      title,
      comment,
      isPrivate: isPrivate == 'true' ? true : false
    }

    const formData = new FormData()
    this.image ? formData.append('image', this.image) : undefined

    if (this.image)
      this.notesServices.modifyImage(this.noteId, formData).subscribe()

    this.notesServices
      .modifyNote(this.noteId, noteObject)
      .pipe(tap(() => this.router.navigateByUrl(`/notes/${this.noteId}`)))
      .subscribe()
  }
}
