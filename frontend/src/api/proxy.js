export default async function handler(req, res) {
  const backendUrl = `${process.env.REACT_APP_API}${req.url}`;

  const response = await fetch(backendUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      host: "207.154.201.143",
    },
    body: req.method !== 'GET' ? req.body : undefined,
  });

  const data = await response.text();

  res.status(response.status).send(data);
}
