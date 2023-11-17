import initSdk from '@liquiditeam/sdk';
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

  const sdk = initSdk(body.access_token);

  const result = await sdk.api.transferNft({
    id: '1',
    address: '0x1234567...',
    amount: 1,
  });

  console.log(result);
};

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
