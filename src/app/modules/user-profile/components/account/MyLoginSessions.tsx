/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ListLoading} from "../../../dynamic-module/dynamic-list/components/loading/ListLoading";
import {getItems} from "../../../../../layouts/core/QueryResponseProvider";
import {KTSVG} from "../../../../../_metronic/helpers";
import {useUserView} from "../../UserViewProvider";

type Props = {
  className?: string
}

const MyLoginSessions: React.FC<Props> = ({className='mb-lg-10'}) => {
    const {currentUserId} = useUserView();
    const [list, setList] = useState([]);
    const [data, setData] = useState({}) as any;
    const [isLoading, setLoader] = useState(false);
    let tempList = [] as any;

    useEffect(()=>{
        setLoader(true);
        getItems('login-session/'+currentUserId).then((resp:any)=>{
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
    }, []);

    const handleLoadMore =() =>{
        setLoader(true);
        getItems(data.next_page_url).then((resp:any)=>{
            if (list.length>0){
                list.forEach((item:any)=>{
                    tempList.push(item);
                })
            }
            if (data && resp.data.length>0){
                resp.data.forEach((item:any)=>{
                    if(tempList.findIndex((x:any)=>x.id === item.id)< 0) {
                        tempList.push(item);
                    }
                });
                setList(tempList);
            }
            setData(resp);
            setLoader(false);
        }, (resp:any)=>{
            setLoader(false);
        })
    };

  return (
      <div className={`card mb-5 ${className}`}>
          {/*begin::Card header*/}
          <div className="card-header">
              {/*begin::Heading*/}
              <div className="card-title">
                  <h3>Login Sessions</h3>
              </div>
              {/*end::Heading*/}

              {/*begin::Toolbar*/}
              <div className="card-toolbar">
                  {/*<div className="my-1 me-4">*/}
                  {/*    /!*begin::Select*!/*/}
                  {/*    <select className="form-select form-select-sm form-select-solid w-125px"*/}
                  {/*            data-control="select2"*/}
                  {/*            data-placeholder="Select Hours"*/}
                  {/*            data-hide-search="true">*/}
                  {/*        <option value="1" selected>1 Hours</option>*/}
                  {/*        <option value="2">6 Hours</option>*/}
                  {/*        <option value="3">12 Hours</option>*/}
                  {/*        <option value="4">24 Hours</option>*/}
                  {/*        <option value="0">All</option>*/}
                  {/*    </select>*/}
                  {/*    /!*end::Select*!/*/}
                  {/*</div>*/}
              </div>
              {/*end::Toolbar*/}
          </div>
          {/*end::Card header*/}

          {/*begin::Card body*/}
          <div className="card-body p-0">
              {/*begin::Table wrapper*/}
              <div className="table-responsive">
                  {/*begin::Table*/}
                  <table
                      className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                      {/*begin::Thead*/}
                      <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                      <tr>
                          <th className="min-w-250px">Location</th>
                          <th className="min-w-100px">Message</th>
                          <th className="min-w-150px">Browser - Platform</th>
                          <th className="min-w-150px">IP Address</th>
                          <th className="min-w-150px">Date Time</th>
                      </tr>
                      </thead>
                      {/*end::Thead*/}

                      {/*begin::Tbody*/}
                      <tbody className="fw-6 fw-semibold text-gray-600">
                      {list.length>0 &&
                      list.map((item:any)=>{
                          return <tr key={ item.id + '_' + item.user_id }>
                          <td>
                              <a href="#"
                                 className="text-hover-primary text-gray-600">{item.country_code}</a>
                          </td>

                          <td>
                            <span className="fs-7 fw-bold">{item.message}</span>
                          </td>

                          <td>{item.browser} - {item.platform}</td>

                          <td>{item.ip_address}</td>

                          <td>{item.date_ago}</td>
                      </tr>
                      })}

                      </tbody>
                      {/*end::Tbody*/}
                  </table>
                  {/*end::Table*/}
              </div>

              {(data && data.next_page_url) && <div onClick={handleLoadMore} className='card-footer py-5 text-center' id='kt_activities_footer'>
                  <button type="button" className='btn btn-bg-white text-primary'>
                      View More
                      <KTSVG path='assets/media/icons/duotune/arrows/arr064.svg'
                             className='svg-icon-3 svg-icon-primary'/>
                  </button>
              </div>}
              {isLoading && <ListLoading />}
              {/*end::Table wrapper*/}
          </div>
          {/*end::Card body*/}
      </div>
  )
}

export {MyLoginSessions}
