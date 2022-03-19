<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-table
        grid
        title="Pokemons"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-header
      >
        <!-- <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <q-card-section class="text-center">
                <strong>{{ props.row.name }}</strong>
              </q-card-section>
              <q-separator />
              <q-card-section class="flex flex-center">
                <div>{{ 'test' }}</div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePokemonStore } from 'src/stores/pokemons-store';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const columns = [{ name: 'name', label: 'Name', field: 'name' }];

    const pokemons = usePokemonStore();
    pokemons.fetchPokemons();

    return {
      columns,
      rows: computed(() => pokemons.getPokemons),
    };
  },
});
</script>
