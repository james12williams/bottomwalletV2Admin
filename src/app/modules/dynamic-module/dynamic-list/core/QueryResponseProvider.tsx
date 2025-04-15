/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {useQueryRequest} from './QueryRequestProvider'
import {SelectionHeader} from "../table/columns/SelectionHeader";
import {SelectionCell} from "../table/columns/SelectionCell";
import {CustomHeader} from "../table/columns/CustomHeader";
import {TableCell} from "../table/columns/TableCell";
import {UserInfoCell} from "../table/columns/UserInfoCell";
import {CountryInfoCell} from "../table/columns/CountryInfoCell";
import {ToggleCell} from "../table/columns/ToggleCell";
import {ActionsCell} from "../table/columns/ActionsCell";
import {AxiosService} from "../../../../servicies/axios-service";
import {LinkCell} from "../table/columns/LinkCell";
import {ResendMailCell} from "../table/columns/ResendMailCell";
import {useSearchParams} from "react-router-dom";
import {
  createResponseContext, ID,
  initialQueryResponse,
  initialQueryState,
  isNotEmpty,
  PaginationState,
  stringifyRequestQuery
} from "../../../../../_metronic/helpers";

const QueryResponseContext = createResponseContext(initialQueryResponse);

const getItems = (apiPath:string|undefined, query?: any) => {
  let url = apiPath;
  let queryParams = {};
  if (typeof query == 'string'){
    url += '?'+query;
  }else if(isNotEmpty(query)){
    queryParams = query;
  }
  return AxiosService.getRequest(`${url}`, queryParams)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const getItem = (apiPath:string, id: ID): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}/${id}`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const editItem = (apiPath:string): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}/edit`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const reorderItems = (apiPath:string): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const viewItem = (apiPath:string): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}/details`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const configureItem = (apiPath:string): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}/configure`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const createItem = (apiPath:string): Promise<any | undefined> => {
  return AxiosService.getRequest(`${apiPath}/create`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const storeItem = (apiPath:string, data: any): Promise<any | undefined> => {
  return AxiosService.postRequest(`${apiPath}`, data)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const updateItem = (apiPath:string, data: any): Promise<any | undefined> => {
  return AxiosService.postRequest(`${apiPath}`, data)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

const deleteItem = (apiPath:string, id: ID): Promise<any | undefined> => {
  return AxiosService.deleteRequest(`${apiPath}/${id}`)
      .then((d: any) => {return d.result;}, (d: any) => {return d})
};

type Props = {
  apiPath: string,
  queryName: string,
  children: React.ReactNode;
};
const QueryResponseProvider: FC<Props> = ({children, apiPath, queryName}) => {
  const {state} = useQueryRequest();
  const [params] = useSearchParams();
  const [oldQueryName, setOldQueryName] =  useState('');
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery]);

  const {isFetching, refetch, data: response} = useQuery(
    `${queryName}-${query}`,
    () => {
      let queryParams = {} as any;
      params.forEach((x:any, key:string)=>{
        queryParams[key] = x;
      });
      queryParams = AxiosService.removeEmptyValues(queryParams);
      return getItems(apiPath, queryParams);
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false},
  );

  useEffect(()=>{
    if (oldQueryName !== queryName){
      setOldQueryName(queryName);
      setQuery('');
    }
    refetch().then(r => {});
  }, [apiPath, queryName]);

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
  const {response} = useQueryResponse();
  if (!response) {
    return []
  }
  return response?.entries || []
};

const useQueryResponseColumn = (xPanel:any, queryName:any) => {
  let columnList: any[] = [];
  const isLoading = useQueryResponseLoading();
  if (!xPanel || !xPanel?.columns || isLoading) {
    return columnList
  }
  xPanel.columns = Object.keys(xPanel.columns).map((key:any)=>{
    let value = xPanel.columns[key];
    value.key =key;
    return value;
  });

  if (xPanel.columns){
    xPanel.columns.map((column: any, i:any) => {
      let item = null;
      if (columnList.findIndex(x=>x.id==column.name) < 0) {
        switch (column.type) {
          case 'checkbox':
            item = {
              Header: (props: any) => <SelectionHeader tableProps={props} column={column} key={column.name} xPanel={xPanel}/>,
              id: column.name,
              Cell: ({...props}) => <SelectionCell value={props.data[props.row.index].table[column.name].value} id={props.data[props.row.index].table[column.name].value} key={column.name}/>
            };
            break;
          case 'model_function':
            switch (column.format) {
              case 'user_info':
                item = {
                  Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} key={column.name}/>),
                  id: column.name,
                  Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index].table[column.name]} key={column.name}/>
                };
                break;
              case 'country_info':
                item = {
                  Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} key={column.name}/>),
                  id: column.name,
                  Cell: ({...props}) => <CountryInfoCell country={props.data[props.row.index].table[column.name]} key={column.name}/>
                };
                break;
              case 'toggle':
                item = {
                  Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} className={"text-center"} key={column.name}/>),
                  id: column.name,
                  Cell: ({...props}) => <ToggleCell value={props.data[props.row.index].table[column.name]} key={column.name}/>
                };
                break;
              case 'resend_mail':
                item = {
                  Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} key={column.name}/>),
                  id: column.name,
                  Cell: ({...props}) => <ResendMailCell value={props.data[props.row.index].table[column.name]} key={column.name}/>
                };
                break;
              case 'link':
              case 'html_link_text':
                item = {
                  Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} key={column.name}/>),
                  id: column.name,
                  Cell: ({...props}) => <LinkCell value={props.data[props.row.index].table[column.name]} key={(column.name + '_' + column.format)}/>
                };
                break;
              default:
                item = {
                  Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} key={column.name}/>),
                  id: column.name,
                  Cell: ({...props}) => <TableCell value={props.data[props.row.index]?.table[column.name]} key={column.name}/>
                };
                break;
            }
            break;
          case 'text':
          case 'html':
          case 'sn':
          case 'select_multiple':
          case 'datetime':
          default:
            item = {
              Header: (props: any) => (<CustomHeader tableProps={props} column={column} title={column.label} key={column.name}/>),
              id: column.name,
              Cell: ({...props}) => <TableCell value={props.data[props.row.index]?.table[column.name]?.value} key={column.name}/>
            };
            break;
        }
        if (item)
          columnList.push(item);
      }
      return item;
    })
  }
  if (xPanel.has_line_buttons){
    columnList.push({
      Header: (props:any) => (
          <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' noWhiteSpace={true} />
      ),
      id: 'actions',
      Cell: ({...props}) => <ActionsCell buttons={props.data[props.row.index].buttons} id={props.data[props.row.index].id} queryName={queryName} key={'actions'}/>,
    });
  }
  return columnList;
};


