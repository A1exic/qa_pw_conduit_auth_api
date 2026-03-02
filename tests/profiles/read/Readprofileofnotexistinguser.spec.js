import { test } from '../../_fixtures/fixtures';

test('Read profile of not existing user', async ({ profilesApi }) => {
  const response = await profilesApi.getProfile('nonexistent_user_xyz_123');

  await profilesApi.assertNotFoundResponseCode(response);
});
