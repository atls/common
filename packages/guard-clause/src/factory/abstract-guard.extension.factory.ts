/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { GuardError } from '../errors/index.js'

export interface AbstractGuardExtensionFactoryOptions {
  parameter: string
  metadata?: Record<string, any>
  options?: { optional?: boolean; each?: boolean }
}

export abstract class AbstractGuardExtensionFactory {
  private methodMap: Map<any, Map<string, Map<number, AbstractGuardExtensionFactoryOptions>>> =
    new Map()

  register(
    target: any,
    methodName: string,
    paramIndex: number,
    options: AbstractGuardExtensionFactoryOptions
  ): void {
    let paramMap: Map<string, Map<number, AbstractGuardExtensionFactoryOptions>> | undefined =
      this.methodMap.get(target)

    if (!paramMap) {
      paramMap = new Map()
      this.methodMap.set(target, paramMap)
    }

    if (!paramMap.has(methodName)) {
      paramMap.set(methodName, new Map())
    }

    paramMap.get(methodName)!.set(paramIndex, options)
  }

  perform(target: any, methodName: string, paramValues: Array<any>): Array<GuardError> {
    const methodMap: Map<string, Map<number, AbstractGuardExtensionFactoryOptions>> | undefined =
      this.methodMap.get(target)

    const errors: Array<GuardError> = []

    if (!methodMap) return errors

    const paramIndexes: Map<number, AbstractGuardExtensionFactoryOptions> | undefined =
      methodMap.get(methodName)

    if (!paramIndexes) return errors

    for (const [index, paramValue] of paramValues.entries()) {
      if (!paramIndexes.has(index)) continue
      const options = paramIndexes.get(index)

      if (options!.options?.optional && (paramValue === undefined || paramValue === null)) {
        continue
      }

      const values: Array<any> = options!.options?.each ? paramValue : [paramValue]

      if (!Array.isArray(values)) {
        errors.push(
          new GuardError('guard.against.not-array', String(index), paramValue, 'not array')
        )
        continue
      }

      values.forEach((value) => {
        try {
          this.performParamValue(value, options!)
        } catch (error) {
          if (!(error instanceof GuardError)) {
            throw error
          }
          errors.push(error)
        }
      })
    }

    return errors
  }

  abstract performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void
}
