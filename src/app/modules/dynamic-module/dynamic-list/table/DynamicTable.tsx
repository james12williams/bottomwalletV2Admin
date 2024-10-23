import React, {useEffect, useMemo, useState} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from '../core/QueryResponseProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {ListPagination} from '../components/pagination/ListPagination'
import {KTCardBody} from '../../../../../_metronic/helpers'

type Props = {
  columnList: any,
};

const DynamicTable = ({columnList}:Props) => {
  const dataList = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => dataList, [dataList]);
  const columns = useMemo(()=>columnList, []);
  const [rowList, setRoles] = useState([]) as any;

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({columns, data});
  useEffect(()=>{
    setRoles(rows);
  }, [rows]);

  return (
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table id='kt_table_users'
                 className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                 {...getTableProps()}>
            <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<any>) => (
                  <CustomHeaderColumn key={column.id} column={column}/>
              ))}
            </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rowList.length > 0 ? (
                rowList.map((row: Row<any>, i:any) => {
                  prepareRow(row);
                  return <CustomRow row={row} key={`row-${i}-${row.id}`}/>
                })
            ) : (
                <tr style={{height:'60vh'}}>
                  <td colSpan={columnList.length}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No matching records found
                    </div>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
        <ListPagination/>
        {isLoading && <ListLoading/>}
      </KTCardBody>
  )
};

export {DynamicTable}