const useQueryResponsePagination = () => {
  const defaultPaginationState: {
    filter?: unknown;
    per_page: 10 | 15 | 30 | 50 | 100;
    search?: string;
    links: any[] | Array<{ label: string; active: boolean; url: string | null; page: number | null }>;
    page: number;
    sort?: string;
    order?: "asc" | "desc"
  } = {links: [], ...initialQueryState};

  const {response} = useQueryResponse();

  if (!response || !response.xPanel || !response.xPanel.meta) {
    return defaultPaginationState
  }
  return response.xPanel.meta
};

const useQueryResponseXPanel = () => {
  const defaultXPanelState: any = {
    access: [],
    ajaxTable: true,
    appRoute: null,
    autoFocusOnFirstField: true,
    buttons: [],
    can_create: true,
    columns:[],
    createFields:[],
    dbColumnTypes:[],
    default_page_length:false,
    details_row:true,
    disableSyncPivot:false,
    entityName:null,
    entityNamePlural:null,
    entry:null,
    entryId:null,
    exportButtons:false,
    filters:[],
    has_line_buttons:true,
    hideSearchBar:false,
    line_buttons:[],
    links:[],
    meta:[],
    model:[],
    parentEntity: false,
    parentEntityName: null,
    parentEntityNamePlural: null,
    parentId: null,
    parentKeyField: null,
    parentRoute: null,
    perPage: 15,
    query: [],
    reorder: false,
    reorderLabel: false,
    reorderMaxLevel: 3,
    request:[],
    route:null,
    single_title:null,
    sort:[],
    title:null,
    updateFields:[],
  };

  const {response} = useQueryResponse();

  if (!response || !response.xPanel) {
    return defaultXPanelState
  }

  if (response.xPanel.columns){
    response.xPanel.columns = Object.keys(response.xPanel.columns).map(key => (response.xPanel.columns[key]));
  }
  if (response.xPanel.createFields){
    response.xPanel.createFields = Object.keys(response.xPanel.createFields)
        .map((key) => {
          if (!response.xPanel.createFields[key].key)
            response.xPanel.createFields[key].key = key;
          return response.xPanel.createFields[key]
        }
    );
  }
  if (response.xPanel.buttons){
    response.xPanel.buttons = Object.keys(response.xPanel.buttons)
        .map((key) => {
          if (!response.xPanel.buttons[key].key)
            response.xPanel.buttons[key].key = key;
          return response.xPanel.buttons[key]
        }
    );
  }
  if (response.xPanel.line_buttons){
    response.xPanel.line_buttons = Object.keys(response.xPanel.line_buttons)
        .map((key) => {
          if (!response.xPanel.line_buttons[key].key)
            response.xPanel.line_buttons[key].key = key;
          return response.xPanel.line_buttons[key]
        }
    );
  }
  if (response.xPanel.updateFields){
    response.xPanel.updateFields = Object.keys(response.xPanel.updateFields)
        .map((key) => {
          if (!response.xPanel.updateFields[key].key)
            response.xPanel.updateFields[key].key = key;
          return response.xPanel.updateFields[key]
        }
    );
  }
  return response.xPanel
};

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse();
  return isLoading
};

