import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Experimental - Object whose property names correspond to the name of the store action for which a flow will be defined. The value of each property is an object containing one or both of the “after” and “before” keys, which are used to define a function to be executed before or after the store action. '

export const name: string = 'actionFlows'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('[key: string]', 'ActionFlow', true)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype