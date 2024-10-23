import {useListView} from '../../core/ListViewProvider'
import {ListToolbar} from './ListToolbar'
import {ListGrouping} from './ListGrouping'
import {ListSearchComponent} from './ListSearchComponent'
import React, {useEffect, useState} from "react";
import {useQueryResponseLoading} from "../../core/QueryResponseProvider";

type Props = {
    apiPath: string,
    queryName: string,
    headerClassName?: string,
};

const ListHeader = ({queryName, apiPath, headerClassName}:Props) => {
    const {selected} = useListView();
    const loading = useQueryResponseLoading();
    const [isLoading, setLoader] = useState(loading);
    useEffect(()=>{
        setLoader(loading);
    }, [loading]);
    return (<>
            <div className={headerClassName?headerClassName:'card-header border-0 pt-0 pe-0'}>
                <ListSearchComponent />
                {/* begin::Card toolbar */}
                {!isLoading && <div className='card-toolbar' style={{overflow:'scroll'}}>
                    {/* begin::Group actions */}
                    {selected.length > 0 ? <ListGrouping  queryName={queryName} apiPath={apiPath}/> : <ListToolbar queryName={queryName} />}
                    {/* end::Group actions */}
                </div>}
                {/* end::Card toolbar */}
            </div>
        </>
    )
}

export {ListHeader}
