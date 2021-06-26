import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './request.service';

/**
 * Package managers for CRUD operations via HTTP requests.
 *
 * Auth: Sign in
 * General: Post
 *
 *
 * @requires isomorphic-unfetch
 * @see RequestTicket
 */

/**
 * Sign in request handler.
 *
 * @see RequestTicket
 * @param  {object} body body of sign up request (email and password)
 * @return {Promise} handles user's authentication passport once fulfilled
 */
export function signInRequest({
  body,
}: {
  body: {
    email: string;
    password: string;
  };
}) {
  const request = RequestTicket({
    method: 'post',
    url: 'api/account',
    body: {
      email: body.email,
      password: body.password,
    },
  });
  return fetch(request);
}
