/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {ListLoading} from "../../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";

type Props = {
  className: string
  chartColor: string
  chartHeight: string
  isLoading: boolean
  data:any
}

const ExpectedEarning: React.FC<Props> = ({className, chartColor, chartHeight, isLoading, data}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight, data));
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, data])

  return (<>
    {/* begin::Card widget 4 */}
    <div className="card card-flush h-md-50 mb-5 mb-xl-10">
      {/* begin::Header */}
      <div className="card-header pt-5">
        {/* begin::Title */}
        <div className="card-title d-flex flex-column">
          {/* begin::Info */}
          <div className="d-flex align-items-center">
            {/* begin::Currency */}
            <span className="fs-4 fw-bold text-gray-400 me-1 align-self-start">$</span>
            {/* end::Currency */}
            {/* begin::Amount */}
            <span className="fs-2hx fw-bolder text-dark me-2 lh-1 ls-n2">69,700</span>
            {/* end::Amount */}
            {/* begin::Badge */}
            <span className="badge badge-success fs-base">
														{/* begin::Svg Icon | path: icons/duotune/arrows/arr066.svg */}
              <span className="svg-icon svg-icon-5 svg-icon-white ms-n1">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
																<path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
															</svg>
														</span>
              {/* end::Svg Icon */}2.2%</span>
            {/* end::Badge */}
          </div>
          {/* end::Info */}
          {/* begin::Subtitle */}
          <span className="text-gray-400 pt-1 fw-bold fs-6">Expected Earnings</span>
          {/* end::Subtitle */}
        </div>
        {/* end::Title */}
      </div>
      {/* end::Header */}
      {/* begin::Card body */}
      <div className="card-body pt-2 pb-4 d-flex align-items-center">
        {/* begin::Chart */}
        <div className="d-flex flex-center me-5 pt-2">
          {/*<ChartsWidget4 className={""} />*/}
        </div>
        {/* end::Chart */}
        {/* begin::Labels */}
        <div className="d-flex flex-column content-justify-center w-100">
          {/* begin::Label */}
          <div className="d-flex fs-6 fw-bold align-items-center">
            {/* begin::Bullet */}
            <div className="bullet w-8px h-6px rounded-2 bg-danger me-3"></div>
            {/* end::Bullet */}
            {/* begin::Label */}
            <div className="text-gray-500 flex-grow-1 me-4">Shoes</div>
            {/* end::Label */}
            {/* begin::Stats */}
            <div className="fw-boldest text-gray-700 text-xxl-end">$7,660</div>
            {/* end::Stats */}
          </div>
          {/* end::Label */}
          {/* begin::Label */}
          <div className="d-flex fs-6 fw-bold align-items-center my-3">
            {/* begin::Bullet */}
            <div className="bullet w-8px h-6px rounded-2 bg-primary me-3"></div>
            {/* end::Bullet */}
            {/* begin::Label */}
            <div className="text-gray-500 flex-grow-1 me-4">Gaming</div>
            {/* end::Label */}
            {/* begin::Stats */}
            <div className="fw-boldest text-gray-700 text-xxl-end">$2,820</div>
            {/* end::Stats */}
          </div>
          {/* end::Label */}
          {/* begin::Label */}
          <div className="d-flex fs-6 fw-bold align-items-center">
            {/* begin::Bullet */}
            <div className="bullet w-8px h-6px rounded-2 me-3" style={{backgroundColor: "#E4E6EF"}}></div>
            {/* end::Bullet */}
            {/* begin::Label */}
            <div className="text-gray-500 flex-grow-1 me-4">Others</div>
            {/* end::Label */}
            {/* begin::Stats */}
            <div className="fw-boldest text-gray-700 text-xxl-end">$45,257</div>
            {/* end::Stats */}
          </div>
          {/* end::Label */}
        </div>
        {/* end::Labels */}
      </div>
      {/* end::Card body */}
      {isLoading && <ListLoading />}
    </div>
    {/* end::Card widget 4 */}
  </>)
};

const chartOptions = (chartColor: string, chartHeight: string, data:any): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');
  const baseColor = getCSSVariableValue('--bs-' + chartColor);
  let series = [];
  if (data?.series){
    series = Object.keys(data.series).map((key:any)=>{
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
  return {
    series: series,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
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
    fill: {
      type: 'solid',
    },
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
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return   val + (val>1?' Participants':' Participant')
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}

export {ExpectedEarning}
