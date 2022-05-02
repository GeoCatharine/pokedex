<template>
  <q-page class="column items-center justify-evenly">
    <div class="q-pa-xl">
      <q-table
        grid
        title="Pokemons:"
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

        <template v-slot:item="pokemon">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 q-gutter-md">
            <router-link
              :to="`/pokemon/` + pokemon.row.name"
              @click="() => onPokemonClick(pokemon.row)"
            >
              <q-card>
                <q-card-section class="text-center">
                  <strong class="text-capitalize">{{
                    pokemon.row.name
                  }}</strong>
                </q-card-section>
                <q-separator />
                <q-card-section class="flex flex-center">
                  <div>
                    <img
                      v-if="pokemon.row.info"
                      :src="pokemon.row.info.sprites.front_default"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </router-link>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { usePokemonStore, Pokemon } from 'src/stores/pokemons-store';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'PokemonTable',
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

    const columns = [
      { name: 'name', label: 'Name', field: 'name', style: 'width: 70%' },
    ];

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
          : undefined;
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),

      onPokemonClick: (pokemon: Pokemon) => {
        pokemons.setSelectedPokemon(pokemon);
      },
    };
  },
});
</script>

<style lang="sass">

.q-pa-xl
  width: 70%

.q-table__title
  font-size: 35px
  color: $light

.q-table__bottom-item
  color: $light

.q-field__inner
  width: 200px
  background-color: darken($secondary, 6)
  border-radius: 4px

  .q-field__native
    padding-left: 10px
    color: $light

.q-field__append
  padding-right: 10px

.q-field__marginal
  color: $light

.text-capitalize
  font-size: 20px
  color: $primary
  font-weight: normal

.q-card
  background-color: $light

.q-gutter-y-md, .q-gutter-md
  margin-top: 0px

.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
