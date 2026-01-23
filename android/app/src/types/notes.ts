export type NoteType = 'TEXT' | 'VOICE';

export type BaseNote = {
  id: string;
  title: string;
  date: string;
  createdAt: number;
  updatedAt: number;
  type: NoteType;
};

export type TextNote = BaseNote & {
    type: 'TEXT';
    description: string;
}

export type VoiceNote = BaseNote & {
    type: 'VOICE';
    audioUri: string;
    duration?: number;
}

export type Note = TextNote | VoiceNote;