const routerReplace = (base: any, params: any) => {
  if (base) {
    if (params["uid"]) {
      base = base.replace(':uid', params["uid"]);
    }
    if (params["catId"]) {
      base = base.replace(':catId', params["catId"]);
    }
    if (params["typeId"]) {
      base = base.replace(':typeId', params["typeId"]);
    }
    if (params["countryCode"]) {
      base = base.replace(':countryCode', params["countryCode"]);
    }
    if (params["stateCode"]) {
      base = base.replace(':stateCode', params["stateCode"]);
    }
    if (params["cityId"]) {
      base = base.replace(':cityId', params["cityId"]);
    }
    if (params["townCode"]) {
      base = base.replace(':townCode', params["townCode"]);
    }
    if (params["parentId"]) {
      base = base.replace(':parentId', params["parentId"]);
    }
    if (params["username"]) {
      base = base.replace(':username', params["username"]);
    }
    if (params["userId"]) {
      base = base.replace(':userId', params["userId"]);
    }
    if (params["pageId"]) {
      base = base.replace(':pageId', params["pageId"]);
    }
    if (params["slug"]) {
      base = base.replace(':slug', params["slug"]);
    }
    if (params["commentId"]) {
      base = base.replace(':commentId', params["commentId"]);
    }
    if (params["fieldsId"]) {
      base = base.replace(':fieldsId', params["fieldsId"]);
    }
    if (params["eventId"]) {
      base = base.replace(':eventId', params["eventId"]);
    }
    if (params["businessId"]) {
      base = base.replace(':businessId', params["businessId"]);
    }
    if (params["postId"]) {
      base = base.replace(':postId', params["postId"]);
    }
    if (params["eventId"]) {
      base = base.replace(':eventId', params["eventId"]);
    }
    if (params["campaignId"]) {
      base = base.replace(':campaignId', params["campaignId"]);
    }
    if (params["couponId"]) {
      base = base.replace(':couponId', params["couponId"]);
    }
    if (params["groupId"]) {
      base = base.replace(':groupId', params["groupId"]);
    }
    if (params["contactId"]) {
      base = base.replace(':contactId', params["contactId"]);
    }
  }
  return base;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
  useQueryResponseXPanel,
  useQueryResponseColumn,
  getItems,
  getItem,
  createItem,
  storeItem,
  updateItem,
  deleteItem,
  configureItem,
  editItem,
  reorderItems,
  viewItem,
  routerReplace,
}
