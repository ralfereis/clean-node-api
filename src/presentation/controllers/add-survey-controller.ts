import { badRequest, noContent, serverError } from '@/presentation/helpers';
import {
  IController,
  IValidation,
  HttpResponse,
} from '@/presentation/protocols';
import { IAddSurvey } from '@/domain/usecases';

export class AddSurveyController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey,
  ) {}
  async handle(request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { question, answers } = request;
      await this.addSurvey.add({
        question,
        answers,
        date: new Date(),
      });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace AddSurveyController {
  type Answer = {
    image?: string;
    answer: string;
  };
  export type Request = {
    question: string;
    answers: Answer[];
  };
}
