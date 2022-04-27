import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../core/guards/auth.guard'
import { ModifyNoteComponent } from './components/modify-note/modify-note.component'
import { NewNoteComponent } from './components/new-note/new-note.component'
import { NoteListComponent } from './components/note-list/note-list.component'
import { SingleNoteComponent } from './components/single-note/single-note.component'

const routes: Routes = [
  { path: 'create', component: NewNoteComponent, canActivate: [AuthGuard] },
  {
    path: 'modify/:id',
    component: ModifyNoteComponent,
    canActivate: [AuthGuard]
  },
  { path: ':id', component: SingleNoteComponent },
  { path: '', component: NoteListComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class NotesRoutingModule {}
