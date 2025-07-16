import type {
    CodeDeclarationTypes,
    ParameterPrototype,
    FunctionReturn,
    TypeRequired,
    FunctionPrototype
} from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Used to retrieve the value of one of the parent store\'s state properties.'

export const name: string = 'getParentStorePropertyValue'

const parentsStoresPropsDesc = `Extended parent stores - this parameter is optional if you have provided 
an instance of the target store as a second parameter`

export const props: ParameterPrototype[] = [
    createParameterPrototype('propertyName', 'string', true, 'Name of state property to retrieve'),
    createParameterPrototype('parentStore', 'number | Store | string', true, 'Provide the index, id or store itself'),
    createParameterPrototype('parentsStores', 'Store[]', true, parentsStoresPropsDesc)
]

export const requiredTypes: TypeRequired[] = []

export const returnType: FunctionReturn = 'boolean | null | number | object | string | undefined'

export const type: CodeDeclarationTypes = 'function'

export default {
    name,
    description,
    props,
    requiredTypes,
    returnType,
    type
} as FunctionPrototype