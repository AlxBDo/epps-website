<script setup lang="ts">
import CodeDeclarationExplanation from '../shared/CodeDeclarationExplanation.vue';

import { createFunctionPrototype } from '~/utils/components/code-declaration';
import extendedStatePrototype from '~/datas/functions/extendedState'


const prototype = createFunctionPrototype(extendedStatePrototype)
</script>

<template>
    <CodeDeclarationExplanation :prototype></CodeDeclarationExplanation>
</template>