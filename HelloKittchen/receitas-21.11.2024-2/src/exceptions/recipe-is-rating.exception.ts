import { HttpException, HttpStatus } from '@nestjs/common';

export class RecipeIsRateException extends HttpException {
  constructor() {
    super('Rhe recipe has already been rated', HttpStatus.PRECONDITION_FAILED);
  }
}
