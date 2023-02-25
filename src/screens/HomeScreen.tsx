import React from 'react';
import {Image, FlatList, ActivityIndicator, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {styles} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBg}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          /*  header components */
          ListHeaderComponent={
            <Text
              style={{
                ...styles.globalMargin,
                ...styles.title,
                top: top + 20,
                marginBottom: top + 30,
              }}>
              Pokedex
            </Text>
          }
          /* renderizamos la card que esta en nuestro componentes */
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //infinite Scroll
          onEndReached={loadPokemons} /* carga mas pokemones */
          onEndReachedThreshold={0.4} /* 40% de la lista cargara mas data */
          /* loading de la flatlist */
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={30} color="grey" />
          }
        />
      </View>
    </>
  );
};
