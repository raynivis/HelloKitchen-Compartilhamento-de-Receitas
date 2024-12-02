import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(Pagination, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(Pagination) },
          {
            properties: {
              meta: {
                type: 'object',
                properties: {
                  itemCount: {
                    type: 'number',
                  },
                  totalItems: {
                    type: 'number',
                  },
                  itemsPerPage: {
                    type: 'number',
                  },
                  totalPages: {
                    type: 'number',
                  },
                  currentPage: {
                    type: 'number',
                  },
                },
                required: [
                  'itemCount',
                  'totalItems',
                  'itemsPerPage',
                  'totalPages',
                  'currentPage',
                ],
              },
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
            required: ['items', 'meta'],
          },
        ],
      },
    }),
  );
};
