import React, { useEffect } from 'react'
// @ts-ignore
import ModalStyles from './Modal.module.css'
import { Button, IconX, Typography, Space } from './../../index'
import { AnimationTailwindClasses } from '../../types'

import * as Dialog from '@radix-ui/react-dialog'

import { Transition } from '@headlessui/react'
import styleHandler from '../../lib/theme/styleHandler'

// import { Transition } from '@tailwindui/react'

interface RadixProps
  extends Dialog.DialogProps,
    Pick<
      Dialog.DialogContentProps,
      | 'onOpenAutoFocus'
      | 'onCloseAutoFocus'
      | 'onEscapeKeyDown'
      | 'onPointerDownOutside'
      | 'onInteractOutside'
    > {}

interface Props {
  children?: React.ReactNode
  customFooter?: React.ReactNode
  closable?: boolean
  description?: string
  hideFooter?: boolean
  alignFooter?: 'right' | 'left'
  layout?: 'horizontal' | 'vertical'
  icon?: React.ReactNode
  loading?: boolean
  onCancel?: any
  cancelText?: string
  onConfirm?: any
  confirmText?: string
  showIcon?: boolean
  footerBackground?: boolean
  title?: string
  variant?: 'danger' | 'warning' | 'success'
  visible: boolean
  size?: 'tiny' | 'small' | 'medium' | 'large'
  style?: React.CSSProperties
  overlayStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  className?: string
  overlayClassName?: string
  transition?: AnimationTailwindClasses
  transitionOverlay?: AnimationTailwindClasses
  triggerElement?: React.ReactNode
  header?: React.ReactNode
}

const Modal = ({
  children,
  customFooter = undefined,
  closable,
  description,
  hideFooter = false,
  alignFooter = 'left',
  layout = 'horizontal',
  loading = false,
  cancelText = 'Cancel',
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = 'Confirm',
  showIcon = false,
  title,
  footerBackground,
  icon,
  variant = 'success',
  visible = false,
  size = 'large',
  style,
  overlayStyle,
  contentStyle,
  className = '',
  overlayClassName,
  triggerElement,
  header,
}: Props) => {
  const [open, setOpen] = React.useState(visible ? visible : false)

  const __styles = styleHandler('modal')

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation()
  }

  let footerClasses = [ModalStyles['sbui-modal-footer']]
  if (footerBackground) {
    footerClasses.push(ModalStyles['sbui-modal-footer--with-bg'])
  }

  let modalClasses = [
    __styles.base,
    // ModalStyles[`sbui-modal`],
    ModalStyles[`sbui-modal--${size}`],
  ]
  if (className) modalClasses.push(className)

  let overlayClasses = [ModalStyles['sbui-modal-overlay']]
  if (overlayClassName) overlayClasses.push(overlayClassName)

  const footerContent = customFooter ? (
    customFooter
  ) : (
    <Space
      style={{
        width: '100%',
        justifyContent:
          layout === 'vertical'
            ? 'center'
            : alignFooter === 'right'
            ? 'flex-end'
            : 'flex-start',
      }}
    >
      <Button type="secondary" onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        loading={loading}
        danger={variant === 'danger'}
      >
        {confirmText}
      </Button>
    </Space>
  )

  function handleOpenChange(open: boolean) {
    if (visible !== undefined && !open) {
      // controlled component behaviour
      onCancel()
    } else {
      // un-controlled component behaviour
      setOpen(open)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {triggerElement && (
        <Dialog.Trigger className={ModalStyles[`sbui-modal__trigger`]}>
          {triggerElement}
        </Dialog.Trigger>
      )}
      <Transition show={open}>
        <Dialog.Overlay>
          <Transition.Child
            enter={ModalStyles[`sbui-modal-overlay--enter`]}
            enterFrom={ModalStyles[`sbui-modal-overlay--enterFrom`]}
            enterTo={ModalStyles[`sbui-modal-overlay--enterTo`]}
            leave={ModalStyles[`sbui-modal-overlay--leave`]}
            leaveFrom={ModalStyles[`sbui-modal-overlay--leaveFrom`]}
            leaveTo={ModalStyles[`sbui-modal-overlay--leaveTo`]}
          >
            <div className={ModalStyles['sbui-modal-overlay-container']}>
              <div
                className={overlayClasses.join(' ')}
                style={overlayStyle}
              ></div>
            </div>
          </Transition.Child>
        </Dialog.Overlay>
        <Dialog.Content forceMount style={{ width: '100vw' }}>
          <div
            className={ModalStyles['sbui-modal-container'] + ' ' + className}
            onClick={() => (onCancel ? onCancel() : null)}
          >
            <div className={ModalStyles['sbui-modal-flex-container']}>
              <Transition.Child
                enter={ModalStyles[`sbui-modal--enter`]}
                enterFrom={ModalStyles[`sbui-modal--enterFrom`]}
                enterTo={ModalStyles[`sbui-modal--enterTo`]}
                leave={ModalStyles[`sbui-modal--leave`]}
                leaveFrom={ModalStyles[`sbui-modal--leaveFrom`]}
                leaveTo={ModalStyles[`sbui-modal--leaveTo`]}
                className="fixed inset-0 overflow-y-auto"
              >
                <div
                  className={modalClasses.join(' ')}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                  onClick={stopPropagation}
                  style={style}
                >
                  {header && <div className={__styles.header}>{header}</div>}
                  <div
                    className={ModalStyles['sbui-modal-content']}
                    style={contentStyle}
                  >
                    {children}
                  </div>
                  {!hideFooter && (
                    <div className={__styles.footer}>{footerContent}</div>
                  )}
                  {closable && (
                    <div className={ModalStyles['sbui-modal-close-container']}>
                      <Button
                        onClick={onCancel}
                        type="text"
                        shadow={false}
                        icon={<IconX size="medium" />}
                      />
                    </div>
                  )}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog.Content>
      </Transition>
    </Dialog.Root>
  )
}

export default Modal
