import React from 'react';
import Link from 'next/link';

import { Avatar, Box, Card, Button, Fab } from '@material-ui/core';
import { getStudent } from '../services/get.service';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowId,
  GridCellParams,
  GridComparatorFn,
  GridCellValue,
  GridSortCellParams,
  GridApi,
} from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

import clsx from 'clsx';

import { randomColor } from '../utils/initialize';
import { useStudents } from '../context/students.context';
import { useSelected } from '../context/selected.context';
import { initialize } from '../utils/initialize';

const StudentsTable = ({
  students,
  tutors,
}: {
  students: Student[];
  tutors?: Tutor[];
}) => {
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

  const getStudentSuspendedStatus = async (
    params: GridValueGetterParams
  ) => {
    const email = params.getValue(params.id, 'email');
    const response = await getStudent(email);
    if (response && response.data) {
      return response.data.suspended;
    }
  };

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
            rows={data.map((data) => ({
              id: data.id,
              username: initialize(data.email),
              email: data.email,
              suspended: data.suspended,
              updatedAt: dayjs(data.updatedAt).fromNow(),
              createdAt: dayjs(data.createdAt).fromNow(),
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
