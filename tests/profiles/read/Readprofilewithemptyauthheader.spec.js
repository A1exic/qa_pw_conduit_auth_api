import { test } from '../../_fixtures/fixtures';

test('Read profile of existing user with empty auth header', async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfileWithToken(
    registeredUser.username,
    '',
  );

  await profilesApi.assertUnauthorizedResponseCode(response);
});
