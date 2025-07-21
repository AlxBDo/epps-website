import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Represents errorsStore methods.'

export const name: string = 'ErrorsStore'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('addError', '(error: TError | Error) => void', false),
    createParameterPrototype('clearErrors', '() => void', false),
    createParameterPrototype('getError', '(criteria: object) => TError | Error | undefined', false),
    createParameterPrototype(
        'getErrors', '(value: boolean | number | string, findBy: string = "level") => TError[] | Error[]', false
    ),
    createParameterPrototype('hasError', '(level?: number) => boolean', false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype