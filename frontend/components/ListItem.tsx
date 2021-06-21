import React from 'react';
import Link from 'next/link';

import { User, Students, Student } from '../interfaces';

type Props = {
  student: Student['username'];
};

const ListItem = ({ student }: Props) => (
  <Link href="/students/[username]" as={`/students/${student}`}>
    <a>{student}</a>
  </Link>
);

export default ListItem;
