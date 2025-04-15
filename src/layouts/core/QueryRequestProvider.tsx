import React, {FC, useState, createContext, useContext} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest, WithChildren,
} from '../../_metronic/helpers'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest);

const QueryRequestProvider: FC<WithChildren> = ({children}) => {
  const [state, setState] = useState<QueryState>(initialQueryRequest.state);
  const [isFirst, setIsFirst] = useState<boolean>(initialQueryRequest.isFirst);

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates} as QueryState;
    setState(updatedState)
  };

  return (
    <QueryRequestContext.Provider value={{state, updateState, isFirst}}>
      {children}
    </QueryRequestContext.Provider>
  )
};

const useQueryRequest = () => useContext(QueryRequestContext);
export {QueryRequestProvider, useQueryRequest}
