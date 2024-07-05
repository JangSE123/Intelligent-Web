import React from 'react'
import DesktopMain from './DesktopMain'
import Header from './BrowserHeader'
import styles from './DesktopApp.module.css'

export default function DesktopApp() {
  return (
    <div>
        <Header/>
        <DesktopMain />
    </div>
  )
}
