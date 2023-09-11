import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useState, useMemo } from 'react';

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
    } catch (err) {
      setError(err);
    }
  }, []);

  const last = useMemo(() => {
    if (data && Array.isArray(data.events)) {
      return data.events[data.events.length - 1];
    }
    return null;
  }, [data]);

  useEffect(() => {
    if (data) {
      return;
    }
    getData();
  }, [data, getData]);

  const value = useMemo(() => ({ data, error, last }), [data, error, last]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
