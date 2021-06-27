import React from 'react';
import Link from 'next/link';

import { Avatar, Box, Card } from '@material-ui/core';
import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import { initialize } from '../utils/initialize';
import { useStudents } from '../context/students.context';

dayjs.extend(relativeTime);

const StudentsTable = ({ students }: { students: Student[] }) => {
  const {
    handleSuspend,
    suspendedStudent,
    setSuspendedStudent,
    studentsData,
    loadStudents,
    loading,
    suspending,
  } = useStudents();

  const [data, setData] = React.useState<Student[]>(students);

  React.useEffect(() => {
    if (studentsData) {
      setData(studentsData);
    }
  }, [studentsData]);

  return (
    <Card>
      <>
        <Box sx={{ height: 900, width: '100%' }}>
          <DataGrid
            rows={data.map((d) => ({
              id: d.id,
              username: initialize(d.email),
              email: d.email,
              suspended: d.suspended,
              updatedAt: dayjs(d.updatedAt).fromNow(),
              createdAt: dayjs(d.createdAt).fromNow(),
            }))}
            columns={[
              { field: 'id', headerName: 'ID', width: 70 },
              {
                field: 'username',
                headerName: 'Username',
                flex: 0.5,
              },
              {
                field: 'email',
                headerName: 'Email',
                flex: 0.5,
              },
              {
                field: 'suspended',
                headerName: 'Suspended',
                type: 'boolean',
                description:
                  "A student's suspended status. Click to toggle.",

                flex: 0.5,
                renderCell: (params: GridCellParams) => {
                  const onClick = () => {
                    const email = `${params.getValue(
                      params.id,
                      'email'
                    )}`;

                    return setSuspendedStudent(email);
                  };
                  return (
                    <>
                      <Avatar
                        onClick={onClick}
                        style={{
                          cursor: 'pointer',
                          backgroundColor:
                            params.value === true ? '#f98' : '#000',
                        }}
                      >
                        {params.value === true ? 1 : 0}
                      </Avatar>
                    </>
                  );
                },
              },
              {
                field: 'updatedAt',
                headerName: 'Last Activity',
                flex: 0.5,
              },
              {
                field: 'createdAt',
                headerName: 'Enrollment',
                flex: 0.5,
              },

              {
                field: 'userpage',
                headerName: 'Page',
                sortable: false,
                flex: 0.5,
                description: "Click to go to the student's page.",
                renderCell: (params) =>
                  loading ? (
                    <CircularProgress />
                  ) : (
                    <Link
                      href={`/students/${params.getValue(
                        params.id,
                        'email'
                      )}`}
                    >
                      <a>
                        @
                        {
                          // @ts-ignore
                          params
                            .getValue(params.id, 'email')
                            .toString()
                            .split('@')[0]
                        }
                      </a>
                    </Link>
                  ),
              },
            ]}
            pageSize={50}
            loading={loading}
          />
        </Box>
      </>
    </Card>
  );
};

export default StudentsTable;
