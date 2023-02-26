import React from 'react';
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {useSearchPokemon} from '../hooks/useSearchPokemon';
import {FlatList} from 'react-native';
import {styles as estyleGlobal} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = useSearchPokemon();

  if (isFetching) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size={35} color="grey" />
        <Text>cargando...</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? top : top + 15,
        marginHorizontal: 20,
      }}>
      <SearchInput />

      <FlatList
        data={simplePokemonList}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        /*  header components */
        ListHeaderComponent={
          <Text
            style={{
              ...estyleGlobal.globalMargin,
              ...estyleGlobal.title,
              top: top + 10,
              marginBottom: top + 30,
            }}>
            Pokedex
          </Text>
        }
        /* renderizamos la card que esta en nuestro componentes */
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
