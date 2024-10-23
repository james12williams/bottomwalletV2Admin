import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {
    QueryResponseProvider, routerReplace,
    useQueryResponse,
    useQueryResponseColumn,
    useQueryResponseLoading
} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {DynamicTable} from './table/DynamicTable'
import {DynamicModal} from './modal/DynamicModal'
import {KTCard} from '../../../../_metronic/helpers'
import React, {FC, useEffect} from "react";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {useParams} from "react-router";
import {ListLoading} from "./components/loading/ListLoading";
import {ExportModal} from "./modal/ExportModal";
import {ImportModal} from "./modal/ImportModal";
import {ActionModal} from "./modal/ActionModal";
import {useAuth} from "../../auth";


type Props = {
    apiPath: string,
    queryName: string,
    entityName?: string,
    entityNamePlural?: string,
    headerClassName?: string,
};

const ItemList = ({queryName, apiPath, entityName, entityNamePlural, headerClassName}:Props) => {
    const {itemIdForUpdate, bookingIdToCancel, importItems, exportItem, clearSelected} = useListView();
    const {setErrorCode} = useAuth();
    const {response} = useQueryResponse();
    const columnList = useQueryResponseColumn(response?.xPanel, queryName);
    const isLoading = useQueryResponseLoading();
    useEffect(()=>{
        if (response){
            setErrorCode(response?.status)
        }else{
            setErrorCode('')
        }
    }, [response]);

    useEffect(()=>{
        clearSelected();
        MenuComponent.reinitialization()
    }, [apiPath]);

    return (
        <>
            <KTCard>
                <ListHeader queryName={queryName} apiPath={apiPath} headerClassName={headerClassName}/>
                {columnList.length>0 && <DynamicTable columnList={columnList} />}
                {isLoading && <div style={{minHeight:'60vh'}}>
                    <ListLoading/>
                </div>}
            </KTCard>
            {itemIdForUpdate !== undefined && <DynamicModal queryName={queryName+'_item_'+itemIdForUpdate} />}
            {exportItem && <ExportModal queryName={queryName+'_item_'+itemIdForUpdate} />}
            {importItems && <ImportModal queryName={queryName+'_item_import'} />}
            {bookingIdToCancel !== undefined && <ActionModal queryName={queryName+'_cancel_booking'} />}
        </>
    )
};

const DynamicList = ({queryName, apiPath, entityName, entityNamePlural, headerClassName}:Props) => {
    const params = useParams();
    apiPath = routerReplace(apiPath, params);

    return (<QueryRequestProvider>
        <QueryResponseProvider queryName={queryName} apiPath={apiPath}>
            <ListViewProvider>
                <ItemList queryName={queryName} apiPath={apiPath} headerClassName={headerClassName}/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>)
};

export {DynamicList}
