import type { ParameterPrototype } from "~/types/prototype"
import { isEmpty } from "~/utils/validation"


export interface PropsDeclarationState {
    props: string
}

export interface PropsDeclarationStore {
    initProps: (
        declarationProps?: ParameterPrototype[],
        propCallback?: (type: ParameterPrototype) => void,
        indentNumber?: number
    ) => void
    propsToString: () => string
}


export const usePropsDeclarationStore = (id: string) => defineStore(`${id}PropsStore`, () => {
    const props = ref<string>('')


    function initProps(
        declarationProps: ParameterPrototype[],
        propCallback?: (type: ParameterPrototype) => void,
        indentNumber: number = 0
    ): void {
        if (!isEmpty(declarationProps)) {
            const propsLength = declarationProps.length
            const hasLineReturn = propsLength > 1
            const indentText = hasLineReturn ? (indentNumber + 1) : indentNumber
            const rtn = hasLineReturn ? `\r\n${indent('', indentText)}` : ''
            let index = 0

            props.value = declarationProps.reduce((acc: string, curr: ParameterPrototype) => {
                if (acc.length > 0) {
                    acc += ', '
                }

                acc += `${rtn}${curr.name}: ${curr.type}`

                propCallback && propCallback(curr)
                index++

                if (propsLength === index && propsLength > 1) {
                    acc += `\r\n${indentNumber ? indent('', indentNumber) : ''}`
                }

                return acc
            }, '')
        }
    }

    function propsToString(): string {
        return `(${props.value})`
    }


    return {
        initProps,
        props,
        propsToString
    }
})()