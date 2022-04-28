import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
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
  noteForm!: FormGroup

  image!: File
  noteId!: string
  imageUrl!: string | undefined

  constructor(
    private notesServices: NotesService,
    private router: Router,
    private route: ActivatedRoute,
    private formGroup: FormBuilder
  ) {}

  ngOnInit(): void {
    const urlApi = `${location.protocol}//${location.hostname}:${location.port}/api`

    this.noteId = this.route.snapshot.params['id']

    this.noteForm = this.formGroup.group({
      title: [null],
      comment: [null],
      isPrivate: [null],
      isDeleteImage: [null]
    })

    this.notesServices
      .getNoteById(this.noteId)
      .pipe(
        tap((note) => {
          this.noteForm.setValue({
            title: note.title,
            comment: note.comment,
            isPrivate: note.isPrivate,
            isDeleteImage: false
          })

          this.imageUrl = note.imageUrl ? urlApi + note.imageUrl : undefined
        })
      )
      .subscribe()
  }

  onFileChange(event: any) {
    this.image = event.target.files[0]
  }

  onDeleteImage(): void {
    this.notesServices.deleteImage(this.noteId).subscribe()
  }

  onSubmitModifyForm(): void {
    const { title, comment, isPrivate, isDeleteImage } = this.noteForm
      .value as {
      title: string
      comment: string
      isPrivate: boolean
      isDeleteImage: boolean
    }

    if (isDeleteImage) this.onDeleteImage()

    const noteObject = {
      title,
      comment,
      isPrivate
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
