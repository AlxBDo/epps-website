export interface ComponentResume {
    description?: string
    id: string
    title: string
}

interface PrototypeBase { description?: string, name: string, type: string }

interface PrototypeWithTypeParams extends Omit<PrototypeBase, 'type'> {
    requiredTypes?: TypeRequired[]
    type: 'class' | 'function' | 'interface' | 'object' | 'type'
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
    properties: ParameterPrototype[]
}

export interface ParameterPrototype extends PrototypeBase {
    required: boolean
}

export interface StorePrototype extends PrototypeBase {
    id: string
    methods?: FunctionPrototype[]
    state: ParameterPrototype[]
    type: 'store'
}

export interface TypePrototype extends Omit<PrototypeWithTypeParams, 'type'> {
    type: 'type',
    value: string
}



export interface SlotCtn {
    name: string
    type?: SlotCtnType
}


export type CodeDeclarationTypes = 'array' | 'class' | 'function' | 'interface' | 'object' | 'type'

export type FunctionReturn = string

export type SlotCtnType = 'code' | 'explanation' | 'tip'

export type TypeRequired = { name: string, description: string, value?: string }
