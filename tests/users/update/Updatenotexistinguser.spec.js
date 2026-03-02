import { test } from '../../_fixtures/fixtures';

test('Update not existing user', async ({ newUserData, usersApi }) => {
  const response = await usersApi.updateUser({
    ...newUserData,
    token: 'nonexistent.token.value',
  });

  await usersApi.assertUnauthorizedResponseCode(response);
});
