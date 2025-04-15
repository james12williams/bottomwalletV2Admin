/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ListLoading} from "../../../dynamic-module/dynamic-list/components/loading/ListLoading";
import {getItems} from "../../../../../layouts/core/QueryResponseProvider";
import {useUserView} from "../../UserViewProvider";
import {KTSVG} from "../../../../../_metronic/helpers";
import {LogLoader, TableRowLoader} from "../../../../../partials/loaders";

type Props = {
    className?: string
}

const MyLogs: React.FC<Props> = ({className='mb-lg-10'}) => {
    const {currentUserId} = useUserView();
    const [list, setList] = useState([]);
    const [data, setData] = useState({}) as any;
    const [isLoading, setLoader] = useState(false);
    let tempList = [] as any;

    useEffect(()=>{
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
        <div className={`card pt-4 ${className}`}>
            {/*begin::Card header*/}
            <div className="card-header border-0">
                {/*begin::Card title*/}
                <div className="card-title">
                    <h2>Logs</h2>
                </div>
                {/*end::Card title*/}

                {/*begin::Card toolbar*/}
                <div className="card-toolbar">
                    {/*begin::Button*/}
                    <button type="button" className="btn btn-sm btn-light-primary">
                        <i className="ki-duotone ki-cloud-download fs-3">
                            <span className="path1"/>
                            <span className="path2"/>
                        </i>
                        Download Report
                    </button>
                    {/*end::Button*/}
                </div>
                {/*end::Card toolbar*/}
            </div>
            {/*end::Card header*/}

            {/*begin::Card body*/}
            <div className="card-body py-0">
                {/*begin::Table wrapper*/}
                <div className="table-responsive">
                    {/*begin::Table*/}
                    <table className="table align-middle table-row-dashed fw-semibold text-gray-600 fs-6 gy-5" id="kt_table_customers_logs">
                        {/*begin::Table body*/}
                        <tbody>
                        {/*begin::Table row*/}
                        {list.length>0 &&
                        list.map((item:any)=>{
                            return <tr key={ item.id + '_' + item.user_id }>
                                {/*begin::Badge*/}
                                <td className="min-w-70px">
                                    <div className={"badge badge-light-"+item.status}>{item.statusCode} {item.status_txt}</div>
                                </td>
                                {/*end::Badge*/}

                                {/*begin::Status*/}
                                <td>{item.request_method} {item.request_uri} </td>
                                {/*end::Status*/}

                                {/*begin::Timestamp*/}
                                <td className="pe-0 text-end min-w-200px">{item.request_time}</td>
                                {/*end::Timestamp*/}
                            </tr>
                        })}
                        {isLoading?<TableRowLoader count={5}/>:''}
                        {(!isLoading && list.length<1) && <tr>
                            <td>
                                <div className="text-center">
                                    <div className="pt-10 pb-10">
                                        <i className="ki-duotone ki-information-2 fs-4x opacity-50">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                            <span className="path3"></span>
                                        </i>
                                    </div>
                                    <div className="pb-15 fw-bold">
                                        <h3 className="text-gray-600 fs-5 mb-2">No data available</h3>
                                        <div className="text-muted fs-7">Populate the record and check back later...</div>
                                    </div>
                                </div>
                            </td>
                        </tr>}
                        </tbody>
                        {/*end::Table body*/}
                    </table>
                    {/*end::Table*/}
                </div>

                {(data && data.next_page_url) && <div onClick={handleLoadMore} className='card-footer py-5 text-center' id='kt_activities_footer'>
                    <button type="button" className='btn btn-bg-white text-primary'>
                        View More
                        <KTSVG path='assets/media/icons/duotune/arrows/arr064.svg' className='svg-icon-3 svg-icon-primary'/>
                    </button>
                </div>}

                {isLoading && <ListLoading />}
                {/*end::Table wrapper*/}
            </div>
            {/*end::Card body*/}
        </div>
    )
}

export {MyLogs}
