/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton";
type Props = {
  chartHeight?: string
}
const MorrisChartLoader: React.FC<Props> = ({chartHeight='450px'}) => {
  return (<CustomSkeleton height={chartHeight} />)
}

export {MorrisChartLoader}
