import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  const url = 'http://localhost:3000/auth/signin';
  const payload = JSON.stringify({
    email: 'macarena7alejandra@gmail.com',
    password: '>MzG4sz7-Q^i!SK',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'token exists in response body': (r) => {
      const body = JSON.parse(r.body || '{}');
      return !!body.token && typeof body.token === 'string';
    },
  });

  sleep(1);
}
