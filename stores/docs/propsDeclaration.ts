import type { ParameterPrototype } from "~/types/components"
import { isEmpty } from "~/utils/validation"


export interface PropsDeclarationState {
    props: string
}

export interface PropsDeclarationStore {
    initProps: (declarationProps?: ParameterPrototype[]) => void
    propsToString: () => string
}


export const usePropsDeclarationStore = (id: string) => defineStore(`${id}PropsStore`, () => {
    const props = ref<string>('')


    function initProps(declarationProps: ParameterPrototype[], propCallback?: (type: ParameterPrototype) => void): void {
        if (!isEmpty(declarationProps)) {
            const propsLength = declarationProps.length
            const rtn = propsLength > 1 ? '\r\n' : ''
            let index = 0

            props.value = declarationProps.reduce((acc: string, curr: ParameterPrototype) => {
                if (acc.length > 0) {
                    acc += ', ' + rtn + '   '
                } else if (propsLength > 1) {
                    acc += rtn + '   '
                }

                acc += `${curr.name}: ${curr.type}`

                propCallback && propCallback(curr)
                index++

                if (propsLength === index) {
                    acc += rtn
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