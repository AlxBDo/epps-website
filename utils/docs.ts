import type { AnyObject } from "epps"
import { isEmpty } from "./validation"


export function arrayToString(array: Array<number | object | string>, indentNumber: number = 0): string {
    if (!isEmpty(array)) {
        const rtnCondition = {
            bigint: 4,
            boolean: 5,
            function: 0,
            number: 8,
            object: 0,
            string: 4,
            symbol: 8,
            undefined: 4
        }
        const hasLineReturn = rtnCondition[typeof array[0]] < array.length
        const rtn: string = hasLineReturn ? (`
` + indent('', indentNumber)) : ''

        const text = array.reduce((acc: string, curr) => {
            if (acc.length > 0) {
                acc += `,` + rtn
            }

            acc += varToString(curr, hasLineReturn ? (indentNumber + 1) : indentNumber)

            return acc
        }, '')

        return `[${rtn}${text} ${rtn}]`
    }

    return ''
}

export function getScriptSetup(code: string, isJs: boolean = false): string {
    return `<script setup lang="${isJs ? 'js' : 'ts'}">
${code}
</script>
`
}

export function indent(text: string, indentNumber: number, indented: number = 0): string {
    if (indentNumber) {
        text = `    ${text}`
        indented++

        if (indentNumber > indented) {
            text = indent(text, indentNumber, indented)
        }
    }

    return text
}

export function objectToString(object: AnyObject, indentNumber: number = 0): string {
    if (!isEmpty(object)) {
        const keys = Object.keys(object)
        const keysLength = keys.length
        const hasLineReturn = keysLength > 3
        const indentText = hasLineReturn ? (indentNumber + 1) : 0
        const rtn = !hasLineReturn ? '' : `
`
        const text = keys.reduce((acc: string, curr: string) => {
            if (!isEmpty(object[curr])) {
                if (acc.length > 0) { acc += `, ${rtn}` }
                acc += indent(`${curr}: '${varToString(object[curr])}'`, indentText)
            }

            return acc
        }, ``)

        return indent('{ ', indentNumber) + rtn + text + rtn + indent(' }', hasLineReturn ? indentNumber : 0)
    }

    return ''
}

export function varToString(varToStr: any, indent: number = 0): string {
    if (!varToStr) { return '' }

    const type = typeof varToStr

    if (type === "object") {
        return Array.isArray(varToStr) ? arrayToString(varToStr, indent) : objectToString(varToStr, indent)
    } else {
        return type === 'string' ? varToStr : varToStr.toString()
    }
}