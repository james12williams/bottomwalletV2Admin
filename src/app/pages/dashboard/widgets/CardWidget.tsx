/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl, WithChildren} from '../../../../_metronic/helpers'
import {ListLoading} from "../../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import SVG from "react-inlinesvg";
import {Link} from "react-router-dom";

type Props = {
  className: string
  bgColor: string
  textColor?: string
  iconColor?: string
  path?: string
  title: string
  icon?: string
  description?: string
  isLoading?: boolean
  onClick?: ()=>void
}

const CardWidget: React.FC<Props & WithChildren> = ({
  className,
  bgColor,
  textColor="text-white",
  iconColor="text-white",
  title,
  path,
  icon=null,
  onClick,
  description=null,
  isLoading=false,
  children
}) => {

  if (!onClick){
    onClick = () => {}
  }

  return (
    <div className={`${className}`}>
      {/* begin::Statistics Widget 5 */}
      {path && <Link to={path} className={"card card-flush "+ bgColor +" hoverable card-xl-stretch mb-xl-8"}>
        {/* begin::Body */}
        <div className="card-body">
          <div className='d-flex'>
            {icon && <span className={"svg-icon "+ iconColor +" svg-icon-3x ms-n1"}>
              <SVG src={toAbsoluteUrl(icon)} />
            </span>}
            {/* end::Svg Icon */}
            <h2 style={{display:'contents', fontSize:'35px'}} className={textColor+" fw-bolder mb-2 mt-5"}>{title}</h2>
          </div>
          {description && <div className={"fw-bold "+textColor} dangerouslySetInnerHTML={{__html: description}} />}
        </div>
        {/* end::Body */}
        {isLoading && <ListLoading />}
      </Link>}
      {!path && <div onClick={onClick} className={"card card-flush "+ bgColor +" hoverable card-xl-stretch mb-xl-8"}>
        {/* begin::Body */}
        <div className="card-body">
          {icon && <span className={"svg-icon "+ iconColor +" svg-icon-3x ms-n1"}>
            <SVG src={toAbsoluteUrl(icon)} />
          </span>}
          {/* end::Svg Icon */}
          <div className={textColor+" fw-bolder fs-2 mb-2 mt-5"}>{title}</div>
          {description && <div className={"fw-bold "+textColor} dangerouslySetInnerHTML={{__html: description}} />}
          {children}
        </div>

        {/* end::Body */}
        {isLoading && <ListLoading />}
      </div>}
      {/* end::Statistics Widget 5 */}
    </div>
  )
}

export {CardWidget}
