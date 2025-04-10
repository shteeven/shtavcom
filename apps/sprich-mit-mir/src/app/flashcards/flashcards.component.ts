import { Component } from '@angular/core';
import { Flashcard } from './flashcard.models';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent {
  flashcards: Flashcard[] = [
    {
      id: '1',
      front: 'Der Hund',
      back: 'The dog',
      category: 'Animals',
      difficulty: 1,
      createdBy: 'system',
      modifiedBy: 'system',
      createdAt: new Date('2025-04-10'),
      modifiedAt: new Date('2025-04-10')
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
      modifiedAt: new Date('2025-04-10')
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
      modifiedAt: new Date('2025-04-10')
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
      modifiedAt: new Date('2025-04-10')
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
      modifiedAt: new Date('2025-04-10')
    }
  ];
}
