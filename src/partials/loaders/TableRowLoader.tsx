/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton.tsx";
import clsx from "clsx";

type Props = {
  count?: number
  colSpan?: number
}

const TableRowLoader: React.FC<Props> = ({count=1, colSpan=1}) => {
  let holder = [];
  for (let i = 0; i < count; i++) {
    holder.push(i);
  }
  return (
      <>
        {holder.map(function (i){
          return <tr key={'log_key_'+i}>
            <td colSpan={colSpan}>
              <CustomSkeleton {... {height:15, containerClassName:'w-100'}}  />
            </td>
          </tr>
        })}
    </>
  )
}

export {TableRowLoader}
