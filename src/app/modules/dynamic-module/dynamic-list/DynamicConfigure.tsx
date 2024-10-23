import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {
    routerReplace,
    configureItem,
} from './core/QueryResponseProvider'
import {isNotEmpty, KTCard} from '../../../../_metronic/helpers'
import React, {useEffect} from "react";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {useQuery} from "react-query";
import {ListLoading} from "./components/loading/ListLoading";
import {DynamicForm} from "./components/forms/DynamicForm";
import { useParams } from 'react-router';
import {useAuth} from "../../auth";

type Props = {
    apiPath: string,
    queryName: string,
};

const ItemConfigure = ({queryName, apiPath}:Props) => {
    const {setErrorCode} = useAuth();
    const {isLoading, data} = useQuery(
        `${queryName}`,
        () => {
            return configureItem(apiPath)
        },
        {
            cacheTime: 0,
            enabled: true,
            onError: (err:any) => {}
        }
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

                <div className="container mt-10 mb-10">
                    {isNotEmpty(data) && <DynamicForm isUserLoading={isLoading}  data={data}/>}
                    {isLoading && <ListLoading />}
                </div>

            </KTCard>
        </>
    )
};

const DynamicConfigure = ({queryName, apiPath}:Props) => {
    const params= useParams();
    apiPath = routerReplace(apiPath, params);
    return (<QueryRequestProvider>
            <ListViewProvider>
                <ItemConfigure queryName={queryName} apiPath={apiPath} />
            </ListViewProvider>
    </QueryRequestProvider>)
};

export {DynamicConfigure}
