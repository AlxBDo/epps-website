<script setup lang="ts">
import CodeDeclarationExplanation from '../common/CodeDeclarationExplanation.vue';

import { createFunctionPrototype } from '~/utils/components/code-declaration';
import extendedStatePrototype from '~/data/functions/extendedState'


const prototype = createFunctionPrototype(extendedStatePrototype)
</script>

<template>
    <CodeDeclarationExplanation :prototype>
        <template #description>
            <p>
                The extendedState function makes it easy to create Epps Store states.
            </p>
        </template>

        <template #propsExplanation>
            <ul class="text-sm font-light">
                <li>
                    <span class="font-bold">parentsStores</span>: list of stores you want to extend
                </li>
                <li>
                    <p>
                        <span class="font-bold">options</span> -
                        <span class="text-xs font-light italic">optional</span>:
                        object defining Store extension and persistence options
                    </p>

                    <table>
                        <tr>
                            <th>Key</th>
                            <th>Description</th>
                            <th>Default value</th>
                        </tr>
                        <tr>
                            <td>actionsToExtends</td>
                            <td>list of stores methods to be extended</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>isOptionApi</td>
                            <td>Is the store defined with the OptionApi syntax?</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>persist</td>
                            <td>object defining Store persistence options</td>
                            <td>-</td>
                        </tr>
                    </table>

                    <table>
                        <caption>option.persist</caption>
                        <tr>
                            <th>Key</th>
                            <th>Description</th>
                            <th>Default value</th>
                        </tr>
                        <tr>
                            <td>excludedKeys</td>
                            <td>list of state properties not persisted</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>persist</td>
                            <td>
                                If set to “true”, the Store benefits from persistence features. Is set to “true”,
                                if another persistence option is defined.
                            </td>
                            <td>undefined | true</td>
                        </tr>
                        <tr>
                            <td>persistedPropertiesToEncrypt</td>
                            <td>list of state properties to encrypt</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>watchMutation</td>
                            <td>If set to “true”, the State will be persisted on each modification</td>
                            <td>-</td>
                        </tr>
                    </table>
                </li>
            </ul>
        </template>
    </CodeDeclarationExplanation>
</template>

<style scoped>
table {
    margin: 15px auto 0;
    width: 90%;
    font-size: small;

    caption {
        text-align: left;
        padding: 5px 0;
        text-decoration: underline;
        font-weight: bold;
    }

    td {
        padding: 2px 5px;
    }
}
</style>