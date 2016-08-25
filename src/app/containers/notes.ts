import { Component, OnDestroy } from '@angular/core';
import { NoteCard, NoteCreator } from '../ui';
import { NoteService } from '../services';
import { Store } from '../store';
import 'rxjs/Rx';

@Component({
  selector: 'notes-container',
  directives: [
    NoteCard,
    NoteCreator
  ],
  styles: [`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px;
    }
  `],
  template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        <note-creator (createNote)="onCreateNote($event)"></note-creator>
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
          <note-card
            class="col-xs-4"
            *ngFor="let note of notes; let i = index;"
            [note]="note"
            (checked)="onNoteChecked($event)"
          >
          </note-card>
        </div>
      </div>
    </div>
  `
})
export class Notes implements OnDestroy {
  notes = []

  constructor(private noteService: NoteService, private store: Store) {
    this.store.changes.pluck('notes')
      .subscribe((notes: any) => this.notes = notes);
    this.noteService.getNotes().subscribe();
  }

  onCreateNote(note) {
    this.noteService.createNote(note).subscribe();
  }

  onNoteChecked(note) {
    this.noteService.completeNote(note).subscribe();
  }

  ngOnDestroy() {
    console.log('destroyed');
  }
}
