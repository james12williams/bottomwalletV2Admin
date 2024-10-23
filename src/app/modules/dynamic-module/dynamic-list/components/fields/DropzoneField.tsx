import React, {useEffect, useState} from "react";
import clsx from "clsx";
import Dropzone from "react-dropzone";

type Props = {
    field:any,
    onChange:any,
    value:string,
    error:any,
}

const DropzoneField = ({field, onChange, value, error }:Props) => {

    const [mainValue, setValue] = useState([]);

    const onDrop = (files:any) => {
        let temp = [] as any;
        for (let i:any=0; i<mainValue.length; i++){
            temp.push(mainValue[i]);
        }
        for (let i:any=0; i<files.length; i++){
            temp.push(files[i]);
        }
        setValue(temp)
    };

    const removeFile = (fileIndex:any) =>{
        const updatedList = mainValue.filter((file:any, index:number) => index !== fileIndex);
        setValue(updatedList)
        return undefined;
    }

    useEffect(() => {
        onChange(field.name, mainValue);
    }, [mainValue, value]);

    const files = mainValue.map((file:any, index:number) => (
        <div key={file.name} className="dropzone-item">
            {/*begin::Dropzone filename*/}
            <div className="dropzone-file">
                <div className="dropzone-filename" title={file.name}>
                    <span data-dz-name="">{file.name}</span> <strong>(<span data-dz-size="">{file.size}kb</span>)</strong>
                </div>
                <div className="dropzone-error" data-dz-errormessage=""></div>
            </div>
            {/*end::Dropzone filename*/}

            {/*begin::Dropzone progress*/}
            <div className="dropzone-progress">
                <div className="progress">
                    <div className="progress-bar bg-primary" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={15} data-dz-uploadprogress=""></div>
                </div>
            </div>
            {/*end::Dropzone progress*/}

            {/*begin::Dropzone toolbar*/}
            <div className="dropzone-toolbar" onClick={()=>removeFile(index)}>
                <span className="dropzone-delete">
                    <i className="bi bi-x fs-1"></i>
                </span>
            </div>
            {/*end::Dropzone toolbar*/}
        </div>
    ));

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bolder', {'required': field.is_required})}>{field.label}:</label>}

        <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
                <section className="dropzone dropzone-queue">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input type='files'
                               name={field.name}
                               {...field.attributes}
                               {...getInputProps()}/>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <div className="dropzone-items">
                        {files}
                    </div>
                </section>
            )}
        </Dropzone>

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

export {DropzoneField};