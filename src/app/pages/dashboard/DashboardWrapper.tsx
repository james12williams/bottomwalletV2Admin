/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import {useIntl} from 'react-intl'
import {CardWidget} from './widgets'
import {getItems} from "../../modules/dynamic-module/dynamic-list/core/QueryResponseProvider";
import {PageTitle} from "../../../_metronic/layout/core";
import {DashboardLoader} from "../../../partials/loaders/DashboardLoader.tsx";
import {DynamicWidget} from "../../components/DynamicWidget.tsx";

type Props = {
    path: any
}

const DashboardPage: FC<Props> = ({path}) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({}) as any;

    const getDashboardData = () =>{
        setLoading(true);
        getItems(path).then((resp:any)=>{
            setData(resp);
            setLoading(false);
        }, (resp:any)=>{
            setLoading(false);
        })
    };

    useEffect(() => {
        getDashboardData();
    }, [path]);

    return <>

        {isLoading && <DashboardLoader  count={8} /> }

        {/* begin::Row */}
        <div className="row">
            {!isLoading && data?.cards?.length>0 ? data.cards.map((card:any, index:any)=>{
                return <CardWidget key={'card_'+index} className={ card.className??'col-xl-3 mb-5'}
                                   bgColor={ card.bgColor }
                                   title={ card.title }
                                   description={ card.description }
                                   path={ card.path }
                                   icon={ card.icon }
                                   textColor={ card.textColor }
                                   iconColor={ card.iconColor }
                                   isLoading={ isLoading } />;
            }):""}
        </div>
        {/* end::Row */}

        {/*/!* begin::Row *!/*/}
        {!isLoading && data.options?.length>0 ? <div className='row gy-5 gx-xl-8'>
            {data.options.map((card:any, index:any)=>{
                return <div key={card.name+'_'+index} className={card.className??'col-xl-12'}>
                    <DynamicWidget card={card} />
                </div>
            })}
        </div>:""}
        {/*/!* end::Row *!/*/}
    </>
};

type SecondProps = {
    path: string,
    base?: string,
    baseTitle?: string,
    entityNamePlural?: string,
    entityName?: string,
    queryName?: string,
    usersBreadcrumbs?: any,
}

const DashboardWrapper: FC<SecondProps> = ({path, base, baseTitle, entityName, entityNamePlural, queryName, usersBreadcrumbs}) => {
    const intl = useIntl();
    const [apiPath, setPath] = useState(path)
    const location = useLocation();

    useEffect(() => {
        setPath((location.pathname)?.replace('/apps/', ''))
    }, [location.pathname]);

    return (
        <>
            <PageTitle breadcrumbs={[]}>{entityName??intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage path={apiPath} />
        </>
    )
};

export {DashboardWrapper}
