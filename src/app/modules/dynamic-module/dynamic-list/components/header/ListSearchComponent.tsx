/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {initialQueryState, KTSVG, useDebounce} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponseXPanel} from "../../core/QueryResponseProvider";
import {useSearchParams} from "react-router-dom";

const ListSearchComponent = () => {
    const {updateState} = useQueryRequest();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 150);
    const xPanel = useQueryResponseXPanel();
    const [params] = useSearchParams();

    // Effect for API call
    useEffect(() => {
            if (debouncedSearchTerm && searchTerm !== undefined) {
                updateState({search: debouncedSearchTerm, ...initialQueryState})
            }
        },
        [debouncedSearchTerm]
        // Only call effect if debounced search term changes
        // More details about useDebounce: https://usehooks.com/useDebounce/
    );

    const onSearchChange = (e:any) =>{
        if (e.target.value){
            setSearchTerm(e.target.value)
        } else{
            updateState({search: "", ...initialQueryState})
            setSearchTerm("")
        }
    }

    return (
        <div className='card-title'>
            {/* begin::Search */}
            {xPanel && !xPanel.hideSearchBar && <div className='d-flex align-items-center position-relative my-1'>
                <KTSVG
                    path='assets/media/icons/duotune/general/gen021.svg'
                    className='svg-icon-1 position-absolute ms-6'
                />
                <input type='text'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid w-250px ps-14'
                    placeholder={xPanel.search_placeholder}
                    value={searchTerm? searchTerm : (params.get('search')??'')}
                    onChange={onSearchChange}
                />
            </div>}
            {/* end::Search */}
        </div>
    )
}

export {ListSearchComponent}
