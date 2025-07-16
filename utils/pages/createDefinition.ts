import { capitalize } from "vue"
import { dynamicImport } from "../data"

import type { ComponentResume } from "~/types/components"
import type {
    FunctionPrototype,
    InterfacePrototype,
    StorePrototype,
    TypePrototype
} from "~/types/prototype"
import type { PageDefinitionTypes } from '~/types/pages'
import type { AnyObject } from "epps"


export function createDefinition(
    definitionType: PageDefinitionTypes, prototype: FunctionPrototype | InterfacePrototype | StorePrototype | TypePrototype
) {
    try {
        const components = [] as ComponentResume[]
        const { name, type } = prototype
        const nameToDisplay = type === 'store' ? prototype.id : name
        const path = `docs/${definitionType}/${nameToDisplay}`
        const title = `${capitalize(type)} ${nameToDisplay}`

        return {
            ...prototype,
            components,
            id: nameToDisplay.toLowerCase(),
            path,
            title
        }
    } catch (e) {
        logError('pages/createDefinition', e)
    }
}

export async function createDynamicDefinition(definitionType: PageDefinitionTypes, definitionName: string) {
    try {
        const prototype = await dynamicImport(
            `../data/${definitionType}/${definitionName}.ts`
        ) as FunctionPrototype | InterfacePrototype | StorePrototype

        const components = [] as ComponentResume[]
        const { name, type } = prototype
        const nameToDisplay = type === 'store' ? prototype.id : name
        const path = `docs/${definitionType}/${nameToDisplay}`
        const title = `${capitalize(type)} ${nameToDisplay}`

        return {
            ...(prototype as AnyObject).default,
            components,
            id: nameToDisplay.toLowerCase(),
            path,
            title
        }
    } catch (e) {
        logError('pages/createDefinition', e)
    }
}