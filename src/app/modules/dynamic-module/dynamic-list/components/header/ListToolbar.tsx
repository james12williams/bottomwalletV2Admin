import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {ListFilter} from './ListFilter'
import React, {useEffect, useState} from "react";
import {useQueryResponseLoading, useQueryResponseXPanel} from "../../core/QueryResponseProvider";
import {Link} from "react-router-dom";
import {ActionButton} from "../../../../../../partials/buttons/ActionButton";
import {CustomLinkButton} from "../buttons/CustomLinkButton";
import {CustomButton} from "../buttons/CustomButton";

type Props = {
  queryName?: string
}

const ListToolbar = ({queryName}:Props) => {
  const {setItemIdForUpdate, setExportItem, setItemIdForImport} = useListView();
  const xPanel = useQueryResponseXPanel();
  const loading = useQueryResponseLoading();
  const [isLoading, setLoader] = useState(loading);
  const openAddItemModal = () => {
    setItemIdForUpdate(null)
  };

  const openImportItemModal = () => {
    setItemIdForImport(true)
  };

  useEffect(()=>{
    setLoader(loading);
  }, [loading]);

  return (<>
        {!isLoading && <div className='d-flex' data-kt-user-table-toolbar='base'>
          {xPanel.filters?.length>0 && <ListFilter />}

          {/* begin::Export */}
          {xPanel.exportButtons && <button onClick={()=>setExportItem(true)} type='button' className='btn btn-light-primary me-3'>
            <KTSVG path='assets/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Export
          </button>}
          {/* end::Export */}

          {/* begin::Add item */}
          {xPanel.buttons.map((button: any, i:any) => {
            let value = "";
            if (button.stack === "top") {
              switch (button.name) {
                case 'reorder':
                  return xPanel.can_create && <Link key={button.name+'_'+i} to={'reorder'} className='btn btn-primary me-3'>
                      <KTSVG path='assets/media/icons/duotune/arrows/arr032.svg' className='svg-icon-2' />
                    Reorder  <span dangerouslySetInnerHTML={{__html:xPanel.entityName}} />
                    </Link>;
                case 'create':
                  return xPanel.can_create && <Link key={button.name+'_'+i} to={'create'} className='btn btn-primary me-3'>
                      <KTSVG path='assets/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                      Add  <span dangerouslySetInnerHTML={{__html:xPanel.entityName}} />
                    </Link>;
                case 'quick_create':
                  return xPanel.can_create && <button key={button.name+'_'+i} type='button' className='btn btn-info me-3' onClick={openAddItemModal}>
                    <KTSVG path='assets/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                    Quick Add <span dangerouslySetInnerHTML={{__html:xPanel.entityName}} />
                  </button>;
                case 'html_link_text':
                case 'link':
                  return <CustomLinkButton button={button} key={button.name + '_' + i}/>;
                case 'parent':
                case 'bulk_delete_btn':
                case 'bulk_action_btn':
                case 'revisions':
                  return null;
                default:
                  if (button.values) {
                    switch (button.values.type) {
                      case 'action':
                        return <ActionButton endpoint={button.values.endpoint}
                                             label={button.values.label}
                                             iconPath={button.values.iconPath}
                                             className={button.values.className}
                                             title={button.values.title}
                                             key={button.name}  queryName={queryName}/>;
                      case 'excel_import':
                        return <button key={button.name+'_'+i} type='button' className='btn btn-primary me-3' onClick={openImportItemModal}>
                          <KTSVG path='assets/media/icons/duotune/files/fil022.svg' className='svg-icon-2' />
                          Import <span dangerouslySetInnerHTML={{__html:xPanel.entityName}} />
                        </button>;
                      case 'html_link_text':
                      case 'link':
                        return <CustomLinkButton button={button} key={button.name}/>;
                      default:
                        return <CustomButton button={button} key={button.name} queryName={queryName}/>;
                    }
                  }
                  break;

              }
            }
            return value;
          })}
          {/*<ActionButton endpoint={button.endpoint}*/}
          {/*                     label={button.label}*/}
          {/*                     iconPath={button.iconPath}*/}
          {/*                     className={button.className}*/}
          {/*                     title={button.title}*/}
          {/*                     key={button.name}/>;*/}

          {/* end::Add item */}
        </div>
        }
      </>
  )
};

export {ListToolbar}
