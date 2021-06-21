import React from 'react';
import Link from 'next/link';

import { User, Students, Student } from '../interfaces';

type Props = {
  student: Student['email'] | string;
};

const ListItem = ({ student }: Props) => {
  const username = student.split('@')[0].toString();
  return (
    <Link
      // href="/students/[username]"
      // as={`/students/${student.split('@')[0].toString()}`}
      href={`/students/${encodeURIComponent(username)}`}
    >
      <a>{student}</a>
    </Link>
  );
};

export default ListItem;
