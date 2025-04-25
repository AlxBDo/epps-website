import { isEmpty } from "./validation";


export function firstCharToLowerCase(str: string): string {
    if (!isEmpty(str)) {
        return str.charAt(0).toLowerCase() + str.substring(1)
    }

    return str
}