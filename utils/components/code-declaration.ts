import type { ParameterPrototype, FunctionPrototype, FunctionReturn, TypeRequired } from "~/types/components"


export function createParameterPrototype(name: string, type: string, required: boolean, description?: string): ParameterPrototype {
    return { description, name, type, required }
}

type CreateFunctionPrototypeProps = {
    name: string,
    props: ParameterPrototype[],
    returnType: FunctionReturn,
    requiredTypes?: TypeRequired[],
    description?: string
}

export function createFunctionPrototype({
    name,
    props,
    returnType = 'void',
    requiredTypes = [],
    description
}: CreateFunctionPrototypeProps): FunctionPrototype {
    return { description, name, props, requiredTypes, returnType, type: 'function' } as FunctionPrototype
}

export function createTypeRequired(name: string, description: string, value?: string): TypeRequired {
    return { name, description, value }
}