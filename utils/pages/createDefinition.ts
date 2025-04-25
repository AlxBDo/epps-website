import { capitalize } from "vue"
import { dynamicImport } from "../data"

import type { ComponentResume, FunctionPrototype, InterfacePrototype } from "~/types/components"
import type { PageDefinitionTypes } from '~/types/pages'

export async function createDefinition(definitionType: PageDefinitionTypes, definitionName: string) {
    try {
        const prototype = await dynamicImport(
            `../datas/${definitionType}/${definitionName}.ts`
        ) as FunctionPrototype | InterfacePrototype

        const components = [] as ComponentResume[]
        const { name, type } = prototype
        const path = `doc/${definitionType}/${name}`
        const title = `${capitalize(type)} ${name}`

        return {
            components,
            id: name.toLowerCase(),
            path,
            title,
            ...prototype,
        }
    } catch (e) {
        logError('pages/createDefinition', e)
    }
}