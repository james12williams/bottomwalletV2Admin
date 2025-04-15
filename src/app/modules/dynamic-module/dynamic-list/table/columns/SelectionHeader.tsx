import React, {FC, PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
import {useListView} from '../../core/ListViewProvider'

type Props = {
    column?: any
    xPanel?: any
    tableProps: PropsWithChildren<HeaderProps<any>>
}

const SelectionHeader: FC<Props> = ({column, tableProps, xPanel}) => {
    const {isAllSelected, onSelectAll} = useListView();
    return (
        <th className='w-10px pe-2'>
            {xPanel.has_bulk_action_buttons ? <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                <input className='form-check-input' type='checkbox'
                        data-kt-check={isAllSelected}
                        data-kt-check-target='.formcheckinput'
                        checked={isAllSelected}
                        onChange={onSelectAll}/>
            </div>: '#'}
        </th>
    )
};

export {SelectionHeader}
