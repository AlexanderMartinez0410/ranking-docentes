import { Injectable } from '@nestjs/common';

@Injectable()
export class GetHelloUseCase {
  execute(): string {
    return 'Hola Mundo desde API';
  }
}
