import type { ClassPrototype, CodeDeclarationTypes } from "~/types/prototype";
import { createFunctionPrototype, createParameterPrototype } from "~/utils/components/code-declaration";


export const constructorProps = [
    createParameterPrototype('id', 'string', true, 'id used to create a unique ID for the parent store'),
    createParameterPrototype('store', 'Store', true, 'Store (without the closing parentheses)')
]

export const description: string = 'Use this class to add a parent store.'

const buildProps = [
    createParameterPrototype(
        'childId',
        'string',
        true,
        'Child store id'
    )
]

export const methods = [
    createFunctionPrototype({
        name: 'build',
        props: buildProps,
        returnType: 'EppsStore'
    }),
]

export const name: string = 'ParentStore'

export const type: CodeDeclarationTypes = 'class'

export default {
    constructorProps,
    description,
    methods,
    name,
    type
} as ClassPrototype