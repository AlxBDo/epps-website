<script setup lang="ts">
import defineEppsStore from '~/data/functions/defineEppsStore';
import eppsStoreOptions from '~/data/types/eppsStoreOptions';
import { useCodeDeclarationExplanationStore, type CodeDeclarationState, type CodeDeclarationStore } from '~/stores/docs/codeDeclarationExplanation';
import ExplanationContainer from '../common/ExplanationContainer.vue';
import Prototype from '../docs/common/Prototype.vue';
import type { EppsStore } from 'epps';


const codeDeclarationStore = useCodeDeclarationExplanationStore('usingDefineEppsStore') as EppsStore<CodeDeclarationStore, CodeDeclarationState>
codeDeclarationStore.initDeclaration(defineEppsStore)

const { name, props, requiredTypes, returnType, type } = defineEppsStore
</script>

<template>
    <ExplanationContainer id="using-defineEppsStore">
        <template #subtitle>Using defineEppsStore</template>
        <template #explanation>
            <p>
                To have your store inherit from a parent store or be persistent,
                use the defineEppsStore function to define your Pinia store.
            </p>
            <p>
                The Epps store options are defined using the third parameter.
                The EppsStoreOptions interface represents the options.
            </p>

            <div>
                <h5 class="ml-4 mt-4 text-sm underline">- defineEppsStore prototype -</h5>
                <Prototype :display-title="false" name="usingDefineEppsStore" :props :required-types :return-type :type>
                </Prototype>
            </div>

            <div>
                <h5 class="ml-4 mt-4 text-sm underline">- EppsStoreOptions prototype -</h5>
                <Prototype :display-title="false" :name="eppsStoreOptions.name"
                    :properties="eppsStoreOptions.properties" :type="eppsStoreOptions.type"></Prototype>
            </div>
        </template>
    </ExplanationContainer>
</template>