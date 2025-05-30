import { defineEppsStore, extendedState, getParentStoreMethod } from "epps";
import { isEmpty } from "~/utils/validation";
import { usePropsDeclarationStore } from "./propsDeclaration";
import { useTypeDeclarationStore } from "./typesDeclaration";

import type { CodeDeclarationTypes, CodeDeclarationPrototype, ParameterPrototype, TypeRequired } from "~/types/components";
import type { PropsDeclarationState, PropsDeclarationStore } from "./propsDeclaration";
import type { TypeDeclarationState, TypeDeclarationStore } from "./typesDeclaration";


interface Prototype extends CodeDeclarationPrototype {
    properties?: ParameterPrototype[]
    props?: ParameterPrototype[]
    requiredTypes?: TypeRequired[]
    returnType?: string
    value?: string
}

export interface CodeDeclarationState extends PropsDeclarationState, TypeDeclarationState {
    description?: string
    name?: string
    propsExplanation: ParameterPrototype[]
    type?: CodeDeclarationTypes
    value?: string
}

export interface CodeDeclarationStore extends PropsDeclarationStore, TypeDeclarationStore {
    hasPropsExplanation: () => boolean
    initDeclaration: (prototype: Prototype) => void
}


export const useCodeDeclarationExplanationStore = (id: string) => defineEppsStore<CodeDeclarationStore, CodeDeclarationState>(
    `${id}CodeDeclarationExplanantionStore`,
    () => {
        const { parentsStores } = extendedState([useTypeDeclarationStore(id), usePropsDeclarationStore(id)])
        const propsExplanation = ref<ParameterPrototype[]>([])


        function createParameterExplanation(parameter: ParameterPrototype): void {
            if (parameter.description) {
                propsExplanation.value.push(parameter)
            }
        }

        function hasPropsExplanation(): boolean {
            return !isEmpty(propsExplanation.value)
        }

        function initDeclaration(prototype: Prototype, indent: number = 0): void {
            propsExplanation.value = []
            const ps = parentsStores && parentsStores()

            if (!Array.isArray(ps)) {
                throw new Error('TypeDeclarationStore and PropsDeclarationStore not found')
            }

            const typesStore = ps[0]
            const propsStore = ps[1]
            getParentStoreMethod('initProps', propsStore)(prototype.props, propCallback, indent)
            getParentStoreMethod('initTypes', typesStore)(prototype)
        }

        function propCallback(prop: ParameterPrototype): void {
            const ps = parentsStores && parentsStores()
            if (!Array.isArray(ps)) {
                throw new Error('TypeDeclarationStore and PropsDeclarationStore not found')
            }
            const typesStore = ps[0]

            getParentStoreMethod('addTypesToSee', typesStore)(prop.type)
            getParentStoreMethod('addTypesToSeeFromParameters', typesStore)(prop)
            createParameterExplanation(prop)
        }

        function propsToString(): string {
            return getParentStoreMethod('propsToString', 1, parentsStores && parentsStores())()
        }

        function requiredTypesToString(): string {
            return getParentStoreMethod('requiredTypesToString', 0, parentsStores && parentsStores())()
        }

        function returnTypeFormatted(returnType?: string): string {
            return getParentStoreMethod('returnTypeFormatted', 0, parentsStores && parentsStores())(returnType)
        }


        return {
            hasPropsExplanation,
            initDeclaration,
            parentsStores,
            propsExplanation,
            propsToString,
            requiredTypesToString,
            returnTypeFormatted
        }
    })()