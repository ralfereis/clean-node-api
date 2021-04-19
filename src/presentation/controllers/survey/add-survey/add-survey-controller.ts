import { badRequest } from '../../../helpers/http/http-helper';
import { IValidation } from '../../../protocols';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from './add-survey-controller-protocols';

export class AddSurveyController implements IController {
  constructor(private readonly validation: IValidation) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    return new Promise(resolve => resolve(null));
  }
}
