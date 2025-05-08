import type { CodeDeclarationTypes, ParameterPrototype, FunctionReturn, TypeRequired } from "~/types/components";
import { createParameterPrototype, createTypeRequired } from "~/utils/components/code-declaration";


export const description: string = 'Define an extended and persised store'

export const name: string = 'defineEppsStore'

export const props: ParameterPrototype[] = [
    createParameterPrototype('storeId', 'string', true, 'Store id'),
    createParameterPrototype('storeDefinition', 'function', true, 'Store definition - use setup syntax')
]

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('StoreMethods', 'Defines the methods available in the store'),
    createTypeRequired('StateProperties', 'Defines the state properties of the store')
]

export const returnType: FunctionReturn = 'EppsStore'

export const type: CodeDeclarationTypes = 'function'

export default {
    name,
    description,
    props,
    requiredTypes,
    returnType,
    type
}