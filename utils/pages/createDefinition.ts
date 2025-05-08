import { capitalize } from "vue"
import { dynamicImport } from "../data"

import type { ComponentResume, FunctionPrototype, InterfacePrototype, StorePrototype } from "~/types/components"
import type { PageDefinitionTypes } from '~/types/pages'
import type { AnyObject } from "epps"

export async function createDefinition(definitionType: PageDefinitionTypes, definitionName: string) {
    try {
        const prototype = await dynamicImport(
            `../data/${definitionType}/${definitionName}.ts`
        ) as FunctionPrototype | InterfacePrototype | StorePrototype

        const components = [] as ComponentResume[]
        const { name, type } = prototype
        const nameToDisplay = type === 'store' ? prototype.id : name
        const path = `doc/${definitionType}/${nameToDisplay}`
        const title = `${capitalize(type)} ${nameToDisplay}`

        return {
            components,
            id: nameToDisplay.toLowerCase(),
            path,
            title,
            ...(prototype as AnyObject).default,
        }
    } catch (e) {
        logError('pages/createDefinition', e)
    }
}