import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { NotesService } from 'src/app/core/services/notes.service'

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {
  title!: string
  comment!: string
  image!: File
  isPrivate!: string

  constructor(private notesService: NotesService, private router: Router) {}

  onFileChange(event: any) {
    this.image = event.target.files[0]
  }

  onSubmitForm(form: NgForm): void {
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
