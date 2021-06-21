import * as React from 'react';
import ListItem from './ListItem';
import { User, Student } from '../interfaces';

type Props = {
  students: {
    id: Student['id'];
    studentName: Student['username'];
    username?: string;
  }[];
};

const List = ({ students }: Props) => (
  <ul>
    {students.map((student) => (
      <li key={`${student.id}-${student.studentName}`}>
        <ListItem
          student={student.studentName || student.toString()}
        />
      </li>
    ))}
  </ul>
);

export default List;
