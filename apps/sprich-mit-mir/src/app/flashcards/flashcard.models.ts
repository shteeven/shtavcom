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
}
