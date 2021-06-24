/**
 * Endpoint: `POST /api/account`
 * Class definition of `POST` instance to sign in/sign up as a tutor
 * @see api.controller.registerTutor
 * @see api.validator.registerTutor
 * @file defines RegisterTutor
 */

import * as db from '../models/index';

import { compareSync } from 'bcryptjs';

class RegisterTutor {
  constructor(validatedArgs) {
    this.email = validatedArgs.email;
    this.password = validatedArgs.password;
  }

  async call() {
    /**
     * Find a tutor record with marching email
     */
    const tutor = await db.Tutor.findOne({
      raw: true,
      where: { email: this.email },
    });

    /**
     * If a this tutor exists (is registered)...
     */
    if (tutor) {
      /**
       * Compare the incoming password with the tutor's password via bcrypt hash
       */
      const authorized = compareSync(this.password, tutor.password);
      /**
       * Return an error if the passwords dont match
       */
      if (!authorized) {
        return {
          message: `Invalid username or password`,
          code: 401,
        };
      }
      /**
       * Otherwise welcome back the existing tutor
       */
      return {
        tutor: authorized,
        message: `Welcome back ${this.email.split('@')[0]}`,
        code: 200,
      };
    }

    /**
     * Otherwise, register the new tutor.
     */
    await db.Tutor.create({
      email: this.email,
      password: this.password,
    });

    await db.Tutor.sync();

    return {
      tutor: this.email,
      message: 'Account Created',
      code: 200,
    };
  }
}

module.exports = RegisterTutor;
