import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiResponseProperty({
    type: String,
    example: 'El usuario no existe',
  })
  error_message?: string;

  @ApiResponseProperty({
    type: Number,
    example: 400,
  })
  statusCode: number;
}

export class SuccessResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  success: boolean;
}

class Meta {
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  itemCount: number;
  @ApiProperty()
  itemsPerPage: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  currentPage: number;
}
class Links {
  @ApiProperty()
  first: string;
  @ApiProperty()
  previous: string | null;
  @ApiProperty()
  next: string | null;
  @ApiProperty()
  last: string;
}
export class GetAllPaginated {
  @ApiProperty()
  items: any[];
  @ApiProperty()
  meta: Meta;
  @ApiProperty()
  links: Links;
}
