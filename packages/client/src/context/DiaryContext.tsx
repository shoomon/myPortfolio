import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAxios } from "../hooks/useAxios";
import { DiaryDto } from "../__generated__/Api";

interface DataContextType {
  data: DiaryDto[];
  loading: boolean;
  error: Error | unknown;
  hasNextPage: boolean;
  fetchMore: () => void;
}

export const DiaryContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

export const DiaryProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { api } = useAxios();
  const [data, setData] = useState<DiaryDto[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | unknown>(null);
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(
    async (page: number, prevData: any = null) => {
      setLoading(true);

      try {
        const response = await api.diaries.diariesControllerGet({
          page,
          size: 5,
        });
        const newData: DiaryDto[] = response.data.data;

        setData((prevData: any) => {
          if (prevData) {
            const mergedData = [...prevData, ...newData];

            return mergedData.reduce((acc, cur) => {
              const x = acc.find((item: any) => item.id === cur.id);
              if (!x) acc.push(cur);
              return acc;
            }, []);
          }

          return newData;
        });

        setHasNextPage(response.data.pageInfo.hasNextPage);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  const fetchMore = () => {
    if (hasNextPage && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData(page, data);
  }, [page, fetchData]);

  return (
    <DiaryContext.Provider
      value={{ data, loading, error, hasNextPage, fetchMore }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
