import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_MESSAGE } from '../../../src/constants/authErrorMessages';

test('Login with wrong formatted email', async ({ newUserData, usersApi }) => {
  const response = await usersApi.loginUser({
    email: 'not-a-valid-email',
    password: newUserData.password,
  });

  await usersApi.assertUnprocessableEntityResponseCode(response);
  await usersApi.assertErrorMessageInResponseBody(
    response,
    INVALID_EMAIL_MESSAGE,
    'email',
  );
});
