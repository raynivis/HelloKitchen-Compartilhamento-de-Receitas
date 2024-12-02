import { HttpException, HttpStatus } from '@nestjs/common';

export class RecipeIsPublishedException extends HttpException {
  constructor() {
    super(
      'The recipe has already been published',
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
