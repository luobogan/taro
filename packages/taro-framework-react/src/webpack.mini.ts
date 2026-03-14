import { getLoaderMeta } from './loader-meta'

import type { IPluginContext } from '@tarojs/service'
import type { Frameworks } from './index'

export function modifyMiniWebpackChain (_ctx: IPluginContext, framework: Frameworks, chain) {
  setAlias(framework, chain)
  setLoader(framework, chain)
}

function setAlias (framework: Frameworks, chain) {
  const alias = chain.resolve.alias
  if (framework === 'react') {
    alias.set('react$', 'react')
    alias.set('react-dom$', '@tarojs/react')
    alias.set('react-dom/client$', '@tarojs/react')
  }
}

function setLoader (framework: Frameworks, chain) {
  chain.plugin('miniPlugin').tap((args) => {
    args[0].loaderMeta ||= {}
    Object.assign(args[0].loaderMeta, getLoaderMeta(framework))
    return args
  })
}
