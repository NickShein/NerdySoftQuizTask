import { Injectable } from '@angular/core';
import { TriviaQuestion } from '../interfaces/triviaquestion';

@Injectable({
  providedIn: 'root',
})
export class GeneratingQuizzService {
  constructor() {}
  private groupByCategory(questions: TriviaQuestion[]): Record<string, TriviaQuestion[]> {
    return questions.reduce((acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    }, {} as Record<string, TriviaQuestion[]>);
  }

  // Метод для отримання масиву масивів запитань, відсортованих за кількістю елементів у кожній категорії
  getSortedCategorizedQuestions(questions: TriviaQuestion[]): TriviaQuestion[][] {
    const categorized = this.groupByCategory(questions);

    // Перетворюємо об'єкт категорій в масив пар [категорія, запитання]
    const categorizedArray = Object.entries(categorized);

    // Сортуємо масив за кількістю запитань у кожній категорії
    categorizedArray.sort((a, b) => b[1].length - a[1].length);

    // Перевіряємо, чи більше 10 категорій
    if (categorizedArray.length > 10) {
      // Розділяємо на перші 10 категорій та залишкові
      const topCategories = categorizedArray.slice(0, 9);
      const mixedCategory = categorizedArray.slice(9).flatMap(entry => entry[1]);

      // Додаємо категорію "Mixed" до 10-го масиву
      topCategories.push(['Mixed', mixedCategory]);

      // Перетворюємо масив пар назад в масив масивів
      return topCategories.map(entry => entry[1]);
    }

    // Якщо категорій 10 або менше, просто повертаємо результат
    return categorizedArray.map(entry => entry[1]);
  }
}
