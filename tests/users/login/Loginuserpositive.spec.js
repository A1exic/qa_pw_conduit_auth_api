import { test } from '../../_fixtures/fixtures';

test('Successful login for registered user', async ({
  newUserData,
  usersApi,
}) => {
  const registerResponse = await usersApi.registerNewUser(newUserData);

  await usersApi.assertSuccessResponseCode(registerResponse);

  const response = await usersApi.loginUser({
    email: newUserData.email,
    password: newUserData.password,
  });

  await usersApi.assertSuccessResponseCode(response);
  await usersApi.assertEmailHasCorrectValue(response, newUserData.email);
  await usersApi.assertUsernameHasCorrectValue(response, newUserData.username);
  await usersApi.assertResponseBodyContainsToken(response);
});
