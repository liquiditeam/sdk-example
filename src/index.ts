import initSdk from '@liquiditeam/sdk';
import jwtDecode from 'jwt-decode';
import fetch from 'node-fetch';

const clientId = '...';
const clientSecret = '...';

const main = async () => {
  const response = await fetch('https://.../oauth/token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (!response.ok) throw await response.json();
  const body = await response.json();
  const decoded = jwtDecode<any>(body.access_token);
  const token = { jwt: body.access_token, decoded };

  const sdk = initSdk({ token });

  // trigger giveaway event for all users
  const result = await sdk.api.triggerGiveawayEvent({ apiUuid: '00000000-...' });

  console.log(result);
};

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
