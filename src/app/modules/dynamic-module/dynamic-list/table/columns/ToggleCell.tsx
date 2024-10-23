/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {AxiosService} from "../../../../../servicies/axios-service";
import {MyTooltip} from "../../components/buttons/MyTooltip";
import {ActionButton} from "../../../../../../partials/buttons/ActionButton";

type Props = {
    value: any
}

const ToggleCell: FC<Props> = ({value}) => {
    const [loading, setLoading] = useState(false);
    const [fieldValue, setFieldValue] = useState(value?.value==true);

    const onToggle = function () {
        AxiosService.postRequest('ajax/'+value.table+'/'+value.field, value)
            .then((resp:any)=>{

                setFieldValue(resp.result.fieldValue==true);

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

    return (<>{value &&
                <div className="form-check form-check-solid form-switch form-check-custom fv-row justify-content-center">
                    <MyTooltip content={'Toggle '+(fieldValue?'Off': 'On')} placement={'top'}>
                        <div className='d-flex align-self-center'>
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
                    </div>
            </MyTooltip>
                    {
                        (value && value.field=='verified_email' && !fieldValue) && <ActionButton endpoint={'users/' + value.id +'/verify/resend/email'}
                                                                                                 label=""
                                                                                                 iconPath="/assets/media/icons/duotune/arrows/arr029.svg"
                                                                                                 className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                                                                                                 title='Send Email Verify Code'
                                                                                                 queryName='verify_email' />
                    }
                    {
                        (value && value.field=='verified_phone' && !fieldValue) && <ActionButton endpoint={'users/' + value.id +'/verify/resend/sms'}
                                                                                                 label=""
                                                                                                 iconPath="/assets/media/icons/duotune/arrows/arr029.svg"
                                                                                                 className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                                                                                                 title='Send SMS Verify Code'
                                                                                                 queryName='verify_sms' />
                    }
                </div>}
        </>
    )
};

export {ToggleCell}
