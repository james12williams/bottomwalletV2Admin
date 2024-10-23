/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'

type Props = {
    country: any
}

const CountryInfoCell: FC<Props> = ({country}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-20px overflow-hidden me-3'>
      <a href='#'>
        {country.src ? (
          <div className='symbol-label'>
            <img src={`${country.src}`} alt={country.title} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${country.initials?.state}`,
              `text-${country.initials?.state}`
            )}
          >
            {country.country_code}
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {/*{country.title}*/}
        {country.country_code}
      </a>
    </div>
  </div>
);

export {CountryInfoCell}
