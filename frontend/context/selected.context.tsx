/* eslint-disable no-console */
import React from 'react';

import { getCommonStudentsBySearchParam } from '../services/get.service';

/**
 * Provider for sorting Common Tutors
 *
 */

type SelectedDataType = {
  commonData: string[];
  setCommonData: React.Dispatch<React.SetStateAction<string[]>>;
  selectedData: {};
  setSelectedData: React.Dispatch<React.SetStateAction<{}>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  params: never[];
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
  const [commonData, setCommonData] = React.useState<string[]>([]);

  const [selectedData, setSelectedData] = React.useState(new Map());

  const [params, setParams] = React.useState([]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // mutate the current Map
    selectedData.set(event.target.name, event.target.checked);
    setSelectedData(new Map(selectedData));

    // @ts-ignore
    const arr = [];
    selectedData.forEach((key, entry) =>
      arr.push({ tutor: key, entry })
    );
    // @ts-ignore
    setParams(arr);
  };

  const loadCommonStudents = async () => {
    setLoading(true);
    const response = await getCommonStudentsBySearchParam(
      // @ts-ignore
      params.map((data) => data.tutor !== false && data.entry)
    );

    if (response && response.data) {
      setLoading(false);

      setCommonData(response.data.students);
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
        params,
      }}
    >
      {children}
    </SelectedContext.Provider>
  );
}

export const useSelected = () => React.useContext(SelectedContext);
