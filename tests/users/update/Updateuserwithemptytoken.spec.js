import { test } from '../../_fixtures/fixtures';

test('Update user with empty auth token', async ({ newUserData, usersApi }) => {
  const response = await usersApi.updateUser({
    ...newUserData,
    token: '',
  });

  await usersApi.assertUnauthorizedResponseCode(response);
});
