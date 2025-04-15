import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {toAbsoluteUrl, getBase64} from "../../../../../../_metronic/helpers";
import {useThemeMode} from "../../../../../../_metronic/partials";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const ImageField = ({field, onChange, value, touched, error }:Props) => {
    let [blankImg, setBlankImg] = useState(toAbsoluteUrl('/blank.svg')) as any;
    let [valImg, setValImg] = useState(null) as any;
    const widthVal = (field.width>0? (field.width+'px'): '125px');
    const heightVal = (field.height>0? field.height+'px': '125px');
    const {mode} = useThemeMode()

    const onChangeFile = (e:any) =>{
        if (e.target?.files){
            getBase64(e.target?.files[0], (result:string) => {
                setValImg(result);
            });
        }
        onChange(e)
    };
    const removeImg = () =>{
        setValImg("")
        let element = document.getElementById(field.name+'_'+field.name) as any;
        if (element){
            element.value = null
        }
    };

    useEffect(() => {
        if (mode=='dark'){
            blankImg = toAbsoluteUrl('/blank-dark.svg');
        }else{
            blankImg = toAbsoluteUrl('/blank.svg');
        }
        setBlankImg(blankImg)
    }, [mode]);

    useEffect(() => {
        if (field.value_url && !field.value_url.endsWith("blank.svg")) {
            setValImg(field.value_url)
        }
    }, [field.value_url]);

    return <div className={'px-6'} {...field.wrapperAttributes} style={{display:'block'}}>
        {field.label && <label className={clsx('d-block fw-bold fs-6 mb-5', {'required': field.is_required})}>{field.label}:</label>}

        <div className={'image-input image-input-outline image-input-placeholder mb-3 '+(valImg?"":"image-input-empty")}
            data-kt-image-input='true'
            style={{backgroundImage: `url('${blankImg}')`, backgroundPosition:'center', padding:'1rem',}}>
            {/* begin::Preview existing avatar */}
            <a href={valImg} target={'_blank'}><div className={'image-input-wrapper w-125px h-125px bgi-position-center '+widthVal+' '+heightVal} style={{ backgroundImage: `url('${valImg}')` }}/></a>
            {/* end::Preview existing avatar */}

            {/* begin::Label */}
            <label className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip' title={'Change '+(field.label?field.label:field.name)}>
                <i className='bi bi-pencil-fill fs-7' />
                <input type='file' name={field.name} id={field.name+'_'+field.name}
                       {...field.attributes}
                       onChange={onChangeFile}
                       accept='.png, .jpg, .jpeg' />
                <input type="hidden" name={field.name+'_remove'} />
            </label>
            {/* end::Label */}

            {/* begin::Cancel */}
            <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='cancel'
                data-bs-toggle='tooltip'
                title={'Cancel '+(field.label?field.label:field.name)}>
              <i className="ki-duotone ki-cross fs-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
              </i>
            </span>
            {/* end::Cancel */}

            {/* begin::Remove */}
            <span className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='remove'
                onClick={removeImg}
                data-bs-toggle='tooltip'
                title={'Remove '+(field.label?field.label:field.name)}>
              <i className="ki-duotone ki-cross fs-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
              </i>
            </span>
            {/* end::Remove */}
        </div>

        {touched && error && (
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

export {ImageField};
