/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {MyLoginSessions} from "./account/MyLoginSessions";
import {MyLogs} from "./account/MyLogs";

export function Logs() {
  return (
    <>
      {/*begin::Login sessions*/}
      <MyLoginSessions />
      {/*end::Login sessions*/}

      {/*begin::Card*/}
      <MyLogs />
      {/*end::Card*/}
    </>
  )
}
