/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {MorrisChart, ProductList, UserList, CardWidget} from './widgets'
import {getItems} from "../../modules/dynamic-module/dynamic-list/core/QueryResponseProvider";
import {ReservationList} from "./widgets/ReservationList";
import {useApp} from "../../../layouts/core/QueryResponseProvider";
import {PageTitle} from "../../../_metronic/layout/core";

const DashboardPage: FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({}) as any;
    const {app} = useApp();

    const getDashboardData = () =>{
        setLoading(true);
        getItems('dashboard').then((resp:any)=>{
            setData(resp);
            setLoading(false);
        }, (resp:any)=>{
            setLoading(false);
        })
    };
    useEffect(() => {
        getDashboardData();
    }, []);

    return <>
        {/* begin::Row */}
        <div className="row">

            <CardWidget className={'col-xl-3 mb-5'} bgColor={'bg-body-white'}
                        title={ (data.count_posts_txt ? data.count_posts_txt: '0 Item') }
                        description={ (data.count_posts_info ? data.count_posts_info: '--') }
                        path={'/apps/posts'}
                        icon={'assets/media/svg/files/cart.svg'}
                        textColor={"text-gray-900"}
                        iconColor={"svg-icon-primary"}
                        isLoading={isLoading} />
            <CardWidget className={'col-xl-3 mb-5'} bgColor={'bg-primary'}
                        title={ (data.count_businesses_txt ? data.count_businesses_txt: '0 Business') }
                        description={ (data.count_businesses_info ? data.count_businesses_info: '--') }
                        path={'/apps/businesses'}
                        icon={"assets/media/icons/duotune/ecommerce/ecm004.svg"}
                        textColor={"text-white"}
                        iconColor={"svg-icon-white"}
                        isLoading={isLoading} />

            <CardWidget className={'col-xl-3 mb-5'} bgColor={'bg-dark'}
                        title={ (data.count_merchants_txt ? data.count_merchants_txt: '0 Merchant') }
                        description={ (data.count_merchants_info ? data.count_merchants_info: '--') }
                        path={'/apps/merchants'}
                        icon={"assets/media/icons/duotune/communication/com006.svg"}
                        textColor={"text-white"}
                        iconColor={"svg-icon-white"}
                        isLoading={isLoading} />
            <CardWidget className={'col-xl-3 mb-5'} bgColor={'bg-warning'}
                        title={ (data.count_reservations_txt ? data.count_reservations_txt: '0 Business') }
                        description={ (data.count_reservations_info ? data.count_reservations_info: '--') }
                        path={'/apps/reservations'}
                        icon={"assets/media/icons/duotune/arrows/arr070.svg"}
                        textColor={"text-white"}
                        iconColor={"svg-icon-white"}
                        isLoading={isLoading} />
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className="row gy-5 g-xl-10 mb-xl-10">
            {/* begin::Col */}
            <div className="col-xl-12">
                <MorrisChart isLoading={isLoading} data={data.latestReservationChart}
                             className='card-flush h-xl-100'
                             chartColor='primary'
                             chartHeight='450px'
                />
            </div>
            {/* end::Col */}
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className="row gy-5 g-xl-10">
            {/* begin::Col */}
            <div className="col-xl-4 mb-xl-10">
                {/* begin::Engage widget 1 */}
                <div className="card h-md-100">
                    {/* begin::Body */}
                    <div className="card-body d-flex flex-column flex-center">
                        {/* begin::Heading */}
                        <div className="mb-2">
                            {/* begin::Title */}
                            <h1 className="fw-bold text-gray-800 text-center lh-lg">Have you tried
                                <br />new <span className="fw-boldest">{app.app_name} App ?</span></h1>
                            {/* end::Title */}
                            {/* begin::Illustration */}
                            <div className="flex-grow-1 bgi-no-repeat bgi-size-contain bgi-position-x-center card-rounded-bottom h-200px mh-200px my-5 my-lg-12" style={{backgroundImage: 'url(/assets/media/svg/illustrations/easy/2.svg)'}}/>
                            {/* end::Illustration */}
                        </div>
                        {/* end::Heading */}
                    </div>
                    {/* end::Body */}
                </div>
                {/* end::Engage widget 1 */}
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className="col-xl-8 mb-5 mb-xl-10">
                {/* begin::Table Widget 4 */}
                <ReservationList reservationCount={data.count_reservations}
                                 data={data.latestReservations}
                                 isLoading={isLoading}
                                 className='card-flush h-xl-100'/>
                {/* end::Table Widget 4 */}
            </div>
            {/* end::Col */}
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className="row gy-5 g-xl-10 mb-xl-10">
            {/* begin::Col */}
            <div className="col-xl-8">
                <MorrisChart isLoading={isLoading} data={data.latestPostsChart}
                             className='card-flush h-xl-100'
                             chartColor='primary'
                             chartHeight='450px'
                />
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className="col-xl-4">
                <ProductList postCount={data.count_posts} data={data.latestPosts} isLoading={isLoading} className='card-flush h-xl-100'/>
            </div>
            {/* end::Col */}
        </div>
        {/* end::Row */}

        {/*/!* begin::Row *!/*/}
        <div className='row gy-5 gx-xl-8'>
            <div className='col-xl-8'>
                <MorrisChart isLoading={isLoading} data={data.latestUsersChart}
                             className='card-xxl-stretch'
                             chartColor='primary'
                             chartHeight='450px'
                />
            </div>
            <div className='col-xxl-4'>
                <UserList data={data.latestUsers} isLoading={isLoading} className='card-xxl-stretch'/>
            </div>
        </div>
        {/*/!* end::Row *!/*/}
    </>
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
};

export {DashboardWrapper}
