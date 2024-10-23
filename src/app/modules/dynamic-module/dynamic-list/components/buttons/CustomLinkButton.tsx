/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {MyTooltip} from "./MyTooltip";

type Props = {
  button: any
}

const CustomLinkButton: FC<Props> = ({button}) => {
  const active_color = button.values?.active_color??'primary';
  const bg_color = button.values?.bg_color??'light';
  const className = button.values?.className??'btn-sm me-1';
  return (
      <MyTooltip content={button?.values?.value} placement={'top'}>
        <Link to={button.values.href}
              className={clsx(
                  'btn btn-bg-'+bg_color+'' +
                  ' btn-active-color-'+(active_color)+' '+className,
                  {'btn-icon': button.values.icon_only}
              )}>
          <i className={button.values.icon}>
            <span className="path1" />
            <span className="path2" />
            <span className="path3" />
            <span className="path4" />
            <span className="path5" />
            <span className="path6" />
            <span className="path7" />
            <span className="path8" />
            <span className="path9" />
            <span className="path10" />
            <span className="path11" />
          </i>
            {!button.values.icon_only? button.values.value: ''}
        </Link>
      </MyTooltip>
  )
};

export {CustomLinkButton}
