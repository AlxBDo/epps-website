import type {
    CodeDeclarationTypes,
    ParameterPrototype,
    FunctionReturn,
    TypeRequired,
    FunctionPrototype
} from "~/types/prototype";
import { createParameterPrototype, createTypeRequired } from "~/utils/components/code-declaration";


export const description: string = 'Used to retrieve a parent store'

export const name: string = 'getParentStore'

export const props: ParameterPrototype[] = [
    createParameterPrototype('storeIndexOrId', 'number | string', true, 'Store index or id'),
    createParameterPrototype('parentsStores', '() => array<Store | EppsStore>', true, 'ParentsStores function')
]

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('TStore', 'Interface or Type representing the methods of the parent Store'),
    createTypeRequired('TState', 'Interface or Type representing the state of the parent Store')
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
} as FunctionPrototype