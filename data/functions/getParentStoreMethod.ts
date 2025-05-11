import type { CodeDeclarationTypes, ParameterPrototype, FunctionReturn, TypeRequired, FunctionPrototype } from "~/types/components";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Used to retrieve the function of a parent store'

export const name: string = 'getParentStoreMethod'

const parentsStoresPropsDesc = `Extended parent stores - this parameter is optional if you have provided 
an instance of the target store as a second parameter`

export const props: ParameterPrototype[] = [
    createParameterPrototype('methodName', 'string', true, 'Name of method to retrieve'),
    createParameterPrototype('parentStore', 'number | Store | string', true, 'Provide the index, id or store itself'),
    createParameterPrototype('parentsStores', 'Store[]', true, parentsStoresPropsDesc)
]

export const requiredTypes: TypeRequired[] = []

export const returnType: FunctionReturn = 'function'

export const type: CodeDeclarationTypes = 'function'

export default {
    name,
    description,
    props,
    requiredTypes,
    returnType,
    type
} as FunctionPrototype