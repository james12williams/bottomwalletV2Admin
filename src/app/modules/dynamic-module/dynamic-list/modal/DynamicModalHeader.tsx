import {useListView} from '../core/ListViewProvider'
import {KTSVG} from "../../../../../_metronic/helpers";

type Props = {
    title:string,
    handleClose?:()=>void,
}

const DynamicModalHeader = ({title, handleClose}:Props) => {
  const {setItemIdForUpdate} = useListView();

  if (!handleClose){
      handleClose = () =>{
          setItemIdForUpdate(undefined);
      }
  }

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder text-capitalize' dangerouslySetInnerHTML={{__html: title}} />
      {/* end::Modal title */}

      {/* begin::Close */}
      <div className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={handleClose}
        style={{cursor: 'pointer'}}>
        <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
};

export {DynamicModalHeader}
