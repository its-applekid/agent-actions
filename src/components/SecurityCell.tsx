import * as Tooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'

interface SecurityCellProps {
  value: ReactNode
  detail: string
  severity?: 'green' | 'yellow' | 'red' | 'neutral'
}

export function SecurityCell({ value, detail, severity = 'neutral' }: SecurityCellProps) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect touch device
    setIsMobile('ontouchstart' in window)
  }, [])

  const borderColors = {
    green: '#98971a',
    yellow: '#d79921',
    red: '#ff0621',
    neutral: '#665c54',
  }

  const textColors = {
    green: 'text-green',
    yellow: 'text-yellow',
    red: 'text-red',
    neutral: 'text-terminal-text',
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <span
            className={`${textColors[severity]} underline decoration-dotted cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={(e) => {
              if (isMobile) {
                e.preventDefault()
                setOpen(!open)
              }
            }}
          >
            {value}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-xs px-4 py-3 text-sm leading-relaxed"
            sideOffset={5}
            side={isMobile ? 'top' : undefined}
            style={{
              backgroundColor: '#1d2021',
              border: `2px solid ${borderColors[severity]}`,
              borderRadius: '8px',
              color: '#ebdbb2',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              zIndex: 9999,
            }}
            onPointerDownOutside={() => {
              if (isMobile) {
                setOpen(false)
              }
            }}
          >
            {detail}
            <Tooltip.Arrow
              style={{
                fill: borderColors[severity],
              }}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
