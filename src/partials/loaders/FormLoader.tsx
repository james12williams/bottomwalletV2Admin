/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton.tsx";
import {ListLoading} from "../../app/modules/dynamic-module/dynamic-list/components/loading/ListLoading.tsx";

type Props = {
  isModal?:boolean
}

const FormLoader: React.FC<Props> = ({isModal=false}) => {
  return (
      <>
        {/*begin::Form*/}
        <div className={!isModal?"d-flex flex-column flex-lg-row position-relative gap-7":'d-flex flex-column gap-7 gap-lg-10 position-relative'}>
          {/*begin::Aside column*/}
          <div className="d-flex flex-column gap-7 gap-lg-10">
            {/*begin::Thumbnail settings*/}
            <div className="card card-flush py-4">
              {/*begin::Card header*/}
              <div className="card-header justify-content-center">
                {/*begin::Card title*/}
                <div className="card-title">
                  <h2><CustomSkeleton height={30} width={250} /></h2>
                </div>
                {/*end::Card title*/}
              </div>
              {/*end::Card header*/}
              {/*begin::Card body*/}
              <div className="card-body text-center pt-0">
                {/*begin::Image input*/}

                {/*begin::Image input placeholder*/}
                <style dangerouslySetInnerHTML={{__html:'.image-input-placeholder { background-image: url(\'assets/media/svg/files/blank-image.svg\'); } [data-bs-theme="dark"] .image-input-placeholder { background-image: url(\'assets/media/svg/files/blank-image-dark.svg\'); }'}}></style>
                {/*end::Image input placeholder*/}
                <div className="image-input image-input-empty image-input-outline image-input-placeholder mb-3" data-kt-image-input="true">
                  <CustomSkeleton height={150} width={150} />
                </div>
                {/*end::Image input*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7">
                  <CustomSkeleton height={15} width={250} />
                  <CustomSkeleton height={15} width={200} />
                  <CustomSkeleton height={15} width={150} />
                </div>
                {/*end::Description*/}


              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Thumbnail settings*/}
            {/*begin::Status*/}
            <div className="card card-flush py-4">
              {/*begin::Card header*/}
              <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title">
                  <h2><CustomSkeleton height={30} width={200} /></h2>
                </div>
                {/*end::Card title*/}
                {/*begin::Card toolbar*/}
                <div className="card-toolbar">
                  <div className="rounded-circle w-15px h-15px">
                    <CustomSkeleton circle={true} height={15} width={15} />
                  </div>
                </div>
                {/*begin::Card toolbar*/}
              </div>
              {/*end::Card header*/}
              {/*begin::Card body*/}
              <div className="card-body pt-0">
                {/*begin::Select2*/}
                <CustomSkeleton className="form-control mb-2" height={40} />
                {/*end::Select2*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7"><CustomSkeleton height={15} /></div>
                {/*end::Description*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Status*/}
          </div>
          {/*end::Aside column*/}
          {/*begin::Main column*/}
          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div className="d-flex flex-column gap-7 gap-lg-10">
              {/*begin::Inventory*/}
              <div className="card card-flush py-4">
                {/*begin::Card header*/}
                <div className="card-header">
                  <div className="card-title">
                    <h2><CustomSkeleton height={30} width={200} /></h2>
                  </div>
                </div>
                {/*end::Card header*/}
                {/*begin::Card body*/}
                <div className="card-body pt-0">
                  {/*begin::Input group*/}
                  <div className="mb-10 fv-row">
                    {/*begin::Input*/}
                    <CustomSkeleton height={40} className="form-control mb-2" />
                    {/*end::Input*/}
                    {/*begin::Description*/}
                    <div className="text-muted fs-7">
                      <CustomSkeleton height={15} className="form-control mb-2" />
                    </div>
                    {/*end::Description*/}
                  </div>
                  {/*end::Input group*/}
                  {/*begin::Input group*/}
                  <div className="mb-10 fv-row">
                    {/*begin::Label*/}
                    <label className="form-label"><CustomSkeleton height={25} width={200} /></label>
                    {/*end::Label*/}
                    {/*begin::Input*/}
                    <CustomSkeleton height={40} className="form-control mb-2" />
                    {/*end::Input*/}
                    {/*begin::Description*/}
                    <div className="text-muted fs-7">
                      <CustomSkeleton height={15} className="form-control mb-2" />
                    </div>
                    {/*end::Description*/}
                  </div>
                  {/*end::Input group*/}
                  {/*begin::Input group*/}
                  <div className="mb-10 fv-row">
                    {/*begin::Label*/}
                    <label className="form-label"><CustomSkeleton height={25} width={200} /></label>
                    {/*end::Label*/}
                    {/*begin::Input*/}
                    <div className="d-flex gap-3">
                      <div className='col-sm-6'><CustomSkeleton height={40} className="form-control mb-2" /></div>
                      <div className='col-sm-6'><CustomSkeleton height={40} className="form-control mb-2" /></div>
                    </div>
                    {/*end::Input*/}
                    {/*begin::Description*/}
                    <div className="text-muted fs-7"><CustomSkeleton height={15} style={{flex:'1'}} className="form-control" /></div>
                    {/*end::Description*/}
                  </div>
                  {/*end::Input group*/}
                </div>
                {/*end::Card header*/}
              </div>
              {/*end::Inventory*/}

              {/*begin::Shipping*/}
              <div className="card card-flush py-4">
                {/*begin::Card header*/}
                <div className="card-header">
                  <div className="card-title">
                    <h2><CustomSkeleton height={30} width={200} /></h2>
                  </div>
                </div>
                {/*end::Card header*/}
                {/*begin::Card body*/}
                <div className="card-body pt-0">
                  {/*begin::Input group*/}
                  <div className="fv-row">
                    {/*begin::Input*/}
                    <div className="mb-2">
                      <CustomSkeleton height={15} className="form-control" />
                    </div>
                    {/*end::Input*/}
                    {/*begin::Description*/}
                    <div className="text-muted fs-7"><CustomSkeleton height={15} className="form-control" /></div>
                    {/*end::Description*/}
                  </div>
                  {/*end::Input group*/}
                </div>
                {/*end::Card header*/}
              </div>
              {/*end::Shipping*/}
            </div>
            {/*end::Tab content*/}
            <div className="d-flex justify-content-end">
              {/*begin::Button*/}
              <CustomSkeleton height={40} width={150} className="btn me-5" />
              <CustomSkeleton height={40} width={150} className="btn me-5" />
              {/*end::Button*/}
            </div>
          </div>
          {/**/}
          {/*end::Main column*/}
          <ListLoading />
        </div>
        {/*end::Form*/}
    </>
  )
}

export {FormLoader}
