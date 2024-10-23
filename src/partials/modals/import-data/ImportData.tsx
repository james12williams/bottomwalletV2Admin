/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import {usePageData} from "../../../_metronic/layout/core";

const ImportData: FC = () => {
  const {setImportData, importFrom, setImportFrom} = usePageData();
  const [value, setInputValue] = useState({category:''});
  let tempVal = value as any;

  const onChange = (e:any) =>{
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startImport = () =>{
    setImportFrom(tempVal.category);
  };

  useEffect(()=>{
    // getIntegrators();
  }, []);

  switch (importFrom) {
    default:
      return (<>
            <div className='modal fade show d-block' id='kt_modal_create_schedule' role='dialog' tabIndex={-1} aria-modal='true'>
              <style dangerouslySetInnerHTML={{__html:'.stepper [data-kt-stepper-element=content].current, .stepper [data-kt-stepper-element=info].current {\n' +
                    '        display: flex;  min-height: 50vh;max-height: 60vh; overflow-x:scroll;}'}}>
              </style>
              <div className='modal-dialog modal-dialog-centered mw-900px'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h2>Import Data</h2>
                    <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={setImportData}>
                      <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                    </div>
                  </div>
                  <div className='modal-body py-lg-10 px-lg-10'>
                    <div className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
                         id='kt_modal_create_app_stepper'>
                      <div className='flex-row-fluid py-lg-5 px-lg-15'>
                        <div className='w-100'>
                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Category</span>
                              <i className='fas fa-exclamation-circle ms-2 fs-7' data-bs-toggle='tooltip' title='Select your app category' />
                            </label>

                            <div className='fv-row'>

                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-success'>
                                      <KTSVG path='assets/media/icons/duotune/general/gen013.svg'
                                             className='svg-icon-1 svg-icon-success' />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Excel</span>

                                    <span className='fs-7 text-muted'>
                                      Format and import your data using excel
                                    </span>
                                  </span>
                                </span>
                                    <span className='form-check form-check-custom form-check-solid'>
                                  <input className='form-check-input' type='radio' name='category'
                                         onChange={onChange} value='excel' />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className='d-flex flex-stack pt-10'>
                          <div className='me-2'>
                            <button type='button' className='btn btn-lg btn-light-primary me-3' data-kt-stepper-action='previous'>
                              <KTSVG path='assets/media/icons/duotune/arrows/arr063.svg' className='svg-icon-4 me-1' />
                              Back
                            </button>
                          </div>

                          <div>
                            <button type='button' onClick={startImport} className='btn btn-lg btn-primary me-3'>
                          <span className='indicator-label'>
                            Continue
                            <KTSVG path='assets/media/icons/duotune/arrows/arr064.svg' className='svg-icon-3 ms-2 me-0' />
                          </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show' />
            {/* end::Modal Backdrop */}
          </>)
  }

};

export {ImportData}
