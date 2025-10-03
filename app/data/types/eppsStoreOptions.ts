import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines the optional configuration for Epps Store.'

export const name: string = 'EppsStoreOptions'

const actionFlowsDefinition = 'Experimental - Object whose property names correspond to the name of the store action for which a flow will be defined. The value of each property is an object containing one or both of the “after” and “before” keys, which are used to define a function to be executed before or after the store action.'
const actionsToExtendsDefinition = 'List of method names to extend. The child store method will be executed first, then the parent store method will be called with the same parameters.'
const actionToRenameDefinition = 'Object whose property names correspond to the names of the methods in the parent store to be renamed, and whose property values correspond to the names of the methods in the child store.'
const parentsStoresDefinition = 'Array of instances of the ParentStore class.'
const persistDefinition = 'Object defining the persistence options for the store.'
const propertiesToRenameDefinition = 'Object whose property names correspond to the names of the state in the parent store to be renamed, and whose property values correspond to the names of the state in the child store.'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('actionFlows', 'ActionFlows', false, actionFlowsDefinition),
    createParameterPrototype('actionsToExtends', 'string[]', false, actionsToExtendsDefinition),
    createParameterPrototype('actionsToRename', '{ [key: string]: string }', false, actionToRenameDefinition),
    createParameterPrototype('parentsStores', 'ParentStore[]', false, parentsStoresDefinition),
    createParameterPrototype('persist', 'persistStoreOptions', false, persistDefinition),
    createParameterPrototype('propertiesToRename', '{ [key: string]: string }', false, propertiesToRenameDefinition)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype