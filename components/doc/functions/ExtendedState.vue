<script setup lang="ts">
import CodeDeclarationExplanation from '../common/CodeDeclarationExplanation.vue';

import { createFunctionPrototype } from '~/utils/components/code-declaration';
import extendedStatePrototype from '~/data/functions/extendedState'


const prototype = createFunctionPrototype(extendedStatePrototype)
</script>

<template>
    <CodeDeclarationExplanation :prototype></CodeDeclarationExplanation>
</template>