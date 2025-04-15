/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import {getCSSVariableValue} from '../../../_metronic/assets/ts/_utils'
import {ListLoading} from "../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import {useThemeMode} from "../../../_metronic/partials";
import {getItems} from "../../../layouts/core/QueryResponseProvider";
import {MorrisChartLoader} from "../../../partials/loaders";

type Props = {
  className?: string
  chartHeight?: string
  chartType?: string
  chartColor?: string
  showToolbar?: boolean
  showLegend?: boolean
  stacked?: boolean
  data:any
}

const MorrisChart: React.FC<Props> = ({className, chartColor, chartHeight, chartType='bar', showToolbar=false, showLegend=false, stacked=false, data}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [payload, setPayload] = useState({}) as any;
  const [chart_mode, setChartMode] = useState('');
  const [chart_type, setChartType] = useState(chartType);
  const [isLoading, setLoader] = useState(false);
  const [firstTime, setFirstTimer] = useState(true);
  const {mode} = useThemeMode();

  useEffect(() => {
    if (data.path){
      loadData(data.path)
    }else{
      setPayload({})
    }
  }, [data])

  const refreshChart = () => {
    const element = document.getElementById(payload.name);
    if (!element) {
      return
    }
    if (element.getAttribute("data-kt-initialized") === "1") {
      return;
    }
    const chart = new window.ApexCharts(element, chartOptions(payload, chartHeight, chart_type, showToolbar, showLegend, stacked));
    if (chart) {
      chart.render();
      setFirstTimer(false)
    }
    return chart;
  }

  useEffect(() => {
    if (payload.name) {
      setChartMode(payload.mode)
      const chart = refreshChart();
      return () => {
        if (chart) {
          chart.destroy()
        }
      }
    }
  }, [chartRef, mode, payload])

  const loadData = (path:any)=>{
    if (path && !isLoading) {
      setLoader(true)
      getItems(path, {mode:chart_mode})
          .then(function (resp: any) {
            setPayload(resp);
            setLoader(false)
          }, function (resp){
            setLoader(false);
          })
    }
  }

  useEffect(() => {
    if (chart_mode != payload.mode){
      loadData(payload.path);
    }
  }, [chart_mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      {!(firstTime && isLoading) && <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{payload?.title}</span>
          {/*<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>*/}
        </h3>
        {/* end::Title */}

        {/* begin::Toolbar */}
        <div className='card-toolbar'>
          {
            payload?.tools?.map((tool: any, i: any) => {
              return <button key={tool.mode + '_' + i} onClick={() => setChartMode(tool.mode)}
                             className={(tool.className ?? 'btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1') + (tool.mode == chart_mode ? ' active' : '')}>
                {tool.label}
              </button>
            })
          }
        </div>
        {/* end::Toolbar */}
      </div>}
      {/* end::Header */}

        {/* begin::Body */}
        <div className='card-body position-relative'>
          {(firstTime && isLoading) && <MorrisChartLoader chartHeight={chartHeight} />}
          {/* begin::Chart */}
          <div ref={chartRef} id={payload.name} />
          {/* end::Chart */}
          {isLoading && <ListLoading />}
        </div>
        {/* end::Body */}
    </div>
  )
};

const chartOptions = (data:any, chartHeight?: string, chartType?: string, showToolbar?:boolean, showLegend?:boolean, stacked?:boolean):any => {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  if (!chartHeight){
    chartHeight = '450px'
  }
  let series:any[] = [];
  let colors:any[] = [];
  if (data?.series){
    series = Object.keys(data.series).map((key:any)=>{
      colors[key] = data.series[key].color;
      return data.series[key];
    });
    series.forEach((serial:any)=>{
      serial.data = Object.keys(serial.data).map((key:any)=>{
        return serial.data[key];
      });
    })
  }
  let categories = [];
  if (data?.categories){
    categories = Object.keys(data.categories).map((key:any)=>{
      return data.categories[key];
    })
  }

  let plotOptions = {};
  let fill = {};
  let stroke = {};
  let markers = {};
  let crosshairs = {};
  let chart = {
    fontFamily: 'inherit',
    height: chartHeight,
    stacked: stacked,
    toolbar: {
      show: showToolbar,
    },
  } as any;
  if (chartType=='bar'){
    plotOptions = {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    }
    fill= {
      opacity: 1,
    }
    stroke = {
      show: true,
      width: 2,
      colors: ['transparent'],
    };
    chart.type = chartType;
  }
  else if (chartType=='area'){
    chart.type = chartType;
    fill = {
      // type: 'solid',
      opacity: 1,
    }
    stroke= {
      curve: 'smooth',
    }
    markers= {
      colors: colors,
      strokeColors: colors,
      strokeWidth: 3,
    }
  }
  else if (chartType=='mixed'){
    fill = {
      type: 'solid',
      opacity: 1,
    }
    stroke= {
      curve: 'smooth',
      show: true,
      width: 2,
      colors: ['transparent'],
    }
    plotOptions = {
      bar: {
        horizontal: false,
        borderRadius: 5,
        columnWidth: '12%',
      },
    }
    crosshairs = {
      show: false,
          position: 'front',
          stroke: {
        color: strokeColor,
            width: 1,
            dashArray: 3,
      },
    }
  }

  return {
    series: series,
    chart: chart,
    plotOptions: plotOptions,
    legend: {
      show: showLegend,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: stroke,
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: fill,
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    crosshairs:crosshairs,
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val:any) {
          return '' + val
        },
      },
    },
    colors: colors,
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: markers
  }
}

export {MorrisChart}
