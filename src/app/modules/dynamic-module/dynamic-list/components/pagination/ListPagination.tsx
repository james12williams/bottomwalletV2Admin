/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import { useSearchParams } from "react-router-dom";
import React from "react";

const ListPagination = () => {
  const pagination = useQueryResponsePagination();
  const isLoading = useQueryResponseLoading();
  const {updateState} = useQueryRequest();
  const [params, setParams] = useSearchParams();

  const updatePage = (page: any) => {
    if (!page || isLoading || parseInt(pagination.page) === parseInt(page)) {
      return;
    }
    else if (page == 'Next &raquo;' && parseInt(pagination.current_page) === parseInt(pagination.last_page)){
      return;
    }
    else if (page == '&laquo; Previous' && parseInt(pagination.current_page) < 2){
      return;
    }
    else if (page == 'Next &raquo;' && pagination.current_page < pagination.last_page){
      page = pagination.current_page+1;
    }
    else if (page == '&laquo; Previous' && pagination.current_page > 2){
      page = pagination.current_page-1;
    }

    updateState({page, per_page: pagination.per_page || 10});

    params.set('per_page', String(pagination.per_page || 10));
    params.set('page', page);
    setParams(params)
  };

  return (
      <div className='row'>
        <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
          {pagination.total ?<div className="fs-6 fw-semibold text-gray-700" id="tableid_info" role="status"
                aria-live="polite">Showing {pagination.from} to {pagination.to} of {pagination.total} entries</div>:''}
        </div>
        <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
          <div id='kt_table_users_paginate'>
            <ul className='pagination'>
              {pagination.links?.map((link: any, index:any) => (
                  <li key={link.label+'_'+index}
                      className={clsx('page-item', {
                        active: pagination.current_page == link.label,
                        disabled: isLoading,
                        previous: link.label === '&laquo; Previous',
                        next: link.label == 'Next &raquo;',
                      })}>
                    <a className='page-link'
                       onClick={() => updatePage(link.label)}
                       dangerouslySetInnerHTML={{__html: link.label}}
                       style={{cursor: 'pointer'}}
                    />
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
};

export {ListPagination}
