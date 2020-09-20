import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValidPhone } from 'src/utils/isValidPhone';
import { Contact, User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(name: string, lastName: string, phone: string) {
    const existingUser = await this.userModel.findOne({ phone }).exec();
    const validPhone = await isValidPhone(phone);
    if (!validPhone) {
      return { error: 'The phone is invalid.' };
    }
    if (existingUser) {
      return {
        error: `There is already an existing user with phone: ${phone}`,
      };
    }
    const newUser = new this.userModel({
      name,
      lastName,
      phone,
    });
    const insertedUser = await newUser.save();

    return { id: insertedUser._id };
  }

  async addContacts(userId: string, contacts: Contact[]) {
    try {
      const updatedResponse = await this.userModel.updateOne(
        { _id: userId },
        { $push: { contacts } },
      );
      if (updatedResponse.n === 0) {
        return { error: `Non existing user with id: ${userId}` };
      }
      return { ok: updatedResponse.ok, msg: 'Contacts added' };
    } catch (err) {
      return { error: 'There was an error please try again' };
    }
  }

  async getCommonContacts(userIdOne: string, userIdTwo: string) {
    const { contacts: userOneContacts } = await this.userModel
      .findById(userIdOne, {
        contacts: 1,
      })
      .exec();
    const { contacts: userTwoContacts } = await this.userModel
      .findById(userIdTwo, {
        contacts: 1,
      })
      .exec();

    const commonContacts = userOneContacts.filter(contact1 =>
      userTwoContacts.some(contact2 => contact1.phone === contact2.phone),
    );

    return commonContacts;
  }

  async getAllContacts(userId: string) {
    const { contacts } = await this.userModel.findById(userId, {
      contacts: 1,
    });

    return contacts;
  }
}
