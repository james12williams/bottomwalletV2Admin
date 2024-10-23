/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {AxiosService} from "../../../../../servicies/axios-service";

type Props = {
    value: any
}

const ResendMailCell: FC<Props> = ({value}) => {
    const [loading, setLoading] = useState(false);
    const [fieldValue, setFieldValue] = useState(value?.value);

    const onToggle = function () {
        AxiosService.postRequest('ajax/'+value.table+'/'+value.field, value)
            .then((resp:any)=>{

                setFieldValue(parseInt(resp.result.fieldValue));

                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            }, (resp) => {
                AxiosService.notify('error', resp?.data?.message);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            });
    };

    return (<>{value && <div className="form-check form-check-solid form-switch form-check-custom fv-row">
            <button onClick={onToggle}
                    disabled={loading}>
                send main
                {loading && (<span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2' />
                    </span>)}
            </button>
            <input className="form-check-input w-45px h-30px"
                   type="checkbox"
                   checked={fieldValue}
                   disabled={loading}
                   onChange={onToggle}
                   id={value.name}/>
            <label className="form-check-label" htmlFor={value.name}/>
            {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
            )}
        </div>}
        </>
    )
};

export {ResendMailCell}
