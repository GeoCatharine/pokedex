<template>
  <pokemon-table />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import PokemonTable from 'src/components/PokemonTable.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { PokemonTable },
});
</script>
