import React, {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTSVG, reInitMenu} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse, useQueryResponseXPanel} from '../../core/QueryResponseProvider'
import {CustomFilter} from "../filters/CustomFilter";
import {useSearchParams} from "react-router-dom";
import {MyTooltip} from "../buttons/MyTooltip";
import {AxiosService} from "../../../../../servicies/axios-service.tsx";

const ListFilter = () => {
  const xPanel = useQueryResponseXPanel();
  const {updateState} = useQueryRequest();
  const {isLoading, refetch} = useQueryResponse();
  const [filters, setFilters] = useState(xPanel.filters);
  const [inputValue, setInputValue] = useState({});
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    reInitMenu()
  }, []);

  const resetData = (e:any) => {
    setParams({});
    setInputValue({});
    updateState({filter: undefined, ...initialQueryState});
    setFilters([]);
    setTimeout(()=>{
      setFilters(xPanel.filters);
      refetch();
      MenuComponent.reinitialization()
    }, 200);
  };

  useEffect(()=>{
    if (xPanel.filters.length){
      setFilters(xPanel.filters);
    }else{
      setFilters([]);
    }
    MenuComponent.reinitialization()
  },[isLoading, xPanel]);

  const filterData = (e:any) => {
    e.preventDefault();
    let inputValue2 = AxiosService.serialize(e.target);
    inputValue2 = AxiosService.removeEmptyValues(inputValue2);
    setParams(inputValue2);
    updateState({
      filter: inputValue2,
      ...initialQueryState,
    });
  };

  const handleFormChange = (e:any) =>{
    if (e?.target) {
      const {name, value} = e.target;
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(()=>{
    filters.forEach((x:any)=>{
      if (params.get(x.name)){
        setInputValue((prev) => ({
          ...prev,
          [x.name]: params.get(x.name),
        }));
      }
    })
  }, [params, filters]);

  if (filters.length)
    return (
      <>
        {/* begin::Filter Button */}
        <MyTooltip content={"Filter"} placement={'top'}>
        <button
          disabled={isLoading}
          type='button'
          className='btn btn-light-primary me-3'
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'>
          <KTSVG path='assets/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
          Filter
        </button>
        </MyTooltip>
        {/* end::Filter Button */}
        {/* begin::SubMenu */}
        <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
          {/* begin::Header */}
          <div className='px-7 py-5'>
            <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
          </div>
          {/* end::Header */}

          {/* begin::Separator */}
          <div className='separator border-gray-200' />
          {/* end::Separator */}

          {/* begin::Content */}
          <form className='px-7 py-5' data-kt-user-table-filter='form' id="kt_table_filter_form" onReset={resetData} onSubmit={filterData}>
            <div style={{maxHeight: '50vh', overflow: 'auto'}}>
            {
              filters.map((filter: any, i:any) => {
                return <CustomFilter filter={filter}
                                     key={`filter-${i}-${filter.id}`}
                                     onChange={handleFormChange} />
              })
            }
            </div>
            {/* begin::Actions */}
            <div className='d-flex justify-content-end'>
              <button type='reset'
                disabled={isLoading}
                className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                data-kt-menu-dismiss='false'
                data-kt-user-table-filter='reset'>
                Reset
              </button>
              <button disabled={isLoading}
                type='submit'
                className='btn btn-primary fw-bold px-6'
                data-kt-user-table-filter='filter'>
                Apply
              </button>
            </div>
            {/* end::Actions */}
          </form>
          {/* end::Content */}
        </div>
        {/* end::SubMenu */}
      </>
    );
  else
    return <></>
};

export {ListFilter}
