import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { NotesService } from 'src/app/core/services/notes.service'

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  title!: string
  comment!: string
  image!: File | null
  isPrivate!: boolean
  imageUrl!: string | ArrayBuffer | null

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.isPrivate = true
  }

  onDeleteImage(): void {
    this.image = null
    this.imageUrl = null
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

  async onSubmitForm(form: NgForm): Promise<void> {
    const { title, comment, isPrivate } = form.value as {
      title: string
      comment: string
      isPrivate: string
    }

    const formData = new FormData()

    title ? formData.append('title', title) : null
    comment ? formData.append('comment', comment) : null
    isPrivate ? formData.append('isPrivate', isPrivate) : null
    this.image ? formData.append('image', this.image) : null

    this.notesService
      .addNote(formData)
      .pipe(tap(() => this.router.navigateByUrl('/notes')))
      .subscribe()
  }
}
