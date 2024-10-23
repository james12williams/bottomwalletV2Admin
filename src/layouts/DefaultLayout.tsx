import React, {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {MenuComponent} from '../_metronic/assets/ts/components'
import {QueryRequestProvider} from "./core/QueryRequestProvider";
import {ScrollTop} from "../_metronic/layout/components/scroll-top";
import {PageDataProvider} from "../_metronic/layout/core";

const DefaultLayout = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key]);

  return (
      <QueryRequestProvider>
          <PageDataProvider>
              <Outlet />
              <ScrollTop />
          </PageDataProvider>
      </QueryRequestProvider>
  )
};

export {DefaultLayout}
