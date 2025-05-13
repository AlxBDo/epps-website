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

        function initDeclaration(prototype: Prototype): void {
            propsExplanation.value = []
            const ps = parentsStores && parentsStores()

            getParentStoreMethod('addTypesToSeeFromParameters', 0, ps)(prototype.properties)
            getParentStoreMethod('initProps', 1, ps)(prototype.props, propCallback)
            getParentStoreMethod('initRequiredType', 0, ps)(prototype.requiredTypes)

            if (prototype.returnType) {
                getParentStoreMethod('addTypesToSee', 0, ps)(prototype.returnType)
            }
            if (prototype.value) {
                getParentStoreMethod('addTypesToSee', 0, ps)(prototype.value)
            }
        }

        function propCallback(prop: ParameterPrototype): void {
            getParentStoreMethod('addTypesToSee', 0, parentsStores && parentsStores())(prop.type)
            createParameterExplanation(prop)
        }


        return {
            hasPropsExplanation,
            initDeclaration,
            parentsStores,
            propsExplanation
        }
    })()