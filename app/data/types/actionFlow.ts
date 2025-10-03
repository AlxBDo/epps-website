import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Experimental - interface used to define a function to be executed before or after the store action.'

export const name: string = 'actionFlow'

const propertiesDefinition = 'If the value is a string, it must correspond to the name of an action in the store.'

const getDef = (when: string) => `Function executed ${when} the store action. ${propertiesDefinition}`

export const properties: ParameterPrototype[] = [
    createParameterPrototype('after', 'string | Function', false, getDef('after')),
    createParameterPrototype('before', 'string | Function', false, `${getDef('before')} Retrieve arguments passed to the action to modify them or use them in another function.`)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype