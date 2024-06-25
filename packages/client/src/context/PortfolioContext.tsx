import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useAxios } from "../hooks/useAxios";

interface DataContextType {
  data: any;
  loading: boolean;
  error: Error | unknown;
}

export const PortfolioContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<DataProviderProps> = ({
  children,
}) => {
  const { api } = useAxios();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.portfolio.portfolioControllerGet();
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};
