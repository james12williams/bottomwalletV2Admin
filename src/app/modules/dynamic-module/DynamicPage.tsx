import {Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import React, {useEffect, useState} from "react";
import {DynamicCreate} from "./dynamic-list/DynamicCreate";
import {DynamicList} from './dynamic-list/DynamicList'
import {ErrorsPage} from "../errors/ErrorsPage";
import {useParams} from "react-router";
import {routerReplace} from "./dynamic-list/core/QueryResponseProvider";
import {DynamicEdit} from "./dynamic-list/DynamicEdit";
import {DynamicConfigure} from "./dynamic-list/DynamicConfigure";
import {DynamicView} from "./dynamic-list/DynamicView";
import {DynamicReorder} from "./dynamic-list/DynamicReorder";

type Props = {
  path: string,
  base?: string,
  baseTitle?: string,
  entityNamePlural: string,
  entityName: string,
  queryName: string,
  usersBreadcrumbs?: any,
};

const DynamicPage = ({path, base, baseTitle, entityName, entityNamePlural, queryName, usersBreadcrumbs}:Props) => {
  const params= useParams();
  const [baseUrl, setBaseUrl] = useState(base);
  useEffect(()=>{
    setBaseUrl(routerReplace(base, params))
  }, [base, params]);
  path = routerReplace(path, params);

  const dynamicBreadcrumbs: Array<PageLink> = [
    {
      title: baseTitle?baseTitle: entityName+' Management',
      path: baseUrl?baseUrl:'/apps/'+path,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ];
  const dynamicOtherBreadcrumbs: Array<PageLink> = [
    {
      title: entityName+' Management',
      path: '/apps/'+path,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ];

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/'
          element={
            <>
              <PageTitle breadcrumbs={dynamicBreadcrumbs}>{'List ' + entityNamePlural}</PageTitle>
              <DynamicList apiPath={path} queryName={queryName} />
            </>
          }
        />
        <Route path='create'
               element={
                 <>
                   <PageTitle breadcrumbs={dynamicOtherBreadcrumbs}>{'Create '+entityName}</PageTitle>
                   <DynamicCreate apiPath={path} queryName={queryName+'_create'} />
                 </>
               }
        />
        <Route path=':uid/edit'
               element={
                 <>
                   <PageTitle breadcrumbs={dynamicOtherBreadcrumbs}>{'Edit '+entityName}</PageTitle>
                   <DynamicEdit apiPath={path+'/:uid'} queryName={queryName+'_edit'} />
                 </>
               }
        />
        <Route path=':uid/configure'
               element={
                 <>
                   <PageTitle breadcrumbs={dynamicOtherBreadcrumbs}>{'Configure '+entityName}</PageTitle>
                   <DynamicConfigure apiPath={path+'/:uid'} queryName={queryName+'_configure'} />
                 </>
               }
        />
        <Route path='reorder'
               element={
                 <>
                   <PageTitle breadcrumbs={dynamicOtherBreadcrumbs}>{'Reorder '+entityName}</PageTitle>
                   <DynamicReorder apiPath={path+'/reorder'} queryName={queryName+'_reorder'} />
                 </>
               }
        />
        <Route path=':uid'
               element={
                 <>
                   <PageTitle breadcrumbs={dynamicOtherBreadcrumbs}>{'View '+entityName}</PageTitle>
                   <DynamicView apiPath={path+'/:uid'} queryName={queryName+'_view'} />
                 </>
               }
        />
        <Route path='*' element={<ErrorsPage showFooter={false} showLogo={false} />} />
      </Route>
    </Routes>
  )
};

export default DynamicPage
