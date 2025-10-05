import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Experimental - interface used to define a function to be executed before or after the store action.'

export const name: string = 'actionFlow'

const callbackArgs = {
    after: 'This function receives as a parameter either an object containing the result returned by the initial function and its arguments, or an array of the arguments passed to the initial function.',
    before: 'This receives as a parameter an array of arguments passed to the initial function.'
}

const propertiesDefinition = 'If the value is a string, it must correspond to the name of an action in the store.'

const getDef = (when: 'after' | 'before') => `Function executed ${when} the store action. ${callbackArgs[when]} ${propertiesDefinition}`

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