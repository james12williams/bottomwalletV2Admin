import React, {FC, useEffect, useState} from 'react'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {ListLoading} from '../loading/ListLoading'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {CustomFields} from "../fields/CustomFields";
import {AxiosService} from "../../../../../servicies/axios-service";
import {ButtonGroup, SplitButton, Dropdown} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {AppSpinner} from "../../../../../../partials/content/AppSpinner";
import {ScrollTopComponent} from "../../../../../../_metronic/assets/ts/components";
import {FieldGroup} from "../fields/FieldGroup.tsx";

type Props = {
  externalForm?: boolean
  isUserLoading: boolean
  saveOnly?: boolean
  isModal?: boolean
  submitting?: boolean
  actionTitle?: string
  data: any,
  errorList?: any,
  isDone?:()=>void,
  handleSubmit?:(e:any)=>void,
  handleClose?:()=>void,
}

const DynamicForm: FC<Props> = ({externalForm=false, data, isUserLoading,submitting=false, saveOnly=false, isDone, actionTitle="Save", errorList={}, handleSubmit, handleClose, isModal=false}:Props) => {
  const {setItemIdForUpdate} = useListView();
  const [formFields, setFormFields] = useState([]);
  const [formFieldGroups, setFormFieldGroups] = useState([]);
  const [isSubmitting, setSubmitting] = useState(submitting);
  const [errors, setErrors] = useState(errorList) as any;
  const [saveAction, setSaveAction] = useState({}) as any;
  const [saveActionOptions, setSaveActionOptions] = useState([]) as any;
  const {refetch} = useQueryResponse();
  const navigate = useNavigate();

  const processSaveActionOptions = () =>{
    if (data.saveAction){
      setSaveAction(data.saveAction.active);
      data.saveAction.options = Object.keys(data.saveAction.options).map((key:any)=>{
        if (data.saveAction.options[key].value){
          return data.saveAction.options[key];
        }else{
          return {value:key, label: data.saveAction.options[key]};
        }
      });
      setSaveActionOptions(data.saveAction.options)
    }
  };

  const processFormFields = () =>{
    let formField = [] as any;
    if (data.fields){
      formField = Object.keys(data.fields).map((key:any) => (data.fields[key]));
    }
    setFormFields(formField);
    let formFieldGroup = [] as any;
    if (data.field_groups){
      formFieldGroup = Object.keys(data.field_groups).map((key:any) => (data.field_groups[key]));
    }
    setFormFieldGroups(formFieldGroup);
  };

  useEffect(()=>{
    processSaveActionOptions();
    processFormFields()
  }, [data.fields]);

  let appRoute = import.meta.env.VITE_APP_PUBLIC_URL+(data.xPanel ? data.xPanel.appRoute.replaceAll(import.meta.env.VITE_APP_APP_URL, ''):"").replace(/^\//, '');
  const cancel = (withRefresh?: boolean) => {
    if (handleClose){
      handleClose()
    }
    else {
      if (withRefresh) {
        refetch()
      }
      setItemIdForUpdate(undefined)
    }
  };
  if (!handleSubmit){
    handleSubmit = (e:any)=>{
      e.preventDefault();
      const inputValue2 = AxiosService.serialize(e.target, data);
      let url = "";
      if (data.id){
        url = '/'+data.id;
      }

      setSubmitting(true);
      setErrors({});

      AxiosService.postRequest(data.xPanel.route+url, inputValue2).then(
          function (resp:any) {
            AxiosService.notify('success', resp?.message);
            setSubmitting(false);
            if (!saveOnly) {
              if (saveAction.value === 'save_and_edit') {
                navigate(appRoute + '/' + resp.result.entry.id + '/edit');
              } else if (saveAction.value === 'save_and_new') {
                e.target.reset();
                navigate(appRoute + '/create');
              } else {
                if (!isModal) {
                  navigate(-1);
                }
                cancel(true);
              }
            }else if (isDone) {
              isDone();
            }else{
              refetch();
            }
            ScrollTopComponent.goTop();
          },
          function (resp:any) {
            if (resp?.data?.errors){
              setErrors(resp?.data?.errors)
            }
            AxiosService.notify('error', resp?.data?.message);
            setSubmitting(false);
          }
      )
    };
  }

  const handleAction = (option:any) =>{
    if (option){

      let options:any = [saveAction];

      saveActionOptions.forEach((optionB:any)=>{
        if (optionB.value !== option.value){
          options.push(optionB);
        }
      });

      setTimeout(()=>{
        setSaveAction(option);
        setSaveActionOptions(options);
      }, 100);
    }
  };

  const handleSetErrors = (errorList:any) =>{
    setErrors(errorList)
  };

  const handleSetSubmitting = (submitting:any) =>{
    setSubmitting(submitting)
  };

  useEffect(()=>{
    if (externalForm){
      handleSetErrors(errorList);
      handleSetSubmitting(submitting)
    }
  }, [externalForm,errorList,submitting]);

  if (isNotEmpty(errors)){
    const temErrors = Object.keys(errors);
    const input = document.getElementsByName(temErrors[0]);
    if (input.length > 0){
      input[0].focus();
    }
  }

  return (
      <>
        <form id='kt_modal_add_user_form' className='form' onSubmit={handleSubmit} noValidate>
          {/* begin::Scroll */}
          <div className='d-flex flex-column scroll-y me-n7 pe-7'
               id='kt_modal_add_user_scroll'
               data-kt-scroll={isModal?'true':'false'}
               data-kt-scroll-max-height='auto'
               data-kt-scroll-dependencies='#kt_modal_add_user_header'
               data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
               data-kt-scroll-offset='300px'>
            {formFieldGroups.length? <div className={!isModal?"d-flex flex-column flex-lg-row":'d-flex flex-column gap-7 gap-lg-10'}>
              {formFieldGroups.map((formGroup: any, i: any) => {
                return <FieldGroup group={formGroup} isModal={isModal} key={formGroup.name + '_' + i}/>
              })}
            </div>: ""}
            {formFields.length ? <div className="row">
              {formFields.map((formField: any, i: any) => {
                return <CustomFields field={formField}
                                     errors={errors[formField.name]}
                                     key={formField.name + '_' + i}/>
              })}
            </div>: ''}
          </div>
          {/* end::Scroll */}

          {/* begin::Actions */}
          <div className={'text-center pt-15 '+(!isModal?'pb-15':'')}>
            {(!isSubmitting && !isUserLoading && saveAction.label && !saveOnly) && <SplitButton
                as={ButtonGroup}
                type='submit'
                variant="primary"
                title={saveAction.label}
                data-kt-users-modal-action='submit'>
              {saveActionOptions.map((option:any)=>{
                return <Dropdown.Item  as="button"
                           type='button'
                           onClick={()=>handleAction(option)}
                           eventKey={option.value}
                           key={option.value}>
                  {option.label}
                </Dropdown.Item>
              })}
            </SplitButton>}

            {(!isSubmitting && !isUserLoading && saveAction.label && saveOnly) && <button type='submit' className='btn btn-primary btn-block'>
              {actionTitle}
            </button>}

            {((isSubmitting || isUserLoading) && saveAction.label) && (
                <button disabled={!isSubmitting && !isUserLoading} type='button' className='btn btn-primary btn-block'>
                  <AppSpinner as="span" size="sm" role="status" aria-hidden="true"/>
                  Loading...
                </button>
            )}
          </div>
          {/* end::Actions */}
        </form>
        {(isSubmitting || isUserLoading) && <ListLoading />}
      </>
  )
};

export {DynamicForm}
