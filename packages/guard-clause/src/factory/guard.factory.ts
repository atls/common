/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { GuardError }                           from '../errors/index.js'
import type { AbstractGuardExtensionFactoryOptions } from './abstract-guard.extension.factory.js'
import type { AbstractGuardExtensionFactory }        from './abstract-guard.extension.factory.js'

import { GuardErrors }                               from '../errors/index.js'

export class GuardFactory {
  private static extensions: Map<
    AbstractGuardExtensionFactory['constructor'],
    AbstractGuardExtensionFactory
  > = new Map()

  private static extensionsByTargetMethod: Map<
    any,
    Map<string, Set<AbstractGuardExtensionFactory['constructor']>>
  > = new Map()

  static registerExtension(extension: AbstractGuardExtensionFactory): void {
    this.extensions.set(extension.constructor, extension)
  }

  static register(
    extension: typeof AbstractGuardExtensionFactory,
    target: any,
    methodName: string,
    paramIndex: number,
    options: AbstractGuardExtensionFactoryOptions
  ): void {
    if (this.extensions.has(extension)) {
      this.extensions.get(extension)!.register(target, methodName, paramIndex, options)

      if (!this.extensionsByTargetMethod.has(target)) {
        this.extensionsByTargetMethod.set(target, new Map())
      }

      if (!this.extensionsByTargetMethod.get(target)!.has(methodName)) {
        this.extensionsByTargetMethod.get(target)!.set(methodName, new Set())
      }

      this.extensionsByTargetMethod.get(target)!.get(methodName)?.add(extension)
    } else {
      throw new Error(`Extension for ${extension.constructor.name} not registered`)
    }
  }

  static perform(target: any, methodName: string, paramValues: Array<any>): void {
    const errors: Array<GuardError> = []

    this.extensionsByTargetMethod
      .get(target)
      ?.get(methodName)
      ?.forEach((extension) => {
        this.extensions
          .get(extension)!
          .perform(target, methodName, paramValues)
          .reverse()
          .forEach((error) => {
            errors.push(error)
          })
      })

    if (errors.length > 0) {
      throw new GuardErrors(errors.reverse())
    }
  }
}
