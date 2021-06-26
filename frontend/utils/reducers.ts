/* eslint-disable no-implicit-any */

type Props = {
  tutor: string;
  student: string;
};
export function reduceStudents(response: any) {
  const result = [
    ...response
      // @ts-ignore
      .reduce((r: any, { tutor, student }) => {
        r.has(tutor) ||
          r.set(tutor, {
            tutor,
            students: [],
          });

        r.get(tutor).students.push(student);

        return r;
      }, new Map())
      .values(),
  ];
  return result;
}

export function reduceNotifications(response: any) {
  const result = [
    ...response
      // @ts-ignore
      .reduce((r, { tutor, student, message, createdAt }) => {
        r.has(message) ||
          r.set(message, {
            tutor,
            message,
            createdAt,
            recipients: [],
          });

        r.get(message).recipients.push(student);

        return r;
      }, new Map())
      .values(),
  ];
  return result;
}
