import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import {
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED_CODE,
} from '../../constants/responseCodes';

export class UsersApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/users';
    this._headers = { 'content-type': 'application/json' };
  }

  async registerNewUser(userData) {
    return await this.step(`Register new user`, async () => {
      return await this.request.post(this._endpoint, {
        data: { user: userData },
        headers: this._headers,
      });
    });
  }

  async loginUser(credentials) {
    return await this.step(`Login user`, async () => {
      return await this.request.post(`${this._endpoint}/login`, {
        data: { user: credentials },
        headers: this._headers,
      });
    });
  }

  async updateUser(userData) {
    return await this.step(`Update existing user`, async () => {
      let headers = {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      };

      return await this.request.put('api/user', {
        data: { user: userData },
        headers,
      });
    });
  }

  async parseTokenFromBody(response) {
    const body = await this.parseBody(response);

    return body.user.token;
  }

  async assertResponseBodyContainsToken(response) {
    await this.step(`Assert response body contains token`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.token.length > 1).toBe(true);
    });
  }

  async assertEmailHasCorrectValue(response, email) {
    await this.step(`Assert response body has correct email`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.email).toBe(email);
    });
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(
      `Assert response body has correct image value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.user.image).toBe(image);
      },
    );
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.user.bio).toBe(bio);
    });
  }

  async assertUnprocessableEntityResponseCode(response) {
    await this.step(
      `Assert the code ${UNPROCESSABLE_ENTITY} is returned`,
      async () => {
        expect(this.parseStatus(response)).toEqual(UNPROCESSABLE_ENTITY);
      },
    );
  }

  async assertUnauthorizedResponseCode(response) {
    await this.step(
      `Assert the code ${UNAUTHORIZED_CODE} is returned`,
      async () => {
        expect(this.parseStatus(response)).toEqual(UNAUTHORIZED_CODE);
      },
    );
  }

  async assertErrorMessageInResponseBody(response, message, field) {
    await this.step(
      `Assert response body contains error message for '${field}'`,
      async () => {
        const body = await this.parseBody(response);
        const errors = body.errors;
        const fieldKey = field.includes(':') ? field.split(':')[0] : field;
        const expectedMessage = message.includes(':')
          ? message.split(':')[1]
          : message;

        expect(errors[fieldKey]).toContain(expectedMessage);
      },
    );
  }
}
