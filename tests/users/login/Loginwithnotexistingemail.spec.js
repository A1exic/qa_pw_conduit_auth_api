import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login with not existing email', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser({
    email: newUserData.email,
    password: newUserData.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    'email or password',
  );
});
