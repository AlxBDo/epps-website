import { defineEppsStore, extendedState, getParentStoreMethod } from "epps";
import { isEmpty } from "~/utils/validation";
import { pages } from "~/utils/pages/resumes";
import { useTypeDeclarationStore } from "./typesDeclaration";

import type { AnyObject } from "epps";
import type { CodeDeclarationTypes, CodeDeclarationPrototype, ParameterPrototype, TypeRequired, FunctionReturn } from "~/types/components";
import type { TypeDeclarationState, TypeDeclarationStore } from "./typesDeclaration";


interface Prototype extends CodeDeclarationPrototype {
    properties?: ParameterPrototype[]
    props?: ParameterPrototype[]
    requiredTypes?: TypeRequired[]
    returnType?: string
    value?: string
}

export interface CodeDeclarationState extends TypeDeclarationState {
    description?: string
    name?: string
    props?: string
    propsExplanation: ParameterPrototype[]
    type?: CodeDeclarationTypes
    value?: string
}

export interface CodeDeclarationStore extends TypeDeclarationStore {
    hasPropsExplanation: () => boolean
    initDeclaration: (prototype: Prototype) => void
    initProps: (declarationProps?: ParameterPrototype[]) => void

}


export const useCodeDeclarationExplanationStore = (id: string) => defineEppsStore<CodeDeclarationStore, CodeDeclarationState>(
    `${id}CodeDeclarationExplanantionStore`,
    () => {
        const { parentsStores } = extendedState([useTypeDeclarationStore(id)])
        const description = ref<string>('')
        const name = ref<string>('')
        const props = ref<string>('')
        const propsExplanation = ref<ParameterPrototype[]>([])
        const type = ref<CodeDeclarationTypes>()
        const value = ref<string>('')


        function createParameterExplanation(parameter: ParameterPrototype): void {
            if (parameter.description) {
                propsExplanation.value.push(parameter)
            }
        }

        function hasPropsExplanation(): boolean {
            return !isEmpty(propsExplanation.value)
        }

        function initDeclaration(prototype: Prototype): void {
            getParentStoreMethod('addTypesToSeeFromParameters', 0)(prototype.properties)
            initProps(prototype.props)
            getParentStoreMethod('initRequiredType', 0)(prototype.requiredTypes)

            if (prototype.returnType) {
                getParentStoreMethod('addTypesToSee', 0)(prototype.returnType)
            }
            if (prototype.value) {
                getParentStoreMethod('addTypesToSee', 0)(prototype.value)
            }
        }

        function initProps(declarationProps?: ParameterPrototype[]): void {
            propsExplanation.value = []
            if (declarationProps && !isEmpty(declarationProps)) {
                const declarationPropsLength = declarationProps.length
                const rtn = declarationPropsLength > 1 ? '\r\n' : ''
                let index = 0

                props.value = declarationProps.reduce((acc: string, curr: ParameterPrototype) => {
                    if (acc.length > 0) {
                        acc += ', ' + rtn + '   '
                    } else if (declarationPropsLength > 1) {
                        acc += rtn + '   '
                    }

                    acc += `${curr.name}: ${curr.type}`

                    getParentStoreMethod('addTypesToSee', 0)(curr.type)
                    createParameterExplanation(curr)
                    index++

                    if (declarationPropsLength === index) {
                        acc += rtn
                    }

                    return acc
                }, '')
            }
        }

        function propsToString(): Ref<string> {
            return props
        }


        return {
            hasPropsExplanation,
            initDeclaration,
            parentsStores,
            propsExplanation,
            propsToString
        }
    })()