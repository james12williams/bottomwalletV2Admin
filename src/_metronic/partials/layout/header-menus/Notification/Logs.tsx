
import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
  defaultAlerts,
  defaultLogs,
  KTIcon,
  toAbsoluteUrl,
  useIllustrationsPath,
} from '../../../../helpers'
import {LogLoader} from "../../../../../partials/loaders";
import {getItems} from "../../../../../layouts/core/QueryResponseProvider.tsx";
import {useUserView} from "../../../../../app/modules/user-profile/UserViewProvider.tsx";

let tempList:any[] = [];

const Logs: FC = () => {
  const {currentUserId} = useUserView();
  const [list, setList] = useState([] as any[]);
  const [data, setData] = useState({}) as any;
  const [isLoading, setLoader] = useState(false);

  const loadData = () =>{
    setLoader(true);
    getItems('activity-log'+(currentUserId?'/'+currentUserId:'')).then((resp:any)=>{
      if (data && resp.data.length>0){
        resp.data.forEach((item:any)=>{
          tempList.push(item);
        });
        setList(tempList);
      }
      setData(resp);
      setLoader(false);
    }, (resp:any)=>{
      setLoader(false);
    })
  }

  useEffect(()=>{
    loadData();
  }, []);

  return <>
    <div className='tab-pane fade' id='kt_topbar_notifications_3' role='tabpanel'>
      <div className='scroll-y mh-325px my-5 px-8'>
        {list.length>0 && list.map((log:any, index:any) => (
            <div key={`log${index}`} className='d-flex flex-stack py-4'>
              <div className='d-flex align-items-center me-2'>
                <span className={clsx('w-70px badge', `badge-light-${log.status}`, 'me-4')}>
                  {log.statusCode} {log.status_txt}
                </span>

                <a href='#' className='text-gray-800 text-hover-primary fw-bold'>
                  {log.request_method} {log.request_uri}
                </a>

                <span className='badge badge-light fs-8'>{log.request_time}</span>
              </div>
            </div>
        ))}
        {!isLoading && list.length< 1 ?<div className="text-center">
          <div className="pt-10 pb-10">
            <i className="ki-duotone ki-information-2 fs-4x opacity-50">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
            </i>
          </div>
          <div className="pb-15 fw-bold">
            <h3 className="text-gray-600 fs-5 mb-2">No data available</h3>
          </div>
        </div>:''}
        { isLoading ? <LogLoader count={6}/>: ''}
      </div>
      {(data && data.next_page_url) &&  <div className='py-3 text-center border-top'>
        <Link to='/apps/account/logs' className='btn btn-color-gray-600 btn-active-color-primary'>
          View All <KTIcon iconName='arrow-right' className='fs-5'/>
        </Link>
      </div>}
    </div>
  </>
}

export {Logs}
