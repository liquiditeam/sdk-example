import initSdk from '@liquiditeam/sdk';
import fetch from 'node-fetch';

const clientId = '';
const clientSecret = '';

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

  const sdk = initSdk(body.access_token);

  // trigger giveaway event for all users
  const result = await sdk.api.triggerGiveawayEvent({
    apiUuid: '00000000-...', // required
    userFilter: [{ id: { in: ['1', '2'] } }], // optional user filter
    // check the type definition for more filter options
  });

  console.log(result);
};

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
