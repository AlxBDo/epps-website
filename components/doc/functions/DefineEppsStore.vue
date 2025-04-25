<script setup lang="ts">
import CodeDeclarationExplanation from '../shared/CodeDeclarationExplanation.vue';

import { createFunctionPrototype } from '~/utils/components/code-declaration';
import defineEppsStorePrototype from '~/datas/functions/defineEppsStore'


const prototype = createFunctionPrototype(defineEppsStorePrototype)
</script>

<template>
    <CodeDeclarationExplanation :prototype></CodeDeclarationExplanation>
</template>