import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, switchMap } from 'rxjs'
import { Note } from '../models/note.model'

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url = `${location.protocol}//${location.hostname}:${location.port}/api`

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.url}/v1/notes`)
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(`${this.url}/v1/notes/${noteId}`)
  }

  addNote(formValue: any): Observable<Note> {
    return this.getAllNotes().pipe(
      switchMap(() => this.http.post<Note>(`${this.url}/v1/notes`, formValue))
    )
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(`${this.url}/v1/notes/${noteId}`)
  }

  modifyNote(noteId: any, formValue: any): Observable<any> {
    return this.http.put(`${this.url}/v1/notes/${noteId}`, formValue)
  }

  modifyImage(noteId: string, formImage: any): Observable<any> {
    return this.http.put(`${this.url}/v1/notes/${noteId}/image`, formImage)
  }

  deleteImage(noteId: string): Observable<any> {
    return this.http.delete(`${this.url}/v1/notes/${noteId}/image`)
  }
}
