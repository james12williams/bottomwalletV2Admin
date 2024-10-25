/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {MorrisChart, ProductList, UserList, CardWidget} from './widgets'
import {getItems} from "../../modules/dynamic-module/dynamic-list/core/QueryResponseProvider";
import {ReservationList} from "./widgets/ReservationList";
import {useApp} from "../../../layouts/core/QueryResponseProvider";
import {PageTitle} from "../../../_metronic/layout/core";
import {CardLoaderWidget} from "../../../partials/loaders/CardLoaderWidget";

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
            {!isLoading && data?.cards?.length>0 && data.cards.map((card:any, index:any)=>{
                return <CardWidget key={'card_'+index} className={'col-xl-3 mb-5'}
                                   bgColor={ card.bgColor }
                                   title={ card.title }
                                   description={ card.description }
                                   path={ card.path }
                                   icon={ card.icon }
                                   textColor={ card.textColor }
                                   iconColor={ card.iconColor }
                                   isLoading={ isLoading } />;
            })}
            {isLoading && <CardLoaderWidget count={8}/>}
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className="row gy-5 g-xl-10 mb-xl-10">
            {/* begin::Col */}
            <div className="col-xl-12">
                <MorrisChart isLoading={isLoading} data={data.latestPaymentsChart}
                             className='card-flush h-xl-100'
                             chartColor='primary'
                             chartHeight='450px'
                />
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
