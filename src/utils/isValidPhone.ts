import fetch from 'node-fetch';

export const isValidPhone = async (phone: string) => {
  let response;
  const body = {
    number: phone,
    'user-id': 'NachoAJ',
    'api-key': 'wvlBTjvKXkbClcCjgtOy5aopX6GIiyE7gD72moOoyDCeCaGE',
  };

  await fetch('https://neutrinoapi.net/phone-validate', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(async res => {
    response = await res.json();
  });
  if (response) {
      console.log(response)
    return response.valid;
  }
  return false;
};
