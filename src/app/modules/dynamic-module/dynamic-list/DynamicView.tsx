import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {
    routerReplace,
    viewItem,
} from './core/QueryResponseProvider'
import React, {useEffect} from "react";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {useQuery} from "react-query";
import {ListLoading} from "./components/loading/ListLoading";
import { useParams } from 'react-router';
import {isNotEmpty, KTCard} from "../../../../_metronic/helpers";
import {useAuth} from "../../auth";

type Props = {
    apiPath: string,
    queryName: string,
};

const ItemView = ({queryName, apiPath}:Props) => {
    const {setErrorCode} = useAuth();
    const {isLoading, data} = useQuery(
        `${queryName}`,
        () => {
            return viewItem(apiPath)
        },
        {cacheTime: 0, enabled: true}
    );

    useEffect(()=>{
        if (data){
            setErrorCode(data?.status)
        }else{
            setErrorCode('')
        }
    }, [data]);

    useEffect(()=>{
        MenuComponent.reinitialization()
    }, []);

    return (
        <>
            <KTCard>

                <div className='card-header'>
                    {/* begin::Modal title */}
                    <h2 className='fw-bolder text-capitalize'
                        style={{lineHeight: '70px', width:"-webkit-fill-available"}} dangerouslySetInnerHTML={{__html:data?.title}} />
                    {/* end::Modal title */}
                </div>

                <div className="card-body">
                    {isNotEmpty(data) && <div dangerouslySetInnerHTML={{__html:data.render}} />}
                    {isLoading && <ListLoading />}
                </div>

            </KTCard>
        </>
    )
};

const DynamicView = ({queryName, apiPath}:Props) => {
    const params= useParams();
    apiPath = routerReplace(apiPath, params);
    return (<QueryRequestProvider>
        <ListViewProvider>
            <ItemView queryName={queryName} apiPath={apiPath} />
        </ListViewProvider>
    </QueryRequestProvider>)
};

export {DynamicView}
