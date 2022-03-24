export class CreateLocationDto {
  name: string;

  cords: {
    x: number;
    y: number;
  };

  sector: string;

  images?: number[];
}
