export default async (method, path, body) => {
  const token = localStorage.getItem('token');
  const authHeader = token ? `Bearer ${token}` : '';
  const url = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

  const res = await fetch(`${url}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};
