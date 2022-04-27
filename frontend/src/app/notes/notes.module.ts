import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NoteListComponent } from './components/note-list/note-list.component'
import { NoteComponent } from './components/note/note.component'
import { SingleNoteComponent } from './components/single-note/single-note.component'
import { NewNoteComponent } from './components/new-note/new-note.component'
import { NotesRoutingModule } from './notes-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyNoteComponent } from './components/modify-note/modify-note.component'

@NgModule({
  declarations: [
    NoteListComponent,
    NoteComponent,
    SingleNoteComponent,
    NewNoteComponent,
    ModifyNoteComponent
  ],
  imports: [CommonModule, NotesRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [
    NoteListComponent,
    NoteComponent,
    SingleNoteComponent,
    NewNoteComponent
  ]
})
export class NotesModule {}
