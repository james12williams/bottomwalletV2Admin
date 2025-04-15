/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {initialQueryState, KTSVG, useDebounce} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponseXPanel} from "../../core/QueryResponseProvider";
import {useSearchParams} from "react-router-dom";

const ListSearchComponent = () => {
    const {updateState, state, isFirst} = useQueryRequest();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [perPage, setPerPage] = useState<any>(initialQueryState.per_page);
    const debouncedSearchTerm = useDebounce(searchTerm, 150);
    const debouncedPerPage = useDebounce(perPage, 150);
    const xPanel = useQueryResponseXPanel();
    const [params] = useSearchParams();

    // Effect for API call
    useEffect(() => {
            if (debouncedSearchTerm) {
                state.search = debouncedSearchTerm;
                updateState(state)
            }
        },
        [debouncedSearchTerm]
    );

    useEffect(() => {
            if (debouncedPerPage) {
                state.per_page = perPage;
                updateState(state)
            }
        },
        [debouncedPerPage]
    );

    useEffect(() => {

    }, [state]);

    const onSearchChange = (e:any) =>{
        if (e.target.value){
            setSearchTerm(e.target.value)
        } else{
            updateState({search: "", ...initialQueryState})
            setSearchTerm("")
        }
    }

    const onChangeLimit = (e:any) =>{
        setPerPage(e.target.value);
    };

    useEffect(() => {
        state.per_page = initialQueryState.per_page;
        state.search = '';
        setSearchTerm("")
        setPerPage(initialQueryState.per_page)
        updateState(state)
    }, [isFirst]);

    return (
        <div className='card-title'>
            {/* begin::Search */}
            {xPanel && !xPanel.hideSearchBar && <div className='d-flex align-items-center position-relative my-1 me-3'>
                <KTSVG path='assets/media/icons/duotune/general/gen021.svg'
                    className='svg-icon-1 position-absolute ms-6'/>
                <input type='text'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid w-250px ps-14'
                    placeholder={xPanel.search_placeholder}
                    value={searchTerm? searchTerm : (params.get('search')??'')}
                    onChange={onSearchChange}
                />
            </div>}
            {/* end::Search */}
            <select className="select2-selection select2-selection--single form-select mb-3 mb-lg-0"
                    name="per_page"
                    id="per_page"
                    value={state.per_page}
                    onChange={onChangeLimit}
            >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="250">250</option>
                <option value="500">500</option>
            </select>
        </div>
    )
}

export {ListSearchComponent}
