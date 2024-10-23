/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {ListLoading} from "../../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import {Link} from "react-router-dom";

type Props = {
    className: string,
    isLoading: boolean,
    data: any, postCount?: number,
}

const ProductList: React.FC<Props> = ({className, isLoading, data, postCount=0}) => {
    return (<>
        {/* begin::Table Widget 5 */}
        <div className={`card ${className}`}>
            {/* begin::Card header */}
            <div className="card-header pt-7">
                {/* begin::Title */}
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-dark">Stock Report</span>
                    <span className="text-gray-400 mt-1 fw-bold fs-6">Total {postCount} {postCount>1? "Items" :'Item'} in the Stock</span>
                </h3>
                {/* end::Title */}
                {/* begin::Actions */}
                <div className="card-toolbar">
                    {/* begin::Filters */}
                    <div className="d-flex flex-stack flex-wrap gap-4">
                        {/* begin::Destination */}
                        <div className="d-flex align-items-center fw-bolder">
                            {/* begin::Label */}
                            <div className="text-muted fs-7 me-2">Cateogry</div>
                            {/* end::Label */}
                            {/* begin::Select */}
                            <select className="form-select form-select-transparent text-dark fs-7 lh-1 fw-bolder py-0 ps-3 w-auto"
                                    data-control="select2" data-hide-search="true"
                                    data-dropdown-css-classname="w-150px"
                                    defaultValue={"Show All"}
                                    data-placeholder="Select an option">
                                <option></option>
                                <option value="Show All">Show All</option>
                                <option value="a">Category A</option>
                                <option value="b">Category B</option>
                            </select>
                            {/* end::Select */}
                        </div>
                        {/* end::Destination */}
                        {/* begin::Status */}
                        <div className="d-flex align-items-center fw-bolder">
                            {/* begin::Label */}
                            <div className="text-muted fs-7 me-2">Status</div>
                            {/* end::Label */}
                            {/* begin::Select */}
                            <select className="form-select form-select-transparent text-dark fs-7 lh-1 fw-bolder py-0 ps-3 w-auto"
                                    data-control="select2"
                                    data-hide-search="true"
                                    data-dropdown-css-classname="w-150px"
                                    data-placeholder="Select an option"
                                    defaultValue={"Show All"}
                                    data-kt-table-widget-5="filter_status">
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
                        {/* begin::Search */}
                        <Link to={"/apps/posts"} className="btn btn-light btn-sm">View Stock</Link>
                        {/* end::Search */}
                    </div>
                    {/* begin::Filters */}
                </div>
                {/* end::Actions */}
            </div>
            {/* end::Card header */}
            {/* begin::Card body */}
            <div className="card-body">
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table className="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_5_table">
                        {/* begin::Table head */}
                        <thead>
                        {/* begin::Table row */}
                        <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                            <th className="min-w-100px">Item</th>
                            <th className="text-end pe-3 min-w-100px">Product ID</th>
                            <th className="text-end pe-3 min-w-150px">Date Added</th>
                            <th className="text-end pe-3 min-w-100px">Price</th>
                            <th className="text-end pe-3 min-w-50px">Status</th>
                            <th className="text-end pe-0 min-w-25px">Qty</th>
                        </tr>
                        {/* end::Table row */}
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody className="fw-bolder text-gray-600">
                        {!isLoading && data?.length < 1 && <tr><td colSpan={6} className='text-center'>No Data!!!</td></tr>}

                        {data?.length>0 && data.map((item:any)=> {
                            return <tr key={item.uid}>
                                {/* begin::Item */}
                                <td>
                                    <Link to={ '/apps/posts/' + item.id + '/edit'} className="text-dark text-hover-primary">{ item.title }</Link>
                                </td>
                                {/* end::Item */}
                                {/* begin::Product ID */}
                                <td className="text-end">{ item.uid }</td>
                                {/* end::Product ID */}
                                {/* begin::Date added */}
                                <td className="text-end">{ item.created_at_formatted }</td>
                                {/* end::Date added */}
                                {/* begin::Price */}
                                <td className="text-end">{ item.currency_symbol }{ item.price }</td>
                                {/* end::Price */}
                                {/* begin::Status */}
                                <td className="text-end">
                                    {parseInt(item.status) === 0 && <span className="badge py-3 px-4 fs-7 badge-light-info">Pending</span>}
                                    {parseInt(item.status) === 1 && <span className="badge py-3 px-4 fs-7 badge-light-success">Approved</span>}
                                    {parseInt(item.status) === 2 && <span className="badge py-3 px-4 fs-7 badge-light-primary">Processing</span>}
                                    {parseInt(item.status) === 3 && <span className="badge py-3 px-4 fs-7 badge-light-danger">Rejected</span>}
                                    {parseInt(item.status) === 4 && <span className="badge py-3 px-4 fs-7 badge-light-warning">Paused</span>}
                                </td>
                                {/* end::Status */}
                                {/* begin::Qty */}
                                <td className="text-end" data-order="58">
                                    <span className="text-dark fw-bolder">{ item.qty }</span>
                                </td>
                                {/* end::Qty */}
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
        {/* end::Table Widget 5 */}
    </>)
};

export {ProductList}
