import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { tap } from 'rxjs'
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
  imageUrl!: string | ArrayBuffer | null
  isImageUrl!: boolean

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
      isPrivate: [null],
      title: [null],
      comment: [null],
      isDeleteImage: [false]
    })

    this.notesServices
      .getNoteById(this.noteId)
      .pipe(
        tap(({ title, comment, isPrivate, imageUrl }) => {
          this.noteForm.controls['title'].setValue(title)
          this.noteForm.controls['comment'].setValue(comment)
          this.noteForm.controls['isPrivate'].setValue(isPrivate)

          this.imageUrl = imageUrl ? urlApi + imageUrl : null

          this.isImageUrl = imageUrl ? true : false
        })
      )
      .subscribe()
  }

  onFileChange(event: any) {
    const imageInput = event.target.files[0]
    this.image = imageInput

    const reader = new FileReader()

    reader.onload = () => {
      this.imageUrl = reader.result
    }

    if (imageInput) {
      reader.readAsDataURL(imageInput)
    }
  }

  onDeleteImage(): void {
    if (confirm("Voulez-vous supprimer l'image ?")) {
      if (this.isImageUrl) {
        this.notesServices.deleteImage(this.noteId).subscribe(() => {
          this.imageUrl = null
          this.isImageUrl = false
        })
      } else {
        this.imageUrl = null
      }
    }
  }

  onSubmitModifyForm(): void {
    const { title, comment, isPrivate } = this.noteForm.value as {
      title: string
      comment: string
      isPrivate: boolean
    }

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
      .pipe(tap(() => this.router.navigateByUrl(`/notes`)))
      .subscribe()
  }
}
