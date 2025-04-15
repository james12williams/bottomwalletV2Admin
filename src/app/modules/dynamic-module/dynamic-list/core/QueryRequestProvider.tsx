import React, {FC, useState, createContext, useContext, useEffect} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest, WithChildren,
} from '../../../../../_metronic/helpers'
import {useSearchParams} from "react-router-dom";
import {useLocation} from "react-router";

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest);

const QueryRequestProvider: FC<WithChildren> = ({children}) => {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState<QueryState>(initialQueryRequest.state);
  const [isFirst, setIsFirst] = useState(false);
  const location = useLocation();

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates} as QueryState;
    setState(updatedState)
  };

  useEffect(()=>{
    params.forEach((item:any, key:string)=>{
      if (!item || item=='null'){
        params.delete(key);
      }
    });

    if (state.search){
      params.set('search', state.search);
    }else if (isFirst){
      params.delete('search')
    }

    if (state.page>1){
      params.set('page', state.page.toString());
    }
    else if (isFirst){
      params.delete('page');
    }

    if ((state.per_page) != 15){
      params.set('per_page', state.per_page.toString());
    }else if (isFirst){
      params.delete('per_page');
    }

    if (state.sort){
      params.set('sort', state.sort);
    }else if (isFirst){
      params.delete('sort');
    }

    if (state.order){
      params.set('order', state.order);
    }else if (isFirst){
      params.delete('order');
    }

    setParams(params);
    setIsFirst(true);
  }, [state, isFirst]);

  useEffect(() => {
    setIsFirst(false);
    setState(initialQueryRequest.state);
  }, [location.pathname]);

  return (
    <QueryRequestContext.Provider value={{state, updateState, isFirst}}>
      {children}
    </QueryRequestContext.Provider>
  )
};

const useQueryRequest = () => useContext(QueryRequestContext);
export {QueryRequestProvider, useQueryRequest}
