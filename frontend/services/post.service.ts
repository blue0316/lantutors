import fetch from 'isomorphic-unfetch';
import { RequestTicket } from './request.service';

/**
 * Simple Post request handler (General).
 *
 * @see RequestTicket
 * @param  {} url url string of backend resource /api/retrievenotifications
 * @param  {} body body of post request (new Students, new Tutors)
 * @return {null} handles frontend rerouting once fulfilled without explicit return
 */
export function postRequest({
  url,
  body,
}: {
  url: string;
  body: object;
}) {
  const request = RequestTicket({
    method: 'post',
    url,
    body,
  });
  return fetch(request);
}
