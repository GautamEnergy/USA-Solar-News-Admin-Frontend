// MyContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const Context = createContext();

export const ContextAPI = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    DataHandler();
  }, []);

  const DataHandler = async (Param) => {
    console.log('ok')
    if (!Param) {
      console.log('ok')
      try {
        let { data } = await axios.get('http://localhost:5000/admin/news?NoOfNews=10&Page=1');
        console.log(data.data)
        setData(data.data);
      } catch (err) {
        setData([]);
        toast({
          title: 'OOps !',
          description: "We have no data",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      }
    } else {
      setData(Param);
    }
  };

  return (
    <Context.Provider value={{ DataHandler, data }}>
      {children}
    </Context.Provider>
  );
};
