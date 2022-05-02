import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface PokemonState {
  pokedex: Array<Pokemon>;
  nextLink: string | null;
  prevLink: string | null;
  count: number;
  selectedPokemon?: Pokemon;
}

export type Pokemon = {
  name: string;
  url: string;
  info?: PokemonInfo;
};

export type PokemonInfo = {
  abilities: Array<{
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
  order: number;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
};

export const usePokemonStore = defineStore('pokemons', {
  state: (): PokemonState => ({
    pokedex: [],
    nextLink: null,
    prevLink: null,
    count: 0,
    selectedPokemon: undefined,
  }),
  getters: {
    getPokemons: (state) => state.pokedex,
    getNextLink: (state) => state.nextLink,
    getPrevLink: (state) => state.prevLink,
    getCount: (state) => state.count,
    getSelectedPokemon: (state) => state.selectedPokemon,
  },
  actions: {
    async fetchPokemons() {
      try {
        const response = await api.get('/pokemon');
        this.pokedex = response.data.results;
        this.nextLink = response.data.next;
        this.prevLink = response.data.previous;
        this.count = response.data.count;

        this.pokedex.forEach(async (pokemon, index) => {
          const response = await api.get(pokemon.url);
          this.pokedex[index].info = response.data;
        });
      } catch (error) {
        throw new Error('Failed to fetch pokemons');
      }
    },

    setSelectedPokemon(pokemon: Pokemon) {
      this.selectedPokemon = pokemon;
    },
  },
});
