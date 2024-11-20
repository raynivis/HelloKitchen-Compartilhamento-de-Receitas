import { HttpException, HttpStatus } from '@nestjs/common';

export class RecipeIsNotPublishedException extends HttpException {
  constructor() {
    super(
      'The recipe has not been published yet',
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
