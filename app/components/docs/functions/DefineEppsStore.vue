<script setup lang="ts">
import CodeDeclarationExplanation from '../common/CodeDeclarationExplanation.vue';

import { createFunctionPrototype } from '~/utils/components/code-declaration';
import defineEppsStorePrototype from '~/data/functions/defineEppsStore'


const prototype = createFunctionPrototype(defineEppsStorePrototype)
</script>

<template>
    <CodeDeclarationExplanation :prototype></CodeDeclarationExplanation>
</template>