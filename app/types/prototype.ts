import type { ParentsStoresEppsOption } from "./stores"

interface PrototypeBase { description?: string, name: string, type: string }

interface PrototypeWithTypeParams extends Omit<PrototypeBase, 'type'> {
    requiredTypes?: TypeRequired[]
    type: 'class' | 'function' | 'interface' | 'object' | 'store' | 'type'
}

export interface ClassPrototype extends ObjectPrototype {
    constructorProps?: ParameterPrototype[]
    methods?: FunctionPrototype[]
    type: 'class'
}

export interface CodeDeclarationPrototype extends Omit<PrototypeBase, 'type'> {
    type: CodeDeclarationTypes
}

export interface FunctionPrototype extends Omit<PrototypeWithTypeParams, 'type'> {
    type: 'function'
    props?: ParameterPrototype[]
    returnType: string
}

export interface InterfacePrototype extends Omit<ObjectPrototype, 'type'> {
    type: 'interface'
}

export interface ObjectPrototype extends PrototypeWithTypeParams {
    properties?: ParameterPrototype[]
}

export interface ParameterPrototype extends PrototypeBase {
    required: boolean
}

export interface StorePrototype extends PrototypeWithTypeParams {
    actionsToExtends?: string[]
    id: string
    idIsParam?: true
    isEppsStore: boolean
    methods?: FunctionPrototype[]
    parentsStores?: string[] | ParentsStoresEppsOption
    state: ParameterPrototype[]
    stateType?: string
    storeType?: string
    type: 'store'
    watchMutation?: boolean
}

export interface TypePrototype extends Omit<PrototypeWithTypeParams, 'type'> {
    type: 'type',
    value: string
}


export type CodeDeclarationTypes = 'array' | 'class' | 'function' | 'interface' | 'object' | 'type'

export type FunctionReturn = string

export type TypeRequired = { name: string, description: string, value?: string }