import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login with wrong password', async ({ newUserData, usersApi }) => {
  const registerResponse = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(registerResponse);

  const response = await usersApi.loginUser({
    email: newUserData.email,
    password: 'wrong_password_123',
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
