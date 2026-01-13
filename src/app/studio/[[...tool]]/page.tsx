'use client'

import { NextStudio } from 'next-sanity/studio'
import { useEffect } from 'react'
import config from '../../../../sanity.config'

export default function StudioPage() {
  useEffect(() => {
    // Add marker to body for CSS targeting
    document.body.setAttribute('data-studio-route', 'true')
    document.body.classList.add('studio-route')

    return () => {
      document.body.removeAttribute('data-studio-route')
      document.body.classList.remove('studio-route')
    }
  }, [])

  return <div data-studio-page><NextStudio config={config} /></div>
}
