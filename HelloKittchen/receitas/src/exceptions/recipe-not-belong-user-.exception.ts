import { HttpException, HttpStatus } from '@nestjs/common';

export class RecipeNotBelongUserException extends HttpException {
  constructor() {
    super(
      'The recipe does not belong to the current user',
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
