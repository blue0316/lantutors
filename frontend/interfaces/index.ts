// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface Student {
  id?: number;
  username?: string;
  email: string;
  suspended?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Students {
  students: Student['email'][];
}

export interface Tutor {
  id?: number;
  username?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommonStudent {
  tutor: string;
  name: string;
  students: Student['email'][];
}

export interface CommonStudents {
  tutorName: string;
  students: {
    id: Student['id'];
    studentName: Student['username'];
  }[];
}
export interface Notification {
  id: number;
  studentName: Student['username'];
  tutorName: Tutor['username'];
  title: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notifications {
  title: string;

  tutorName: Tutor['username'];

  message: string;
  recipients: [studentName: Student['username']];
}
