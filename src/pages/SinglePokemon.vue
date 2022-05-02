<template>
  <div v-if="pokemon === undefined" class="container">
    <p>Loading</p>
  </div>
  <div v-else class="container">
    <q-card style="max-width: 50%">
      <h1 class="text-capitalize text-center">{{ pokemon.name }}</h1>
      <q-card-section class="img-box row justify-evenly">
        <div>
          <h2 class="text-center">Normal form</h2>
          <img :src="pokemon.info?.sprites.front_default" />
          <img :src="pokemon.info?.sprites.back_default" />
        </div>
        <div>
          <h2 class="text-center">Shiny form</h2>
          <img :src="pokemon.info?.sprites.front_shiny" />
          <img :src="pokemon.info?.sprites.back_shiny" />
        </div>
      </q-card-section>
      <q-card-section>
        <q-card
          class="stats-box row justify-between"
          :bordered="false"
          :flat="true"
        >
          <q-card-section class="column justify-center" style="min-width: 40%">
            <q-list style="max-width: 100%">
              <q-item>
                <q-item-label overline>
                  <h1 text-h1>Base stats</h1>
                </q-item-label>
              </q-item>
              <q-item
                v-for="(stat, index) in pokemonStats"
                :key="index"
                class="border b-stats q-my-md"
              >
                <q-item-section>
                  {{ formatName(stat.stat.name) }}
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ stat.base_stat }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section style="min-width: 40%">
            <q-item-label overline>
              <h1 text-h1>Info</h1>
            </q-item-label>
            <div class="row justify-evenly">
              <div class="column items-center i-red q-pa-md">
                <span class="text-capitalize">weight:</span>
                <p>{{ pokemon.info?.weight }}</p>
              </div>
              <div class="column items-center i-yellow q-pa-md">
                <span class="text-capitalize">height:</span>
                <p>{{ pokemon.info?.height }}</p>
              </div>
            </div>
            <div>
              <h4>order in pokedex:</h4>
              {{ pokemon.info?.order }}
            </div>
            <div>
              <h4>Type:</h4>
              <span v-for="pokemonType in pokemonTypes" :key="pokemonType.slot">
                {{ pokemonType.type.name }}
              </span>
            </div>
            <div>
              <h4>Abilities:</h4>
              <span
                v-for="pokemonAbility in pokemonAbilities"
                :key="pokemonAbility.slot"
              >
                {{ pokemonAbility.ability.name }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePokemonStore } from 'src/stores/pokemons-store';

export default defineComponent({
  name: 'SinglePokemon',
  setup() {
    const store = usePokemonStore();
    console.log(store.getSelectedPokemon);

    const pokemonStats = computed(() => store.getSelectedPokemon?.info?.stats);

    const formatName = (name: string): string =>
      name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

    const columns = [
      {
        name: 'stat name',
        label: 'stat name',
        field: 'name',
        align: 'left',
        sortable: false,
        required: true,
      },
      {
        name: 'staty numb',
        label: 'stat numb',
        field: 'base_stat',
        align: 'left',
        sortable: false,
        required: true,
      },
    ];

    return {
      pokemon: computed(() => store.getSelectedPokemon),
      pokemonTypes: computed(() => store.getSelectedPokemon?.info?.types),
      pokemonAbilities: computed(
        () => store.getSelectedPokemon?.info?.abilities
      ),
      pokemonStats,
      formatName,
      columns,
    };
  },
});
</script>
<style lang="sass">
.b-stats
  border: 2px solid green
  border-radius: 12px

.i-red
  border: 2px solid red
  border-radius: 12px

.i-yellow
  border: 2px solid yellow
  border-radius: 12px

.i-blue
  border: 2px solid blue
  border-radius: 12px

.i-violet
  border: 2px solid violet
  border-radius: 12px

.container
  width: 100%
  height: 100%

.q-card
  height: fit-content
  margin: 0 auto
  img
    width: 200px
    height: 200px
  h1
    font-size: 35px
    margin: 0
  h2
    font-size: 20px
    padding: 0
    margin: 0
  h4
    font-size: 18px
</style>
