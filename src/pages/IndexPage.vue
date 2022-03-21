<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-table
        grid
        title="Pokemons"
        :card-container-class="cardContainerClass"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        v-model:pagination="pagination"
        :rows-per-page-options="rowsPerPageOptions"
      >
        <template v-slot:top-right>
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
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <q-card-section class="text-center">
                <strong>{{ props.row.name }}</strong>
              </q-card-section>
              <q-separator />
              <q-card-section class="flex flex-center">
                <div>
                  <img
                    v-if="props.row.info"
                    :src="props.row.info.sprites.front_default"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { usePokemonStore } from 'src/stores/pokemons-store';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const $q = useQuasar();

    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 3;
      }
      if ($q.screen.lt.md) {
        return 6;
      }
      return 9;
    }
    const filter = ref('');
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });

    watch(
      () => $q.screen.name,
      () => {
        pagination.value.rowsPerPage = getItemsPerPage();
      }
    );

    const columns = [{ name: 'name', label: 'Name', field: 'name' }];

    const pokemons = usePokemonStore();
    pokemons.fetchPokemons();

    return {
      columns,
      rows: computed(() => pokemons.getPokemons),
      filter,
      pagination,

      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? 'grid-masonry grid-masonry--' + ($q.screen.gt.sm ? '3' : '2')
          : null;
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
    };
  },
});
</script>
