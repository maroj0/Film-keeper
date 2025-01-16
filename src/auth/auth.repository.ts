import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './db/auth.schema';
import { RegisterRequestDto } from './dto/register.dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data: RegisterRequestDto) {
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
