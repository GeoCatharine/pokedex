import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface PokemonState {
  pokedex: Array<Pokemon>;
  nextLink: string | null;
  prevLink: string | null;
  count: number;
}

type Pokemon = {
  name: string;
  url: string;
};

export const usePokemonStore = defineStore('pokemons', {
  state: (): PokemonState => ({
    pokedex: [],
    nextLink: null,
    prevLink: null,
    count: 0,
  }),
  getters: {
    getPokemons: (state) => state.pokedex,
    getNextLink: (state) => state.nextLink,
    getPrevLink: (state) => state.prevLink,
    getCount: (state) => state.count,
  },
  actions: {
    async fetchPokemons() {
      try {
        const response = await api.get('/pokemon');
        this.pokedex = response.data.results;
        this.nextLink = response.data.next;
        this.prevLink = response.data.previous;
        this.count = response.data.count;
      } catch (error) {
        throw new Error('Failed to fetch pokemons');
      }
    },
  },
});
