import type { AnyObject } from "~/types"

export async function dynamicImport(path: string, properties?: string[]) {
    return new Promise((resolve) => {
        import(
            /* @vite-ignore */
            path
        ).then((prototype: any) => {
            if (properties && typeof prototype === 'object') {
                prototype = Object.keys(prototype).reduce((acc, key: string) => {
                    if (properties.includes(key)) {
                        acc[key] = prototype[key]
                    }
                    return acc
                }, {} as AnyObject)
            }
            resolve(prototype)
        })
    }).catch((error) => logError(`Dynamic import - path : ${path}`, error))
}