import React from 'react';
import { useRouter } from 'next/router';

import Toast from '../components/Toast';
import { useTutor } from './tutor.context';
import { reduceStudents } from '../utils/reducers';

import { postRequest } from '../services/post.service';

import {
  getRawCommonStudents,
  getCommonStudentsBySearchParam,
  getStudent,
  getStudents,
  getRawStudents,
} from '../services/get.service';

/**
 * Fourth-level Context provider for all CRUD operations.
 * Creating, Editing, Deleting user's own collections and snippets.
 *
 * @since 2021-04-08
 */

type SelectedDataType = {
  commonData: Student[] | undefined;
  setCommonData: React.Dispatch<
    React.SetStateAction<Student[] | undefined>
  >;
  selectedData: {};
  setSelectedData: React.Dispatch<React.SetStateAction<{}>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadCommonStudents: () => Promise<void>;
};

const SelectedContext = React.createContext<SelectedDataType>(
  undefined!
);

export function SelectedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commonData, setCommonData] = React.useState<
    Student[] | undefined
  >(undefined!);

  const [selectedData, setSelectedData] = React.useState(new Map());

  const [params, setParams] = React.useState([]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // mutate the current Map
    selectedData.set(
      event.target.name,
      event.target.checked.toString()
    );

    setSelectedData(new Map(selectedData));

    // @ts-ignore
    let arr = [];
    selectedData.forEach((key, entry) =>
      arr.push({ tutor: key, entry: entry })
    );
    // @ts-ignore
    setParams(arr);
  };

  const loadCommonStudents = async () => {
    setLoading(true);
    const response = await getCommonStudentsBySearchParam(
      params.map((data) => data.tutor !== 'false' && data.entry)
    );
    console.log(response.data);
    if (response && response.data) {
      setLoading(false);
      setCommonData(response.data);
    }
  };

  React.useEffect(() => {
    loadCommonStudents();
  }, [params]);

  return (
    <SelectedContext.Provider
      value={{
        commonData,
        setCommonData,
        selectedData,
        setSelectedData,
        loading,
        setLoading,
        loadCommonStudents,
        handleChange,
      }}
    >
      {children}
    </SelectedContext.Provider>
  );
}

export const useSelected = () => React.useContext(SelectedContext);
