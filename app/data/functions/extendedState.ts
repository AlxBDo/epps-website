import type {
    CodeDeclarationTypes,
    ParameterPrototype,
    FunctionReturn,
    TypeRequired,
    FunctionPrototype
} from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Used to extend parent stores and adding persistence options.'

export const name: string = 'extendedState'

export const props: ParameterPrototype[] = [
    createParameterPrototype('parentsStores', 'Store[] | EppsStore<TStore, TState>[]', true),
    createParameterPrototype('options', 'ExtendedStateOptions', false)
]

export const requiredTypes: TypeRequired[] = []

export const returnType: FunctionReturn = 'ExtendedState'

export const type: CodeDeclarationTypes = 'function'

export default {
    name,
    description,
    props,
    requiredTypes,
    returnType,
    type
} as FunctionPrototype