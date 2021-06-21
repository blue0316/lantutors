import { Student } from '../interfaces';

type ListDetailProps = {
  student: Student;
};

const ListDetail = ({ student }: ListDetailProps) => (
  <div>
    {student.email && <h1>Detail for {student.email}</h1>}
    {student.id && <p>ID: {student.id}</p>}
    {student.username && <p>Username: {student.username}</p>}
    {typeof student.suspended === 'boolean' && (
      <p>Suspended: {student.suspended.toString()}</p>
    )}
  </div>
);

export default ListDetail;
