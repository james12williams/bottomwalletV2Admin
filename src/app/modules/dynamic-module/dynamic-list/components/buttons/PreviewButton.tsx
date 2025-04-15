/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useQueryResponseXPanel} from '../../core/QueryResponseProvider'
import {Link} from "react-router-dom";
import {MyTooltip} from "./MyTooltip";

type Props = {
  button: any
}

const PreviewButton: FC<Props> = ({button}) => {
  const xPanel = useQueryResponseXPanel();
  let path = xPanel.appRoute+'/'+button.primaryKey as any;
  path = import.meta.env.VITE_APP_PUBLIC_URL+(path.replaceAll(import.meta.env.VITE_APP_APP_URL, '')).replace(/^\//, '');
  return <>
      {xPanel.details_row &&
          <MyTooltip content={"View "+ xPanel.entityName} placement={'top'}><Link to={path}
         className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
        <i className="ki-duotone ki-eye fs-2">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
          <span className="path5" />
        </i>
          </Link></MyTooltip>}
  </>
};

export {PreviewButton}
