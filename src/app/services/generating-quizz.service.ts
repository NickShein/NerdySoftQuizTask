import { Injectable } from '@angular/core';
import { TriviaQuestion } from '../interfaces/triviaquestion';

@Injectable({
  providedIn: 'root',
})
export class GeneratingQuizzService {
  private groupByCategory(
    questions: TriviaQuestion[],
  ): Record<string, TriviaQuestion[]> {
    return questions.reduce(
      (acc, question) => {
        if (!acc[question.category]) {
          acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
      },
      {} as Record<string, TriviaQuestion[]>,
    );
  }

  // A method to retrieve an array of arrays of questions sorted by the number of items in each category
  getSortedCategorizedQuestions(
    questions: TriviaQuestion[],
  ): TriviaQuestion[][] {
    const categorized = this.groupByCategory(questions);

    // Convert the category object into an array of pairs [category, question]
    const categorizedArray = Object.entries(categorized);

    // Sort the array by the number of questions in each category
    categorizedArray.sort((a, b) => b[1].length - a[1].length);

    // Check if there are more than 10 categories
    if (categorizedArray.length > 10) {
      // Divide into the first 10 categories and the rest
      const topCategories = categorizedArray.slice(0, 9);
      const mixedCategory = categorizedArray
        .slice(9)
        .flatMap((entry) => entry[1]);

      // Add the "Mixed" category to the 10th array
      topCategories.push(['Mixed', mixedCategory]);

      // Convert the array of pairs back into an array of arrays
      return topCategories.map((entry) => entry[1]);
    }

    // If there are 10 categories or less, just return the result
    return categorizedArray.map((entry) => entry[1]);
  }
}
