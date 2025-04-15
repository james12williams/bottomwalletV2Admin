import React, {useState} from "react";
import clsx from "clsx";
import ReactQuill from "react-quill";

type Props = {
    field:any,
    value?:string,
    error?:any,
}

const QuillField = ({field, value, error }:Props) => {
    const toolbar = [
        [{
            header: [1, 2, 3, 4, 5, 6, false]
        }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],  //'blockquote', 'code-block'
        ['link', 'image', 'video', 'formula'], // 'link', 'image', 'video', 'formula'
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    ];
    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}

        <div data-control="quill" data-name={field.name} data-kt-toolbar={JSON.stringify(toolbar)} className="min-h-200px mb-2" dangerouslySetInnerHTML={{__html:field.value}}></div>

        {error && (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                    <span role='alert'>{error}</span>
                </div>
            </div>
        )}

        {/* begin::Hint */}
        {field.hint && <div className='form-text' dangerouslySetInnerHTML={{ __html: field.hint }} />}
        {/* end::Hint */}

    </div>
};

export {QuillField};