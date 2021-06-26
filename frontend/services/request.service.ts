/**
 * Functions that pre-packages HTTP requests for a fetcher/handler.
 *
 * Requests are sorted per method for requests like signupRequest and loginRequest to send to the backend efficiently.
 *
 * @see signinRequest
 * @see putRequest
 * @see getRequest
 */

/**
 * Api backend base URL.
 */

const API = 'https://fsdisraelias.df.r.appspot.com';

export const RequestTicket = ({
  method,
  url,
  body,
}: {
  method: string;
  url: string;
  body?: object;
}) => {
  if (method === 'post') {
    return new Request(`${API}/${url}`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    });
  }

  if (method === 'put') {
    return new Request(`${API}/${url}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  if (method === 'delete') {
    return new Request(`${API}/${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return new Request(`${API}/${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
