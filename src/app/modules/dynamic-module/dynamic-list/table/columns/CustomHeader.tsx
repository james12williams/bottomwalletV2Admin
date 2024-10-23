import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from 'react-table'
import {initialQueryState} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'

type Props = {
  column?: any
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<any>>
}
const CustomHeader: FC<Props> = ({column, className, title, tableProps}) => {
  const id = tableProps.column.id;
  const orderable = column?.orderable;
  const {state, updateState} = useQueryRequest();

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === id
  }, [state, id]);
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state]);

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({sort: id, order: 'asc', ...initialQueryState})
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        updateState({sort: id, order: 'desc', ...initialQueryState})
        return
      }

      // disable sort
      updateState({sort: undefined, order: undefined, ...initialQueryState})
    }
  };

  if (orderable){
    return (
        <th
            {...tableProps.column.getHeaderProps()}
            className={clsx(
                className,
                isSelectedForSorting && order !== undefined && `table-sort-${order}`
            )}
            style={{cursor: 'pointer'}}
            onClick={sortColumn}
        >
          {title}
        </th>
    )
  }else{
    return (
        <th
            {...tableProps.column.getHeaderProps()}
            className={clsx(
                className,
                isSelectedForSorting && order !== undefined && `table-sort-${order}`
            )}
            style={{cursor: 'pointer'}}>
          {title}
        </th>
    )
  }
}

export {CustomHeader}
