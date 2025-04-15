/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {getCSSVariableValue} from "../../_metronic/assets/ts/_utils";
import {useThemeMode} from "../../_metronic/partials";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
type Props = {
    width?: any
    height?: any
    circle?: boolean
    style?: any
    className?: any
}
const CustomSkeleton: React.FC<IntrinsicAttributes & Props> = (props) => {
    const {mode} = useThemeMode();
    const [baseColor, setBaseColor] = useState("");
    const [highlightColor, setHighlightColor] = useState("");

    useEffect(() => {
        if (mode=="dark"){
            setBaseColor(getCSSVariableValue('--bs-scrollbar-color'));
            setHighlightColor(getCSSVariableValue('--bs-scrollbar-hover-color'));
        }
        else{
            setBaseColor(getCSSVariableValue('--bs-card-color'));
            setHighlightColor(getCSSVariableValue('--bs-gray-200'));
        }
    }, [mode]);

  return (
    <>
      <Skeleton {...props} enableAnimation={true} baseColor={baseColor} highlightColor={highlightColor} />
    </>
  )
}

export {CustomSkeleton}
