import React, {FC} from 'react'

type Props = {
  value?: any
}

const TableCell: FC<Props> =  ({value}) => {
  return (<div dangerouslySetInnerHTML={{ __html: value }} />)
};

export {TableCell}
