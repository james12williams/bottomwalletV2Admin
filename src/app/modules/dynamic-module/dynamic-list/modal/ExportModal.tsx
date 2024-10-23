import React, {useEffect, useState} from 'react'
import {ListLoading} from "../components/loading/ListLoading";
import {getItems, useQueryResponseXPanel} from "../core/QueryResponseProvider";
import {useListView} from "../core/ListViewProvider";
import {forceDownload, KTSVG} from "../../../../../_metronic/helpers";
import {MenuComponent} from "../../../../../_metronic/assets/ts/components";

type Props = {
    queryName:any
}

const ExportModal = ({queryName}:Props) => {
    const xPanel = useQueryResponseXPanel();
    const [filters, setFilters] = useState(xPanel.filters);
    const [isLoading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        format:'excel'
    });
    const {setExportItem} = useListView();

    useEffect(()=>{
        if (xPanel.filters.length){
            setFilters(xPanel.filters);
        }else{
            setFilters([]);
        }
        MenuComponent.reinitialization()
    },[isLoading, xPanel]);

    const handleFormChange = (e:any) =>{
        const { name, value } = e.target;
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
        getItems(xPanel.route+'/export', inputValue).then((resp:any)=>{
            forceDownload(resp);
            setExportItem(false)
            setLoading(false);
        }, (resp:any)=>{
            setLoading(false);
        })
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
                            <h2 className='fw-bolder text-capitalize' dangerouslySetInnerHTML={{__html: "Export " + xPanel.title }} />
                            {/* end::Modal title */}

                            {/* begin::Close */}
                            <div className='btn btn-icon btn-sm btn-active-icon-primary'
                                 data-kt-users-modal-action='close'
                                 onClick={() => setExportItem(false)}
                                 style={{cursor: 'pointer'}}>
                                <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                            {/* end::Close */}
                        </div>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            {/*begin::Form*/}
                            <form id="kt_modal_export_users_form" className="form"
                                  action="#">

                                {/*{*/}
                                {/*    filters.map((filter: any, i:any) => {*/}
                                {/*        return <CustomFilter filter={filter}*/}
                                {/*                             key={`filter-${i}-${filter.id}`}*/}
                                {/*                             onChange={handleFormChange} />*/}
                                {/*    })*/}
                                {/*}*/}

                                {/*begin::Input group*/}
                                <div className="fv-row mb-10">
                                    {/*begin::Label*/}
                                    <label
                                        className="required fs-6 fw-semibold form-label mb-2">Select
                                        Export Format:</label>
                                    {/*end::Label*/}

                                    {/*begin::Input*/}
                                    <select name="format" data-control="select2"
                                            onChange={handleFormChange}
                                            data-placeholder="Select a format"
                                            data-hide-search="true"
                                            className="form-select form-select-solid fw-bold">
                                        <option value="excel">Excel</option>
                                        {/*<option value="pdf">PDF</option>*/}
                                        {/*<option value="cvs">CVS</option>*/}
                                        {/*<option value="zip">ZIP</option>*/}
                                    </select>
                                    {/*end::Input*/}
                                </div>
                                {/*end::Input group*/}

                                {/*begin::Actions*/}
                                <div className="text-center">
                                    <button type="reset" className="btn btn-light me-3"
                                            onClick={() => setExportItem(false)}
                                            data-kt-users-modal-action="cancel">
                                        Discard
                                    </button>

                                    <button type="button"
                                            onClick={exportData} className="btn btn-primary"
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

export {ExportModal}
