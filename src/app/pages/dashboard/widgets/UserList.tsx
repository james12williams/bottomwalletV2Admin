/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {ListLoading} from "../../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import {Link} from "react-router-dom";

type Props = {
  className?: string,
  isLoading?: boolean,
  data:any
}

const UserList: React.FC<Props> = ({className='card-xxl-stretch', isLoading, data}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Latest Users</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-150px'>User</th>
                <th className='min-w-140px'>Country</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
            {data?.length>0 &&
              data.map((item:any)=>{
                return <tr  key={ item.uid }>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={item.photo?item.photo:'/user.svg'} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to={ '/apps/users/' + item.id} className='text-dark fw-bolder text-hover-primary fs-6'>
                          {item.name}
                        </Link>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                      {item.country_code}
                    </a>
                  </td>
                </tr>
              })}

            {!isLoading && data?.length < 1 && <tr><td colSpan={2} className="text-center"><span className='text-muted fw-bold text-muted d-block fs-7'>No Data!!!</span></td></tr>}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}

        <div className='card-footer py-1 text-center' id='kt_activities_footer'>
          <Link to="/apps/users" className='btn btn-bg-white text-primary'>
            View All
          </Link>
        </div>

        {isLoading && <ListLoading />}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {UserList}
