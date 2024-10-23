import React, {FC, useMemo} from 'react'
import {ID} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

type Props = {
    value: ID
    id: ID
}

const SelectionCell: FC<Props> = ({value,id}) => {
  const {selected, onSelect} = useListView();
  const isSelected = useMemo(() => selected.includes(id), [id, selected]);
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      <input className='form-check-input formcheckinput'
        type='checkbox'
        checked={isSelected}
        onChange={() => onSelect(value)}
      />
    </div>
  )
};

export {SelectionCell}
