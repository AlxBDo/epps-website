import { capitalize } from "vue"
import type { Item } from "../models/item"
import type { FunctionPrototype, ParameterPrototype } from "~/types/components"


export function getStoreDefinition(
    name: string,
    state?: ParameterPrototype[],
    methods?: FunctionPrototype[],
    description?: string
) {
    const title = capitalize(name)

    return {
        description: description ?? `Store for ${name}`,
        id: `use${title}Store`,
        methods,
        name,
        state,
        title,
        type: 'store'
    }
}

export const itemState: Item = {
    '@id': undefined,
    id: undefined
}