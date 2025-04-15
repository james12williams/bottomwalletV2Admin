import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error:any,
}

const SummernoteField = ({field, error }:Props) => {
    const [textValue2, setTextValue2] = useState(field.value) as any;
    const editorRef = useRef(null);
    const onChange2 = (e:any, editor:any)=> {
        if (editor.targetElm.nodeName=='INPUT'){
            editor.targetElm.value = e;
        }
        else if (editor.targetElm.nodeName=='TEXTAREA'){
            editor.targetElm.innerHTML = e;
        }
    };
    const onInit = (e:any, editor:any)=> {
        editorRef.current = editor
    };

    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <Editor apiKey={import.meta.env.VITE_APP_TINYMCEKEY}
            onInit={onInit as any}
            initialValue={textValue2}
            id={field.name}
            init={{
                branding: false,
                height: 400,
                menubar: true,
                plugins: "code preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern ",
                toolbar: "code formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                image_advtab: true,
                advcode_inline: true,
                image_uploadtab: true
            }}
            textareaName={field.name}
            onEditorChange={onChange2 as any}
        />

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

export {SummernoteField};
