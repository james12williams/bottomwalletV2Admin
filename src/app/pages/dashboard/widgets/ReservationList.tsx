/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {ListLoading} from "../../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import {Link} from "react-router-dom";

type Props = {
    className: string,
    isLoading: boolean,
    data: any, reservationCount?: any,
}

const ReservationList: React.FC<Props> = ({className, isLoading, data, reservationCount=0}) => {
    return (<>
        {/* begin::List widget 5 */}
        <div className={`card ${className}`}>

            {/* begin::Card header */}
            <div className="card-header pt-7">
                {/* begin::Title */}
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-gray-800">Reservations</span>
                    <span className="text-gray-400 mt-1 fw-bold fs-6">Avg. {reservationCount} {reservationCount>1? 'reservations':'reservation'} per day</span>
                </h3>
                {/* end::Title */}
                {/* begin::Actions */}
                <div className="card-toolbar">
                    {/* begin::Filters */}
                    <div className="d-flex flex-stack flex-wrap gap-4">
                        {/* begin::Destination */}
                        <div className="d-flex align-items-center fw-bolder">
                            {/* begin::Label */}
                            <div className="text-gray-400 fs-7 me-2">Cateogry</div>
                            {/* end::Label */}
                            {/* begin::Select */}
                            <select className="form-select form-select-transparent text-graY-800 fs-base lh-1 fw-bolder py-0 ps-3 w-auto"
                                    data-control="select2"
                                    data-hide-search="true"
                                    data-dropdown-css-classname="w-150px"
                                    data-placeholder="Select an option"
                                    defaultValue={'Show All'}>
                                <option></option>
                                <option value="Show All">Show All</option>
                                <option value="a">Category A</option>
                                <option value="b">Category A</option>
                            </select>
                            {/* end::Select */}
                        </div>
                        {/* end::Destination */}
                        {/* begin::Status */}
                        <div className="d-flex align-items-center fw-bolder">
                            {/* begin::Label */}
                            <div className="text-gray-400 fs-7 me-2">Status</div>
                            {/* end::Label */}
                            {/* begin::Select */}
                            <select className="form-select form-select-transparent text-dark fs-7 lh-1 fw-bolder py-0 ps-3 w-auto"
                                    data-control="select2"
                                    data-hide-search="true"
                                    data-dropdown-css-classname="w-150px"
                                    data-placeholder="Select an option"
                                    data-kt-table-widget-4="filter_status"
                                    defaultValue={'Show All'}>
                                <option></option>
                                <option value="Show All">Show All</option>
                                <option value="0">Pending</option>
                                <option value="1">Approved</option>
                                <option value="2">Processing</option>
                                <option value="3">Rejected</option>
                                <option value="4">Paused</option>
                            </select>
                            {/* end::Select */}
                        </div>
                        {/* end::Status */}
                        <Link to="/apps/reservations" className="btn btn-sm btn-light">Reservation List</Link>

                    </div>
                    {/* begin::Filters */}
                </div>
                {/* end::Actions */}
            </div>
            {/* end::Card header */}
            {/* begin::Card body */}
            <div className="card-body pt-2">
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table className="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
                        {/* begin::Table head */}
                        <thead>
                        {/* begin::Table row */}
                        <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                            <th className="min-w-100px">Order ID</th>
                            <th className="text-end min-w-100px">Created</th>
                            <th className="text-end min-w-125px">Customer</th>
                            <th className="text-end min-w-100px">Total</th>
                            <th className="text-end min-w-100px">Profit</th>
                            <th className="text-end min-w-50px">Status</th>
                            {/*<th className="text-end"></th>*/}
                        </tr>
                        {/* end::Table row */}
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody className="fw-bolder text-gray-600">
                        {!isLoading && data?.length < 1 && <tr><td colSpan={7} className='text-center'>No Data!!!</td></tr>}
                        {data?.length>0 && data.map((item:any)=> {
                            return <tr key={item.code}>
                                <td>
                                    <a href="../../demo8/dist/apps/ecommerce/catalog/edit-product.html" className="text-gray-800 text-hover-primary">#{item.code}</a>
                                </td>
                                <td className="text-end">{item.created_at_formatted}</td>
                                <td className="text-end">
                                    <a href="#" className="text-gray-600 text-hover-primary">{item?.user?.name} ({ item.contact_name === item?.user?.name ? 'Self': item.contact_name })</a>
                                </td>
                                <td className="text-end">{item.currency_symbol}{item.amount}</td>
                                <td className="text-end">
                                    <span className="text-gray-800 fw-boldest">{item.currency_symbol}{item.cooperate_gain}</span>
                                </td>
                                <td className="text-end">
                                    {parseInt(item.checkin_status)===0&&<span className="badge py-3 px-4 fs-7 badge-light-warning">Upcoming</span>}
                                    {parseInt(item.checkin_status)===1&&<span className="badge py-3 px-4 fs-7 badge-light-success">CheckedIn</span>}
                                    {parseInt(item.checkin_status)===2&&<span className="badge py-3 px-4 fs-7 badge-light-success">CheckedOut</span>}
                                    {parseInt(item.checkin_status)===3&&<span className="badge py-3 px-4 fs-7 badge-light-danger">Canceled</span>}
                                    {parseInt(item.checkin_status)===4&&<span className="badge py-3 px-4 fs-7 badge-light-info">Missed</span>}
                                </td>
                                {/*<td className="text-end">*/}
                                {/*    {parseInt(item.status)===0&&<span className="badge py-3 px-4 fs-7 badge-light-info">Pending</span>}*/}
                                {/*    {parseInt(item.status)===1&&<span className="badge py-3 px-4 fs-7 badge-light-success">Paid</span>}*/}
                                {/*    {parseInt(item.status)===2&&<span className="badge py-3 px-4 fs-7 badge-light-warning">Canceled</span>}*/}
                                {/*    {parseInt(item.status)===3&&<span className="badge py-3 px-4 fs-7 badge-light-danger">Failed</span>}*/}
                                {/*    {parseInt(item.status)===4&&<span className="badge py-3 px-4 fs-7 badge-light-primary">Processing</span>}*/}
                                {/*</td>*/}
                            </tr>})}
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
            </div>
            {/* end::Card body */}
            {isLoading && <ListLoading />}
        </div>
        {/* end::List widget 5 */}
    </>)
};

export {ReservationList}
