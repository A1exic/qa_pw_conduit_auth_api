import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import {
  NOT_FOUND_CODE,
  UNAUTHORIZED_CODE,
} from '../../constants/responseCodes';

export class ProfilesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/profiles';
    this._headers = { 'content-type': 'application/json' };
  }

  async getProfile(username) {
    return await this.step(`Get profile for a user`, async () => {
      return await this.request.get(`${this._endpoint}/${username}`, {
        headers: this._headers,
      });
    });
  }

  async getProfileWithToken(username, token) {
    return await this.step(
      `Get profile for a user with auth token`,
      async () => {
        return await this.request.get(`${this._endpoint}/${username}`, {
          headers: {
            ...this._headers,
            authorization: `Token ${token}`,
          },
        });
      },
    );
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.profile.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(
      `Assert response body has correct image value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.profile.image).toBe(image);
      },
    );
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.profile.bio).toBe(bio);
    });
  }

  async assertFollowingHasValueFalse(response) {
    await this.step(
      `Assert response body has 'false' in 'following' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.profile.following).toBe(false);
      },
    );
  }

  async assertNotFoundResponseCode(response) {
    await this.step(
      `Assert the code ${NOT_FOUND_CODE} is returned`,
      async () => {
        expect(this.parseStatus(response)).toEqual(NOT_FOUND_CODE);
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
}
