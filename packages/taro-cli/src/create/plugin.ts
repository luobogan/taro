import * as path from 'node:path'

import { chalk, fs } from '@tarojs/helper'

import { getRootPath } from '../util'
import Creator from './creator'

// 动态导入@tarojs/binding
let createPlugin: any

async function loadBinding() {
  if (!createPlugin) {
    const binding = await import('@tarojs/binding')
    createPlugin = binding.createPlugin
  }
}

export interface IPluginConf {
  pluginName: string
  type: string
  description?: string
  projectDir: string
  projectName: string
  template: string
  version:string
}

export default class Plugin extends Creator {
  public conf: IPluginConf

  constructor (options: IPluginConf) {
    super()
    this.conf = {
      ...options,
      projectName: path.basename(options.projectDir),
      version: this.getCliVersion()
    }
  }

  getCliVersion () {
    const pkgPath = path.join(this._rootPath, 'package.json')
    const pkg = fs.readJSONSync(pkgPath)
    return pkg.version
  }

  async create () {
    const { projectDir, template, pluginName } = this.conf
    const templatePath = this.templatePath(template)

    if (!fs.existsSync(templatePath)) {
      console.log(chalk.red(`创建插件失败：找不到模板${templatePath}`))
      return
    }
    // 加载binding
    await loadBinding()

    createPlugin({
      projectRoot: projectDir,
      projectName: pluginName,
      templateRoot: getRootPath(),
      template,
      version: this.conf.version,
      description: this.conf.description,
      pluginType: this.conf.type,
    })
  }
}
