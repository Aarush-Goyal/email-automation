import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SendGreetingMailDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 255)
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
}
