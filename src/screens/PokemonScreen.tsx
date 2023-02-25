import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParams} from '../navigator/Navigator';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';
/* aqui hacemos las prop q va recibir nuestra pokemonScreen extendemos de stackScreenProps
entre las <> pasamos lo q tenemos en RootStackParams (son los parametros q
   dijimos q iban a pasar en la navigator) y despues de la coma , 
la pantalla en la q estamos aqui el pekemonScreen
*/
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();

  /* hook de la info del pokemon que le pasamos el id
  y este hook nos trae la informacion de el */
  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      {/* header container */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* back button */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 5,
          }}>
          <Icon name="arrow-back-outline" color={'white'} size={40} />
        </TouchableOpacity>
        {/* nombre Pokemon */}
        <Text
          style={{
            ...styles.namePokemon,
            top: top + 40,
          }}>
          {name + '\n'}#{id}
        </Text>
        {/* pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebal}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {/* Detalles y loading */}

      {isLoading ? (
        <View style={styles.loadingPokemon}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomEndRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  namePokemon: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'flex-start',
    left: 20,
    fontWeight: 'bold',
  },
  pokebal: {
    width: 250,
    height: 250,
    bottom: -30,
    opacity: 0.6,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: -15,
  },
  loadingPokemon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
