import React, {useEffect, useState} from 'react'
import {ListLoading} from "../components/loading/ListLoading";
import {getItems, useQueryResponseXPanel} from "../core/QueryResponseProvider";
import {useListView} from "../core/ListViewProvider";
import {MenuComponent} from "../../../../../_metronic/assets/ts/components";
import {sendData} from "../../../../../layouts/core/QueryResponseProvider";
import {forceDownload, getBase64, KTSVG, toAbsoluteUrl} from "../../../../../_metronic/helpers";
import {AxiosService} from "../../../../servicies/axios-service.tsx";
import * as Yup from "yup";

type Props = {
    queryName:any
}
const ImportModal = ({queryName}:Props) => {
    const blankImg = toAbsoluteUrl('assets/media/svg/files/doc.svg');
    let [valImg, setValImg] = useState(blankImg) as any;
    const [errors, setErrors] = useState({}) as any;
    const xPanel = useQueryResponseXPanel();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        format:'excel'
    });
    const {setItemIdForImport} = useListView();

    useEffect(()=>{
        MenuComponent.reinitialization()
    },[isLoading]);

    const handleFormChange = (e:any) =>{
        const { name, value } = e.target;
        if (e.target?.files){
            getBase64(e.target?.files[0], (result:string) => {
                setValImg(result);
            });
        }
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, []);

    const exportData = () => {
        setLoading(true);
        getItems(xPanel.route+'/import-sample', inputValue).then((resp:any)=>{
            forceDownload(resp);
            setLoading(false);
        }, (resp:any)=>{
            setLoading(false);
        })
    };

    const importData = (e:any) => {
        e.preventDefault();
        const inputValue2 = AxiosService.serialize(e.target, inputValue);
        setLoading(true);
        sendData(xPanel.route+'/import', inputValue2)
        .then((resp:any)=>{
            setLoading(false);
            setItemIdForImport(false);
        }, (resp:any)=>{
            if (resp?.data?.errors){
                setErrors(resp?.data?.errors)
            }
            AxiosService.notify('error', resp?.data?.message);
            setLoading(false);
        })
    };

    const removeImg = () =>{
        setValImg(blankImg)
        let element = document.getElementById('import_file') as any;
        if (element){
            element.value = null
        }
    };

    return (<>
            <div className='modal fade show d-block'
                 id='kt_modal_add_user'
                 role='dialog'
                 tabIndex={-1}
                 aria-modal='true'>
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className='modal-header'>
                            {/* begin::Modal title */}
                            <h2 className='fw-bolder text-capitalize' dangerouslySetInnerHTML={{__html: "Import " + xPanel.title }} />
                            {/* end::Modal title */}

                            {/* begin::Close */}
                            <div className='btn btn-icon btn-sm btn-active-icon-primary'
                                 data-kt-users-modal-action='close'
                                 onClick={() => setItemIdForImport(false)}
                                 style={{cursor: 'pointer'}}>
                                <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                            {/* end::Close */}
                        </div>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            {/*begin::Form*/}
                            <form id="kt_modal_export_users_form" className="form"
                                  onSubmit={importData} action="#">

                                {/*begin::Input group*/}
                                <div className="fv-row mb-5">
                                    {/*begin::Label*/}
                                    <label
                                        className="required fs-6 fw-semibold form-label mb-2">Select
                                        Import Format:</label>
                                    {/*end::Label*/}

                                    {/*begin::Input*/}
                                    <select name="format" data-control="select2"
                                            onChange={handleFormChange}
                                            data-placeholder="Select a format"
                                            data-hide-search="true"
                                            className="form-select fw-bold">
                                        <option value="excel">Excel</option>
                                        {/*<option value="pdf">PDF</option>*/}
                                        {/*<option value="cvs">CVS</option>*/}
                                        {/*<option value="zip">ZIP</option>*/}
                                    </select>
                                    {/*end::Input*/}
                                    {errors.format && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role='alert'>{errors.format}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/*end::Input group*/}

                                <div className="fv-row mb-5">
                                    <button type="button" onClick={exportData} className='btn link-primary fs-6 fw-bolder'>
                                        Download Sample Format!!!
                                    </button>
                                </div>

                                <div className="fv-row mb-10">
                                    <label className='d-block fw-bold fs-6 mb-5 required'>File:</label>

                                    <div className='image-input image-input-outline'
                                         data-kt-image-input='false'
                                         style={{ width:"100%!important", height:"200px!important", backgroundImage: 'url('+blankImg+')', backgroundPosition:'center', padding:'1rem'}}>
                                        {/* begin::Preview existing avatar */}
                                        <div className='image-input-wrapper bgi-position-center' style={{ backgroundImage: `url(${valImg})`, width:'100%!important', height:'100%!important' }}/>
                                        {/* end::Preview existing avatar */}

                                        {/* begin::Label */}
                                        <label className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                               data-kt-image-input-action='change'
                                               data-bs-toggle='tooltip' title='Change avatar'>
                                            <i className='bi bi-pencil-fill fs-7' />
                                            <input type='file' name="file" id="import_file" required={true} onChange={handleFormChange}/>
                                        </label>
                                        {/* end::Label */}

                                        {/* begin::Cancel */}
                                        <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                              data-kt-image-input-action='cancel'
                                              data-bs-toggle='tooltip'
                                              title='Cancel avatar'><i className='bi bi-x fs-2'/></span>
                                        {/* end::Cancel */}

                                        {/* begin::Remove */}
                                        <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                              data-kt-image-input-action='remove'
                                              onClick={removeImg}
                                              data-bs-toggle='tooltip'
                                              title='Remove avatar'>
                                          <i className='bi bi-x fs-2'/>
                                        </span>
                                        {/* end::Remove */}
                                    </div>
                                    {errors.file && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role='alert'>{errors.file}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* begin::Form group */}
                                <div className='fv-row mb-10'>
                                    <div className='form-check form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            id='accept_sample_download'
                                            name='accept_sample_download'
                                            required={true}
                                        />
                                        <label className='form-check-label fw-bold text-gray-700 fs-6'
                                            htmlFor='accept_sample_download'>
                                            Accept sample download
                                        </label>
                                        {errors.accept_sample_download && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>
                                                    <span role='alert'>{errors.accept_sample_download}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* end::Form group */}

                                {/*begin::Actions*/}
                                <div className="text-center">
                                    <button type="reset" className="btn btn-light me-3"
                                            onClick={() => setItemIdForImport(false)}
                                            data-kt-users-modal-action="cancel">
                                        Discard
                                    </button>

                                    <button type="submit" className="btn btn-primary"
                                            disabled={valImg==blankImg}
                                            data-kt-users-modal-action="submit">
                                        <span className="indicator-label">
                                            Submit
                                        </span>
                                        <span className="indicator-progress">
                                            Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                        </span>
                                    </button>
                                </div>
                                {/*end::Actions*/}
                            </form>
                            {/*end::Form*/}
                            {isLoading && <ListLoading />}
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show' />
            {/* end::Modal Backdrop */}
        </>)
};

export {ImportModal}
