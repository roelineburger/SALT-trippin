const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080';

const get = async (path) => {
  const query = await fetch(`${baseUrl}${path}`);
  const json = await query.json();
  return json;
};

const post = async (path, body) => {
  const query = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await query.json();
  return json;
};

const del = async (path, body) => {
  const query = await fetch(`${baseUrl}${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await query.json();
  return json;
};

export {
  get,
  post,
  del,
};
