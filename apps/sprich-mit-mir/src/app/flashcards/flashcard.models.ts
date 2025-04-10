export enum Mastery {
  NEW = 0,
  LEARNING = 1,
  MASTERED = 2,
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  lastReviewed?: Date;
  difficulty?: number;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  modifiedAt: Date;
  mastery: Mastery;
}
