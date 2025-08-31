import type { ClassPrototype, CodeDeclarationTypes } from "~/types/prototype";
import { createFunctionPrototype, createParameterPrototype, createTypeRequired } from "~/utils/components/code-declaration";


export const constructorProps = [
    createParameterPrototype('eppsOptions', 'EppsStoreOptions', true, 'Define store options')
]

export const description: string = 'Use this class to declare store options.'

const getStoreProps = [
    createParameterPrototype(
        'idOrIndex',
        'string | number',
        true,
        'id defined when creating the ParentStore instance or index of the ParentsStores array'
    )
]

const getStoreRequiredTypes = [
    createTypeRequired('TStore', 'Defines methods available in the store'),
    createTypeRequired('TState', 'Defines state properties of the store')
]

export const methods = [
    createFunctionPrototype({
        name: 'getStore',
        props: getStoreProps,
        returnType: 'EppsStore<TStore, TState>',
        requiredTypes: getStoreRequiredTypes
    }),
    createFunctionPrototype({
        name: 'getStores',
        returnType: 'EppsStore[]'
    })
]

export const name: string = 'Epps'

export const type: CodeDeclarationTypes = 'class'

export default {
    constructorProps,
    description,
    methods,
    name,
    type
} as ClassPrototype