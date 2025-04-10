import { Component } from '@angular/core';
import { Flashcard, Mastery } from './flashcard.models';
import { NgFor, NgIf } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  heroCheck, 
  heroAcademicCap,
  heroQuestionMarkCircle 
} from '@ng-icons/heroicons/outline';

const dummyCards: Flashcard[] = [
  {
    id: '1',
    front: 'Der Hund',
    back: 'The dog',
    category: 'Animals',
    difficulty: 1,
    createdBy: 'system',
    modifiedBy: 'system',
    createdAt: new Date('2025-04-10'),
    modifiedAt: new Date('2025-04-10'),
    mastery: Mastery.NEW,
  },
  {
    id: '2',
    front: 'Die Katze',
    back: 'The cat',
    category: 'Animals',
    difficulty: 1,
    createdBy: 'system',
    modifiedBy: 'system',
    createdAt: new Date('2025-04-10'),
    modifiedAt: new Date('2025-04-10'),
    mastery: Mastery.NEW,
  },
  {
    id: '3',
    front: 'Guten Morgen',
    back: 'Good morning',
    category: 'Greetings',
    difficulty: 1,
    createdBy: 'system',
    modifiedBy: 'system',
    createdAt: new Date('2025-04-10'),
    modifiedAt: new Date('2025-04-10'),
    mastery: Mastery.NEW,
  },
  {
    id: '4',
    front: 'Auf Wiedersehen',
    back: 'Goodbye',
    category: 'Greetings',
    difficulty: 2,
    createdBy: 'system',
    modifiedBy: 'system',
    createdAt: new Date('2025-04-10'),
    modifiedAt: new Date('2025-04-10'),
    mastery: Mastery.NEW,
  },
  {
    id: '5',
    front: 'Das Brot',
    back: 'The bread',
    category: 'Food',
    difficulty: 1,
    createdBy: 'system',
    modifiedBy: 'system',
    createdAt: new Date('2025-04-10'),
    modifiedAt: new Date('2025-04-10'),
    mastery: Mastery.NEW,
  },
];

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css'],
  imports: [NgFor, NgIf, NgIcon],
  providers: [provideIcons({ 
    heroCheck, 
    heroAcademicCap,
    heroQuestionMarkCircle 
  })],
})
export class FlashcardsComponent {
  flashcards: Flashcard[] = dummyCards;
  selectedCard = dummyCards[0];
  isFlipped = false;
  readonly Mastery = Mastery;

  getMasteryIcon(mastery: Mastery): string {
    switch (mastery) {
      case Mastery.MASTERED:
        return 'heroCheck';
      case Mastery.LEARNING:
        return 'heroAcademicCap';
      default:
        return 'heroQuestionMarkCircle';
    }
  }

  onCardClick(card: Flashcard): void {
    this.selectedCard = card;
    this.isFlipped = false;
  }

  updateMastery(mastery: Mastery): void {
    const index = this.flashcards.findIndex(
      (card) => card.id === this.selectedCard.id
    );
    if (index !== -1) {
      this.flashcards[index] = {
        ...this.flashcards[index],
        mastery,
        modifiedAt: new Date(),
        modifiedBy: 'user',
      };
      this.selectedCard = this.flashcards[index];
    }
  }
}
