import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'

type Props = {
  row: Row<any>
}

const CustomRow: FC<Props> = ({row}) => (
  <tr>
    {row.cells.map((cell, key:any) => {
      return (<td key={cell.column.id}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}>
          {cell.render('Cell')}
      </td>)
    })}
  </tr>
)

export {CustomRow}
