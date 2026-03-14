/* eslint-disable @typescript-eslint/no-unused-vars */
import { ensure, isFunction } from '@tarojs/shared'
import React, {
  act,
  Children,
  cloneElement,
  Component,
  createContext,
  createElement,
  createRef,
  forwardRef,
  Fragment,
  isValidElement,
  lazy,
  memo,
  Profiler,
  PureComponent,
  startTransition,
  StrictMode,
  Suspense,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version
} from 'react'

import { internalInstanceKey } from './constant'
import { finishEventHandler } from './event'
import { TaroReconciler } from './reconciler'
import { ContainerMap, createRoot, render } from './render'

import type { TaroElement } from '@tarojs/runtime'
import type { ReactNode } from 'react'

let isInsideEventHandler = false

// 重新包裹 batchedUpdates，使其可以在触发事件后执行 finishEventHandler
const unstable_batchedUpdates = (fn, a) => {
  if (isInsideEventHandler) {
    return fn(a)
  }

  isInsideEventHandler = true

  try {
    return TaroReconciler.batchedUpdates(fn, a)
  } finally {
    isInsideEventHandler = false
    finishEventHandler()
  }
}

function unmountComponentAtNode (dom: TaroElement) {
  ensure(dom && [1, 8, 9, 11].includes(dom.nodeType), 'unmountComponentAtNode(...): Target container is not a DOM element.')

  const root = ContainerMap.get(dom)

  if (!root) return false

  unstable_batchedUpdates(() => {
    root.unmount(() => {
      ContainerMap.delete(dom)
    })
  }, null)

  return true
}

function findDOMNode (comp?: TaroElement | ReactNode) {
  if (comp == null) {
    return null
  }

  const nodeType = (comp as TaroElement).nodeType
  if (nodeType === 1 || nodeType === 3) {
    return comp
  }

  return TaroReconciler.findHostInstance(comp as Record<string, any>)
}

const portalType = isFunction(Symbol) && Symbol.for
  ? Symbol.for('react.portal')
  : 0xeaca

function createPortal (
  children: ReactNode,
  containerInfo: TaroElement,
  key?: string
) {
  return {
    $$typeof: portalType,
    key: key == null ? null : String(key),
    children,
    containerInfo,
    implementation: null
  }
}

const flushSync = TaroReconciler.flushSync

export {
  act,
  Children,
  cloneElement,
  Component,
  createContext,
  createElement,
  createPortal,
  createRef,
  createRoot,
  findDOMNode,
  flushSync,
  forwardRef,
  Fragment,
  internalInstanceKey,
  isValidElement,
  lazy,
  memo,
  Profiler,
  PureComponent,
  React,
  render,
  startTransition,
  StrictMode,
  Suspense,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version
}

export default {
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  startTransition,
  memo,
  forwardRef,
  createContext,
  createElement,
  createRef,
  cloneElement,
  isValidElement,
  Fragment,
  Component,
  PureComponent,
  StrictMode,
  Suspense,
  Profiler,
  Children,
  lazy,
  act,
  version,
  render,
  flushSync,
  createRoot,
  unstable_batchedUpdates,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  internalInstanceKey,
  React
}
