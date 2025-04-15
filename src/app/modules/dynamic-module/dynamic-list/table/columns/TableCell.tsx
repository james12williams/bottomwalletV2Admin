import React, {FC} from 'react'
import {MyTooltip} from "../../components/buttons/MyTooltip";

type Props = {
  value?: any
}

const TableCell: FC<Props> =  ({value}) => {
  if (value.tooltip && value.value){
    return (
        <div className='symbol'>
          <MyTooltip content={value.tooltip} placement={'top'}>
            <div>
              <span dangerouslySetInnerHTML={{ __html: value?.value }} /> &nbsp;
            </div>
          </MyTooltip>
          {value?.external_link && <div className='position-absolute translate-middle bottom-0 start-100 mb-4 rounded-circle border border-4 border-white h-20px w-20px ms-4'>
            <a href={value.external_link} target='_blank'><i className="ki-duotone ki-exit-right-corner fs-2">
              <span className="path1" />
              <span className="path2" />
            </i></a>
          </div>
          }
        </div>
    )
  }
  else if (value?.value) {
    return (<div className='symbol'>
      <div dangerouslySetInnerHTML={{__html: value?.value}}/>
      {value?.external_link && <div className='position-absolute translate-middle bottom-0 start-100 mb-0 rounded-circle border border-4 border-white h-20px w-20px ms-4'>
        <a href={value.external_link} target='_blank'><i className="ki-duotone ki-exit-right-corner fs-2">
          <span className="path1" />
          <span className="path2" />
        </i></a>
      </div>
      }
    </div>)
  }
  return (<div dangerouslySetInnerHTML={{__html: value.value??value}}/>)
};

export {TableCell}
