import { SurveyModel } from '@/domain/models';
import faker from 'faker';
import { IAddSurvey } from '@/domain/usecases';

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    answers: [
      {
        answer: faker.random.word(),
      },
      {
        answer: faker.random.word(),
        image: faker.image.imageUrl(),
      },
    ],
    date: faker.date.recent(),
  };
};

export const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
];

export const mockAddSurveyParams = (): IAddSurvey.Params => ({
  question: faker.random.words(),
  answers: [
    {
      image: faker.image.imageUrl(),
      answer: faker.random.word(),
    },
    {
      answer: faker.random.word(),
    },
  ],
  date: faker.date.recent(),
});
