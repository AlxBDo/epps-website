import { defineEppsStore, Epps, ParentStore } from "epps";
import { isEmpty } from "~/utils/validation";
import { usePropsDeclarationStore } from "./propsDeclaration";
import { useTypeDeclarationStore } from "./typesDeclaration";

import type { CodeDeclarationTypes, CodeDeclarationPrototype, ParameterPrototype, TypeRequired } from "~/types/prototype";
import type { PropsDeclarationState, PropsDeclarationStore } from "./propsDeclaration";
import type { TypeDeclarationState, TypeDeclarationStore, TypesProps } from "./typesDeclaration";


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

const epps = new Epps({
    parentsStores: [
        new ParentStore('code', useTypeDeclarationStore),
        new ParentStore('code', usePropsDeclarationStore)
    ]
})

export const useCodeDeclarationExplanationStore = (id: string) => defineEppsStore<CodeDeclarationStore, CodeDeclarationState>(
    `${id}CodeDeclarationExplanantionStore`,
    () => {
        const propsExplanation = ref<ParameterPrototype[]>([])


        function createParameterExplanation(parameter: ParameterPrototype): void {
            if (parameter.description) {
                propsExplanation.value.push(parameter)
            }
        }

        function getPropsDeclarationStore() {
            return epps.getStore<PropsDeclarationStore, PropsDeclarationState>(
                1, `${id}CodeDeclarationExplanantionStore`
            )
        }

        function getTypesDeclarationStore() {
            return epps.getStore<TypeDeclarationStore, TypeDeclarationState>(
                0, `${id}CodeDeclarationExplanantionStore`
            )
        }

        function hasPropsExplanation(): boolean {
            return !isEmpty(propsExplanation.value)
        }

        function initDeclaration(prototype: Prototype, indent: number = 0): void {
            propsExplanation.value = []

            const typesStore = getTypesDeclarationStore()
            const propsStore = getPropsDeclarationStore()

            typesStore?.initTypes(prototype as TypesProps)
            propsStore?.initProps(prototype.props, propCallback, indent)
        }

        function propCallback(prop: ParameterPrototype): void {
            const typesStore = getTypesDeclarationStore()
            typesStore?.addTypesToSee(prop.type)
            createParameterExplanation(prop)
        }

        function propsToString(): string {
            return getPropsDeclarationStore()?.propsToString() as string
        }

        function requiredTypesToString() {
            return getTypesDeclarationStore()?.requiredTypesToString()
        }

        function returnTypeFormatted(returnType?: string): string {
            return getTypesDeclarationStore()?.returnTypeFormatted(returnType) as string
        }


        return {
            hasPropsExplanation,
            initDeclaration,
            propsExplanation,
            propsToString,
            requiredTypesToString,
            returnTypeFormatted
        }
    }, epps)()