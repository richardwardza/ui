import React from 'react'
import * as Icons from 'react-feather'
import { IconContext } from './IconContext'

interface Props {
  className?: string
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge' | number
  type?: string
  color?: string
  strokeWidth?: number
  fill?: string
  stroke?: string
}

interface StringMap {
  [key: string]: number
}

function Icon({
  className,
  size,
  type,
  color,
  strokeWidth,
  fill = undefined,
  stroke = undefined,
  ...props
}: Props) {
  return (
    <IconContext.Consumer>
      {({ contextSize }) => {
        const defaultSizes: StringMap = {
          tiny: 14,
          small: 18,
          medium: 20,
          large: 20,
          xlarge: 24,
        }

        const defaultSize = defaultSizes['large']
        // @ts-ignore
        const FeatherIcon = Icons[type] ? Icons[type] : Icons['Mail']

        // const iconSize = typeof size === 'string' ? defaultSizes[contextSize] : 21
        let iconSize: any = 21

        // use contextSize of parent (via context hook) if one exists
        if (contextSize) {
          iconSize = contextSize
            ? typeof contextSize === 'string'
              ? defaultSizes[contextSize]
              : contextSize
            : defaultSize
        }

        // use size prop of this component if one exists
        if (size) {
          iconSize = size
            ? typeof size === 'string'
              ? defaultSizes[size]
              : size
            : defaultSize
        }

        // confitional used for Icons with no color settings
        // default these icons to use 'currentColor' ie, the text color
        const noColor = !color && !fill && !stroke

        return (
          <FeatherIcon
            color={!noColor ? color : 'currentColor'}
            stroke={!noColor ? stroke : 'currentColor'}
            className={`${className}`}
            strokeWidth={strokeWidth}
            size={iconSize}
            fill={!noColor ? fill : 'none'}
            {...props}
          />
        )
      }}
    </IconContext.Consumer>
  )
}

export default Icon
