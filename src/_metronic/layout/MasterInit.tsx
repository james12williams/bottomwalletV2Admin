import {useEffect, useState} from 'react'
import {Tab} from 'bootstrap'
import {
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
  SwapperComponent,
} from '../assets/ts/components'
// import KTComponents from '../../../public/assets/js/scripts.bundle.js'
import {ThemeModeComponent} from '../assets/ts/layout'

import {useLayout} from './core'

export function MasterInit() {
  const {config} = useLayout()
  const [initialized, setInitialized] = useState(false)
  const pluginsInitialization = () => {
    ThemeModeComponent.init()
    setTimeout(() => {
      window.KTComponents.init()
      window.KTWidgets.init()
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
      document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
        Tab.getOrCreateInstance(tab)
      })
    }, 500)
  }

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      pluginsInitialization()
    }
  }, [config, initialized])

  return <></>
}
