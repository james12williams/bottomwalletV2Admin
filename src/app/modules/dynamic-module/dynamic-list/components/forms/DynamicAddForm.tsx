import React, {FC, useEffect, useState} from 'react'
import {QuillField} from "../fields/QuillField";
import {DatePickerField} from "../fields/DatePickerField.tsx";
import {DropzoneTwoField} from "../fields/DropzoneTwoField.tsx";
import {RangeField} from "../fields/RangeField.tsx";
import {RadioField} from "../fields/RadioField.tsx";
import {TextField} from "../fields/TextField.tsx";
import {NumberField} from "../fields/NumberField.tsx";
import {CustomFields} from "../fields/CustomFields.tsx";

const DynamicAddForm: FC = () => {
  const handelOnChange = (e:any) => {
    
  }

  const field= {
    label:'contents',
    name:'contents'
  }
  
  return (
      <>
        {/*begin::Form*/}
        <form id="kt_ecommerce_add_product_form" className="form d-flex flex-column flex-lg-row" data-kt-redirect="apps/ecommerce/catalog/products.html">
          {/*begin::Aside column*/}
          <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
            {/*begin::Thumbnail settings*/}
            <div className="card card-flush py-4">
              {/*begin::Card header*/}
              <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title">
                  <h2>Thumbnail</h2>
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
                  {/*begin::Preview existing avatar*/}
                  <div className="image-input-wrapper w-150px h-150px"></div>
                  {/*end::Preview existing avatar*/}
                  {/*begin::Label*/}
                  <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                    <i className="ki-duotone ki-pencil fs-7">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    {/*begin::Inputs*/}
                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                    <input type="hidden" name="avatar_remove" />
                    {/*end::Inputs*/}
                  </label>
                  {/*end::Label*/}
                  {/*begin::Cancel*/}
                  <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                      <i className="ki-duotone ki-cross fs-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                      </i>
                  </span>
                  {/*end::Cancel*/}
                  {/*begin::Remove*/}
                  <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                      <i className="ki-duotone ki-cross fs-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                      </i>
                  </span>
                  {/*end::Remove*/}
                </div>
                {/*end::Image input*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7">Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</div>
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
                  <h2>Status</h2>
                </div>
                {/*end::Card title*/}
                {/*begin::Card toolbar*/}
                <div className="card-toolbar">
                  <div className="rounded-circle bg-success w-15px h-15px" id="kt_ecommerce_add_product_status"></div>
                </div>
                {/*begin::Card toolbar*/}
              </div>
              {/*end::Card header*/}
              {/*begin::Card body*/}
              <div className="card-body pt-0">
                {/*begin::Select2*/}
                <select className="form-select mb-2" data-control="select2"
                        data-hide-search="true" data-placeholder="Select an option"
                        id="kt_ecommerce_add_product_status_select" defaultValue='published' onChange={handelOnChange}>
                  <option></option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="inactive">Inactive</option>
                </select>
                {/*end::Select2*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7">Set the product status.</div>
                {/*end::Description*/}
                {/*begin::Datepicker*/}
                <div className="d-none mt-10">
                  <label htmlFor="kt_ecommerce_add_product_status_datepicker" className="form-label">Select publishing date and time</label>
                  <input className="form-control" id="kt_ecommerce_add_product_status_datepicker" placeholder="Pick date & time"  onChange={handelOnChange} />
                </div>
                {/*end::Datepicker*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Status*/}
            {/*begin::Category & tags*/}
            <div className="card card-flush py-4">
              {/*begin::Card header*/}
              <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title">
                  <h2>Product Details</h2>
                </div>
                {/*end::Card title*/}
              </div>
              {/*end::Card header*/}
              {/*begin::Card body*/}
              <div className="card-body pt-0">
                {/*begin::Input group*/}
                {/*begin::Label*/}
                <label className="form-label">Categories</label>
                {/*end::Label*/}
                {/*begin::Select2*/}
                <select className="form-select mb-2" data-control="select2" data-placeholder="Select an option"
                        data-allow-clear="true" multiple={true}  onChange={handelOnChange}>
                  <option></option>
                  <option value="Computers">Computers</option>
                  <option value="Watches">Watches</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Household">Household</option>
                  <option value="Handbags">Handbags</option>
                  <option value="Wines">Wines</option>
                  <option value="Sandals">Sandals</option>
                </select>
                {/*end::Select2*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7 mb-7">Add product to a category.</div>
                {/*end::Description*/}
                {/*end::Input group*/}
                {/*begin::Button*/}
                <a href="apps/ecommerce/catalog/add-category.html" className="btn btn-light-primary btn-sm mb-10">
                  <i className="ki-duotone ki-plus fs-2"></i>Create new category</a>
                {/*end::Button*/}
                {/*begin::Input group*/}
                {/*begin::Label*/}
                <label className="form-label d-block">Tags</label>
                {/*end::Label*/}
                {/*begin::Input*/}
                <input id="kt_ecommerce_add_product_tags" name="kt_ecommerce_add_product_tags" className="form-control mb-2" onChange={handelOnChange} />
                {/*end::Input*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7">Add tags to a product.</div>
                {/*end::Description*/}
                {/*end::Input group*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Category & tags*/}
            {/*begin::Weekly sales*/}
            <div className="card card-flush py-4">
              {/*begin::Card header*/}
              <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title">
                  <h2>Weekly Sales</h2>
                </div>
                {/*end::Card title*/}
              </div>
              {/*end::Card header*/}
              {/*begin::Card body*/}
              <div className="card-body pt-0">
                <span className="text-muted">No data available. Sales data will begin capturing once product has been published.</span>
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Weekly sales*/}
            {/*begin::Template settings*/}
            <div className="card card-flush py-4">
              {/*begin::Card header*/}
              <div className="card-header">
                {/*begin::Card title*/}
                <div className="card-title">
                  <h2>Product Template</h2>
                </div>
                {/*end::Card title*/}
              </div>
              {/*end::Card header*/}
              {/*begin::Card body*/}
              <div className="card-body pt-0">
                {/*begin::Select store template*/}
                <label htmlFor="kt_ecommerce_add_product_store_template" className="form-label">Select a product template</label>
                {/*end::Select store template*/}
                {/*begin::Select2*/}
                <select className="form-select mb-2" data-kt-select2="true" data-control="select2" data-hide-search="true" data-placeholder="Select an option" id="kt_ecommerce_add_product_store_template"
                        defaultValue="default"
                        onChange={handelOnChange}>
                  <option></option>
                  <option value="default">Default template</option>
                  <option value="electronics">Electronics</option>
                  <option value="office">Office stationary</option>
                  <option value="fashion">Fashion</option>
                </select>
                {/*end::Select2*/}
                {/*begin::Description*/}
                <div className="text-muted fs-7">Assign a template from your current theme to define how a single product is displayed.</div>
                {/*end::Description*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Template settings*/}
          </div>
          {/*end::Aside column*/}
          {/*begin::Main column*/}
          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            {/*begin:::Tabs*/}
            <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
              {/*begin:::Tab item*/}
              <li className="nav-item">
                <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_ecommerce_add_product_general">General</a>
              </li>
              {/*end:::Tab item*/}
              {/*begin:::Tab item*/}
              <li className="nav-item">
                <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_ecommerce_add_product_advanced">Advanced</a>
              </li>
              {/*end:::Tab item*/}
            </ul>
            {/*end:::Tabs*/}
            {/*begin::Tab content*/}
            <div className="tab-content">
              {/*begin::Tab pane*/}
              <div className="tab-pane fade show active" id="kt_ecommerce_add_product_general" role="tab-panel">
                <div className="d-flex flex-column gap-7 gap-lg-10">
                  {/*begin::General options*/}
                  <div className="card card-flush py-4">
                    {/*begin::Card header*/}
                    <div className="card-header">
                      <div className="card-title">
                        <h2>General</h2>
                      </div>
                    </div>
                    {/*end::Card header*/}
                    {/*begin::Card body*/}
                    <div className="card-body pt-0">
                      {/*begin::Input group*/}
                      <TextField field={{name:'product_name',label:'Product Name',hint:'A product name is required and recommended to be unique.', attributes:{className:'form-control mb-2',placeholder:'Product name'},wrapperAttributes:{className:'mb-10'}}}  />
                      {/*end::Input group*/}

                      {/*begin::Input group*/}
                      <QuillField field={{name:'description', label:'Description', hint:'Set a description to the product for better visibility.'}} value="dddd" error={null} />
                      {/*end::Input group*/}
                    </div>
                    {/*end::Card header*/}
                  </div>
                  {/*end::General options*/}
                  <DropzoneTwoField  field={{label:'Media', name:'media', hint:'Set the product media gallery.'}}/>
                  {/*begin::Pricing*/}
                  <div className="card card-flush py-4">
                    {/*begin::Card header*/}
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Pricing</h2>
                      </div>
                    </div>
                    {/*end::Card header*/}
                    {/*begin::Card body*/}
                    <div className="card-body pt-0">
                      {/*begin::Input group*/}
                      <CustomFields  field={{type:'address' ,name:'address', label:'Set Discount Percentage', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'base_64_image' ,name:'base_64_image', label:'base_64_image', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'checkbox' ,name:'checkbox', label:'checkbox', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'checklist_dependency' ,name:'checklist_dependency', label:'checklist_dependency', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'checklist' ,name:'checklist', label:'checklist', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'ckeditor' ,name:'ckeditor', label:'ckeditor', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'number' ,name:'discount', label:'Set Discount Percentage', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'radio' ,name:'discount1', label:'Set Discosimplemdeunt Percentage', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'select' ,name:'discount1', label:'Set Discount Percentage', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'select2' ,name:'discount2', label:'Set Discount Percentage', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'select2_from_ajax' ,name:'discount', label:'Set Discount Percentage', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'color' ,name:'color', label:'color', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'custom_html' ,name:'custom_html', label:'custom_html', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'date' ,name:'date', label:'date', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'date_picker' ,name:'date_picker', label:'date_picker', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'date_range' ,name:'date_range', label:'date_range', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'datetime' ,name:'datetime', label:'datetime', value:'2025-10-12', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'email' ,name:'email', label:'email', value:'2025-10-12', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'enum' ,name:'enum', label:'enum', value:'2025-10-12', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'icon_picker' ,name:'icon_picker', label:'icon_picker', value:'2025-10-12', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'image' ,name:'image', label:'image', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'file' ,name:'file', label:'file', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'month' ,name:'month', label:'month', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'number' ,name:'number', label:'number', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'double' ,name:'double', label:'double', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'page_or_link' ,name:'page_or_link', label:'page_or_link', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'password' ,name:'password', label:'password', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'range' ,name:'range', label:'range', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'select2_from_ajax_multiple' ,name:'select2_from_ajax_multiple', label:'select2_from_ajax_multiple', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'select_from_array' ,name:'select_from_array', label:'select_from_array', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'select_multiple' ,name:'select_multiple', label:'select_multiple', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'table' ,name:'table', label:'table', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'text' ,name:'text', label:'text', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'time' ,name:'time', label:'time', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'time_picker' ,name:'time_picker', label:'time_picker', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'upload' ,name:'upload', label:'upload', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'upload_multiple' ,name:'upload_multiple', label:'upload_multiple', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'url' ,name:'url', label:'url', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'video' ,name:'video', label:'video', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <CustomFields  field={{type:'week' ,name:'week', label:'week', options:[{key:1, label:"Option 1", value:"Option 1", tips:"Option 1"},"Option 2","Option 3","Option 4"], hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      <RangeField  field={{name:'discount', unit:'KG', label:'Set Discount Percentage', hint:'Set a percentage discount to be applied on this product.', wrapperAttributes:{className:'mb-10'}}} />
                      {/*begin::Input group*/}
                      <div className="d-none mb-10 fv-row" id="kt_ecommerce_add_product_discount_fixed">
                        {/*begin::Label*/}
                        <label className="form-label">Fixed Discounted Price</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <input type="text" name="dicsounted_price" className="form-control mb-2" placeholder="Discounted price"  onChange={handelOnChange} />
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Set the discounted product price. The product will be reduced at the determined fixed price</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Tax*/}
                      <div className="d-flex flex-wrap gap-5">
                        {/*begin::Input group*/}
                        <div className="fv-row w-100 flex-md-root">
                          {/*begin::Label*/}
                          <label className="required form-label">Tax Class</label>
                          {/*end::Label*/}
                          {/*begin::Select2*/}
                          <select className="form-select mb-2" name="tax" data-control="select2" data-hide-search="true" data-placeholder="Select an option" onChange={handelOnChange}>
                            <option></option>
                            <option value="0">Tax Free</option>
                            <option value="1">Taxable Goods</option>
                            <option value="2">Downloadable Product</option>
                          </select>
                          {/*end::Select2*/}
                          {/*begin::Description*/}
                          <div className="text-muted fs-7">Set the product tax class.</div>
                          {/*end::Description*/}
                        </div>
                        {/*end::Input group*/}
                        {/*begin::Input group*/}
                        <div className="fv-row w-100 flex-md-root">
                          {/*begin::Label*/}
                          <label className="form-label">VAT Amount (%)</label>
                          {/*end::Label*/}
                          {/*begin::Input*/}
                          <input type="text" className="form-control mb-2" onChange={handelOnChange} />
                          {/*end::Input*/}
                          {/*begin::Description*/}
                          <div className="text-muted fs-7">Set the product VAT about.</div>
                          {/*end::Description*/}
                        </div>
                        {/*end::Input group*/}
                      </div>
                      {/*end:Tax*/}
                    </div>
                    {/*end::Card header*/}
                  </div>
                  {/*end::Pricing*/}
                </div>
              </div>
              {/*end::Tab pane*/}
              {/*begin::Tab pane*/}
              <div className="tab-pane fade" id="kt_ecommerce_add_product_advanced" role="tab-panel">
                <div className="d-flex flex-column gap-7 gap-lg-10">
                  {/*begin::Inventory*/}
                  <div className="card card-flush py-4">
                    {/*begin::Card header*/}
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Inventory</h2>
                      </div>
                    </div>
                    {/*end::Card header*/}
                    {/*begin::Card body*/}
                    <div className="card-body pt-0">
                      {/*begin::Input group*/}
                      <div className="mb-10 fv-row">
                        {/*begin::Label*/}
                        <label className="required form-label">SKU</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <input type="text" name="sku" className="form-control mb-2" placeholder="SKU Number" onChange={handelOnChange} />
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Enter the product SKU.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className="mb-10 fv-row">
                        {/*begin::Label*/}
                        <label className="required form-label">Barcode</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <input type="text" name="barcode" className="form-control mb-2" placeholder="Barcode Number" onChange={handelOnChange} />
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Enter the product barcode number.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className="mb-10 fv-row">
                        {/*begin::Label*/}
                        <label className="required form-label">Quantity</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <div className="d-flex gap-3">
                          <input type="number" name="shelf" className="form-control mb-2" placeholder="On shelf" onChange={handelOnChange} />
                          <input type="number" name="warehouse" className="form-control mb-2" placeholder="In warehouse" onChange={handelOnChange} />
                        </div>
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Enter the product quantity.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className="fv-row">
                        {/*begin::Label*/}
                        <label className="form-label">Allow Backorders</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <div className="form-check form-check-custom form-check-solid mb-2">
                          <input className="form-check-input" type="checkbox" onChange={handelOnChange} />
                          <label className="form-check-label">Yes</label>
                        </div>
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Allow customers to purchase products that are out of stock.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                    </div>
                    {/*end::Card header*/}
                  </div>
                  {/*end::Inventory*/}
                  {/*begin::Variations*/}
                  <div className="card card-flush py-4">
                    {/*begin::Card header*/}
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Variations</h2>
                      </div>
                    </div>
                    {/*end::Card header*/}
                    {/*begin::Card body*/}
                    <div className="card-body pt-0">
                      {/*begin::Input group*/}
                      <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                        {/*begin::Label*/}
                        <label className="form-label">Add Product Variations</label>
                        {/*end::Label*/}
                        {/*begin::Repeater*/}
                        <div id="kt_ecommerce_add_product_options" data-control="repeater">
                          {/*begin::Form group*/}
                          <div className="form-group">
                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                              <div data-repeater-item="" className="d-flex flex-wrap align-items-center gap-5">
                                {/*begin::Select2*/}
                                <div className="w-100 w-md-200px">
                                  <select className="form-select" name="product_option" data-placeholder="Select a variation" data-kt-ecommerce-catalog-add-product="product_option" onChange={handelOnChange}>
                                    <option></option>
                                    <option value="color">Color</option>
                                    <option value="size">Size</option>
                                    <option value="material">Material</option>
                                    <option value="style">Style</option>
                                  </select>
                                </div>
                                {/*end::Select2*/}
                                <div className="mw-100 w-200px">
                                  {/*begin::Input*/}
                                  <input type="text" className="form-control" name="product_option_value" placeholder="Variation"  onChange={handelOnChange}/>
                                  {/*end::Input*/}
                                </div>

                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                  <i className="ki-duotone ki-cross fs-1">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                </button>
                              </div>
                            </div>
                          </div>
                          {/*end::Form group*/}
                          {/*begin::Form group*/}
                          <div className="form-group mt-5">
                            <button type="button" data-repeater-create="" className="btn btn-sm btn-light-primary">
                              <i className="ki-duotone ki-plus fs-2"></i>Add another variation</button>
                          </div>
                          {/*end::Form group*/}
                        </div>
                        {/*end::Repeater*/}
                      </div>
                      {/*end::Input group*/}
                    </div>
                    {/*end::Card header*/}
                  </div>
                  {/*end::Variations*/}
                  {/*begin::Shipping*/}
                  <div className="card card-flush py-4">
                    {/*begin::Card header*/}
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Shipping</h2>
                      </div>
                    </div>
                    {/*end::Card header*/}
                    {/*begin::Card body*/}
                    <div className="card-body pt-0">
                      {/*begin::Input group*/}
                      <div className="fv-row">
                        {/*begin::Input*/}
                        <div className="form-check form-check-custom form-check-solid mb-2">
                          <input className="form-check-input" type="checkbox" id="kt_ecommerce_add_product_shipping_checkbox" value="1"  onChange={handelOnChange}/>
                          <label className="form-check-label">This is a physical product</label>
                        </div>
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Set if the product is a physical or digital item. Physical products may require shipping.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Shipping form*/}
                      <div id="kt_ecommerce_add_product_shipping" className="d-none mt-10">
                        {/*begin::Input group*/}
                        <div className="mb-10 fv-row">
                          {/*begin::Label*/}
                          <label className="form-label">Weight</label>
                          {/*end::Label*/}
                          {/*begin::Editor*/}
                          <input type="text" name="weight" className="form-control mb-2" placeholder="Product weight"  onChange={handelOnChange} />
                          {/*end::Editor*/}
                          {/*begin::Description*/}
                          <div className="text-muted fs-7">Set a product weight in kilograms (kg).</div>
                          {/*end::Description*/}
                        </div>
                        {/*end::Input group*/}
                        {/*begin::Input group*/}
                        <div className="fv-row">
                          {/*begin::Label*/}
                          <label className="form-label">Dimension</label>
                          {/*end::Label*/}
                          {/*begin::Input*/}
                          <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                            <input type="number" name="width" className="form-control mb-2" placeholder="Width (w)" onChange={handelOnChange} />
                            <input type="number" name="height" className="form-control mb-2" placeholder="Height (h)" onChange={handelOnChange} />
                            <input type="number" name="length" className="form-control mb-2" placeholder="Lengtn (l)" onChange={handelOnChange} />
                          </div>
                          {/*end::Input*/}
                          {/*begin::Description*/}
                          <div className="text-muted fs-7">Enter the product dimensions in centimeters (cm).</div>
                          {/*end::Description*/}
                        </div>
                        {/*end::Input group*/}
                      </div>
                      {/*end::Shipping form*/}
                    </div>
                    {/*end::Card header*/}
                  </div>
                  {/*end::Shipping*/}
                  {/*begin::Meta options*/}
                  <div className="card card-flush py-4">
                    {/*begin::Card header*/}
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Meta Options</h2>
                      </div>
                    </div>
                    {/*end::Card header*/}
                    {/*begin::Card body*/}
                    <div className="card-body pt-0">
                      {/*begin::Input group*/}
                      <div className="mb-10">
                        {/*begin::Label*/}
                        <label className="form-label">Meta Tag Title</label>
                        {/*end::Label*/}
                        {/*begin::Input*/}
                        <input type="text" className="form-control mb-2" name="meta_title" placeholder="Meta tag name" />
                        {/*end::Input*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Set a meta tag title. Recommended to be simple and precise keywords.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div className="mb-10">
                        {/*begin::Label*/}
                        <label className="form-label">Meta Tag Description</label>
                        {/*end::Label*/}
                        {/*begin::Editor*/}
                        <div id="kt_ecommerce_add_product_meta_description" className="min-h-100px mb-2"></div>
                        {/*end::Editor*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Set a meta tag description to the product for increased SEO ranking.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                      {/*begin::Input group*/}
                      <div>
                        {/*begin::Label*/}
                        <label className="form-label">Meta Tag Keywords</label>
                        {/*end::Label*/}
                        {/*begin::Editor*/}
                        <input id="kt_ecommerce_add_product_meta_keywords" name="kt_ecommerce_add_product_meta_keywords" className="form-control mb-2" />
                        {/*end::Editor*/}
                        {/*begin::Description*/}
                        <div className="text-muted fs-7">Set a list of keywords that the product is related to. Separate the keywords by adding a comma
                          <code>,</code>between each keyword.</div>
                        {/*end::Description*/}
                      </div>
                      {/*end::Input group*/}
                    </div>
                    {/*end::Card header*/}
                  </div>
                  {/*end::Meta options*/}
                </div>
              </div>
              {/*end::Tab pane*/}
            </div>
            {/*end::Tab content*/}
            <div className="d-flex justify-content-end">
              {/*begin::Button*/}
              <a href="apps/ecommerce/catalog/products.html" id="kt_ecommerce_add_product_cancel" className="btn btn-light me-5">Cancel</a>
              {/*end::Button*/}
              {/*begin::Button*/}
              <button type="submit" id="kt_ecommerce_add_product_submit" className="btn btn-primary">
                <span className="indicator-label">Save Changes</span>
                <span className="indicator-progress">Please wait... 
													<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
              </button>
              {/*end::Button*/}
            </div>
          </div>
          {/**/}
          {/*end::Main column*/}
        </form>
        {/*end::Form*/}
      </>
  )
};

export {DynamicAddForm}
