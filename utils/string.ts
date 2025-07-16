import { isEmpty } from "./validation";


export function capitalize(str: string): string {
    if (!isEmpty(str)) {
        return str.charAt(0).toUpperCase() + str.substring(1)
    }

    return str
}

export function firstCharToLowerCase(str: string): string {
    if (!isEmpty(str)) {
        return str.charAt(0).toLowerCase() + str.substring(1)
    }

    return str
}