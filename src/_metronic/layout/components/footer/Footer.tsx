import {useEffect} from 'react'
import {ILayout, useLayout} from '../../core'
import { useApp } from '../../../../layouts/core/QueryResponseProvider'
import { Link } from 'react-router-dom'

const Footer = () => {
  const {config} = useLayout()
  const {app} = useApp()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  return (
    <>
      <div className='text-gray-900 order-2 order-md-1'>
        <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()}&copy;
        </span>
        <Link to='/' className='text-gray-800 text-hover-primary'>
          {app.app_name}
        </Link>
      </div>

      <ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
        <li className='menu-item'>
          <a href='#' className='menu-link px-2'>
            About
          </a>
        </li>

        <li className='menu-item'>
          <a href='#' className='menu-link px-2'>
            Support
          </a>
        </li>
      </ul>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export {Footer}
