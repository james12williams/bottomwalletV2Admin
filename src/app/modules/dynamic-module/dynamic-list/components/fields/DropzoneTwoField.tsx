import React, {useEffect, useState} from "react";

type Props = {
    field:any,
    value?:any,
    error?:any,
}

const DropzoneTwoField = ({field, value, error }:Props) => {

    return <div className="card card-flush py-4" {...field.wrapperAttributes}>
        {/*begin::Card header*/}
        {field.label && <div className="card-header">
            <div className="card-title">
                <h2>{field.label}</h2>
            </div>
        </div>}
        {/*end::Card header*/}

        {/*begin::Card body*/}
        <div className="card-body pt-0">
            {/*begin::Input group*/}
            <div className="fv-row mb-2">
                {/*begin::Dropzone*/}
                <div className="dropzone" data-control="dropzone">
                    {/*begin::Message*/}
                    <div className="dz-message needsclick">
                        {/*begin::Icon*/}
                        <i className="ki-duotone ki-file-up text-primary fs-3x">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                        {/*end::Icon*/}
                        {/*begin::Info*/}
                        <div className="ms-4">
                            <h3 className="fs-5 fw-bold text-gray-900 mb-1">Drop files here or click to upload.</h3>
                            <span className="fs-7 fw-semibold text-gray-500">Upload up to 10 files</span>
                        </div>
                        {/*end::Info*/}
                    </div>
                </div>
                {/*end::Dropzone*/}
            </div>
            {/*end::Input group*/}
            {/*begin::Description*/}
            {field.hint && <div className="text-muted fs-7" dangerouslySetInnerHTML={{ __html: field.hint }}></div>}
            {/*end::Description*/}
        </div>
        {/*end::Card body*/}

        {error && (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                    <span role='alert'>{error}</span>
                </div>
            </div>
        )}
    </div>
};

export {DropzoneTwoField};