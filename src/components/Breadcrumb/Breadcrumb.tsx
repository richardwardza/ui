import { IconChevronRight } from '../Icon/icons/IconChevronRight'
// @ts-ignore
import BreadcrumbStyle from './Breadcrumb.module.css'

export interface BreadcrumbProps {
  children?: [React.ReactNode]
  className?: string
  style?: React.CSSProperties
  spacing?: 'small' | 'medium' | 'large'
}

const Breadcrumb = ({
  className,
  style,
  children,
  spacing = 'small',
}: BreadcrumbProps) => {
  let classes = [BreadcrumbStyle['sbui-breadcrumb--container']]
  let seperatorClasses = [BreadcrumbStyle['sbui-breadcrumb--separator']]

  if (className) {
    classes.push(className)
  }

  if (spacing) {
    seperatorClasses.push(`sbui-breadcrumb--separator-${spacing}`)
  }

  return (
    <ol className={classes.join(' ')} style={style} aria-label="Breadcrumb">
      {children!.map((child: React.ReactNode, idx: number) => (
        <li className={BreadcrumbStyle['sbui-breadcrumb--item-container']}>
          {child}
          {idx + 1 < children!.length && (
            <IconChevronRight
              size={12}
              className={seperatorClasses.join(' ')}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  )
}

export interface BreadcrumbItemProps {
  children: React.ReactNode
  active?: boolean
  onClick?: any
  style?: React.CSSProperties
}

export function Item({
  children,
  active,
  onClick,
  style,
}: BreadcrumbItemProps) {
  let classes = [BreadcrumbStyle['sbui-breadcrumb--item']]
  if (active) classes.push(BreadcrumbStyle['sbui-breadcrumb--item__active'])
  return (
    <span
      className={classes.join(' ')}
      onClick={onClick}
      style={style}
      aria-current={active ? 'page' : false}
    >
      {children}
    </span>
  )
}

Breadcrumb.Item = Item

export default Breadcrumb
