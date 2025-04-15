import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {
    routerReplace,
    editItem,
    QueryResponseProvider,
} from './core/QueryResponseProvider'
import {isNotEmpty, KTCard} from '../../../../_metronic/helpers'
import React, {useEffect} from "react";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {useQuery} from "react-query";
import {ListLoading} from "./components/loading/ListLoading";
import {DynamicForm} from "./components/forms/DynamicForm";
import { useParams } from 'react-router';
import {useAuth} from "../../auth";
import {FormLoader} from "../../../../partials/loaders";

type Props = {
    apiPath: string,
    queryName: string,
};

const ItemEdit = ({queryName, apiPath}:Props) => {
    const {setErrorCode} = useAuth();
    const {isLoading, data} = useQuery(
        `${queryName}`,
        () => {
            return editItem(apiPath)
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
            <div className="container mt-10 mb-10">
                {isNotEmpty(data) && <DynamicForm isUserLoading={isLoading}  data={data}/>}
                {isLoading && <FormLoader />}
            </div>
        </>
    )
};

const DynamicEdit = ({queryName, apiPath}:Props) => {
    const params= useParams();
    apiPath = routerReplace(apiPath, params);
    return (<QueryRequestProvider>
        <ListViewProvider>
            <ItemEdit queryName={queryName} apiPath={apiPath} />
        </ListViewProvider>
    </QueryRequestProvider>)
};

export {DynamicEdit}
