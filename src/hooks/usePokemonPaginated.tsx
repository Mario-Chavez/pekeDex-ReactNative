import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interface/pokemonInterfaces';

export const usePokemonPaginated = () => {
  /* isloading */
  const [isLoading, setIsloading] = useState(true);

  /* usaremos el state para guardar los datos que no interesa que estan en la interface
    SimplePokemon */
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  /* llamamos la api con use refr para poder hacer una llamada antes
   de que termine el scrool .. haremos un infinite scroll */
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  /* carga mas pokemon */
  const loadPokemons = async () => {
    /* llamamos a la api */
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    /*  aqui sacamos el current (posicion de la pagina  que esta) y hacemos 
    next (siguiente pagina) */
    nextPageUrl.current = resp.data.next;

    /* mandamos los datos a la func de abajo */
    mapPokemonList(resp.data.results);
  };

  /* esta function recorre los resultados q nos llega
  desde loadPokemons(arriba de esto) y devuelve una nuesva list de pokemon */
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      /* cortamos la url en los / (slash) */
      const urlParts = url.split('/');
      /* sacmos la posicion sonde esta el id del objeto */
      const id = urlParts[urlParts.length - 2];
      /* colocamos ese id para sacar la imagen */
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        picture,
        name,
      };
    });
    /* agregamos al state la nueva lista de pokemon desestructurando la primer list
    y agregando la siguiente (servira para hacen un scroll infinito) */
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    /* loading */
    setIsloading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    loadPokemons,
    isLoading,
    simplePokemonList,
  };
};
