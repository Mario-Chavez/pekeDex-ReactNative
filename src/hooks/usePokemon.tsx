import {useState, useEffect} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonFull} from '../interface/pokemonInterfaces';

/* este hook se encarga de traer la informacion completa
de el pokemon que tiene el id (parametro que le llega ) */
export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  /* funcion async q busca la info del id */
  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  /* retornamos loadin y la data dekl pokemon */
  return {
    isLoading,
    pokemon,
  };
};
