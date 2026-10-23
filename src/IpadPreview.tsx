import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import CopyToFigmaButton from './CopyToFigmaButton'
import './ipad-preview.css'

// iPad Pro 13-inch (M5): 2752 × 2064 pixels at @2x.
const SCREEN = { width: 1376, height: 1032 }
const DEVICE = { width: SCREEN.width + 48, height: SCREEN.height + 48 }

export default function IpadPreview() {
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(0)
  const source = new URL(window.location.href)
  source.searchParams.set('viewport', 'ipad')
  source.hash = ''

  useLayoutEffect(() => {
    if (!stage.current) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.max(0.1, Math.min(
        entry.contentRect.width / DEVICE.width,
        entry.contentRect.height / DEVICE.height,
        1,
      )))
    })
    observer.observe(stage.current)
    return () => observer.disconnect()
  }, [])

  const deviceStyle = {
    '--device-scale': scale,
    '--device-width': `${DEVICE.width}px`,
    '--device-height': `${DEVICE.height}px`,
  } as CSSProperties

  return (
    <div className="ipad-preview" ref={stage}>
      <div className="ipad-footprint" style={deviceStyle}>
        <section className="ipad-device" aria-label="iPad Pro 13-inch landscape preview">
          <div className="ipad-power" aria-hidden="true" />
          <div className="ipad-volume ipad-volume-up" aria-hidden="true" />
          <div className="ipad-volume ipad-volume-down" aria-hidden="true" />
          <div className="ipad-bezel">
            <div className="ipad-camera" aria-hidden="true" />
            <div className="ipad-sensor" aria-hidden="true" />
            <div className="ipad-display">
              <iframe
                ref={frame}
                className="ipad-viewport"
                title="Hong Ye Group login on iPad Pro 13-inch"
                src={source.href}
                width={SCREEN.width}
                height={SCREEN.height}
              />
            </div>
          </div>
        </section>
      </div>
      <CopyToFigmaButton frame={frame} />
      <footer className="ipad-caption" aria-label="Device specifications">
        <span className="ipad-model">iPad Pro 13″</span>
        <span className="ipad-caption-divider" aria-hidden="true" />
        <span>1376 × 1032 pt</span>
        <span className="ipad-caption-divider" aria-hidden="true" />
        <span>2752 × 2064 px · @2x</span>
      </footer>
    </div>
  )
}
