<script setup lang="ts">
import CodeDeclarationExplanation from './CodeDeclarationExplanation.vue'

import type { PageDefinitionTypes, PageResume } from '~/types/pages'
import type { ClassPrototype, FunctionPrototype, InterfacePrototype, StorePrototype as StorePrototypeInterface } from '~/types/prototype'
import { separator } from '#build/ui'
import { useVerticalMenuStore } from '~/stores/docs/verticalMenu'


const definitionProps = defineProps({
    displayTitle: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
    },
    separator: {
        type: Boolean,
        default: false
    },
    type: {
        type: String as PropType<PageDefinitionTypes>,
        required: true,
    },
})

const { getPageDefinition } = usePagesDefinitions()

const isSubDeclaration = ref(false)

const definition = getPageDefinition(
    definitionProps.type, definitionProps.name
) as PageResume & (ClassPrototype | FunctionPrototype | InterfacePrototype | StorePrototypeInterface)

if (definitionProps.separator) {
    const verticalMenu = useVerticalMenuStore()
    verticalMenu.addItem(definitionProps.name)
    isSubDeclaration.value = true
}
</script>

<template>
    <Suspense>
        <template #default>
            <div>
                <USeparator v-if="separator" class="mt-20" color="neutral" orientation="horizontal" type="dashed" />
                <CodeDeclarationExplanation :display-title :is-sub-declaration
                    :prototype="(definition as ClassPrototype | FunctionPrototype | InterfacePrototype)" />
            </div>
        </template>
        <template #fallback>
            <p>Loading definition...</p>
        </template>
    </Suspense>
</template>