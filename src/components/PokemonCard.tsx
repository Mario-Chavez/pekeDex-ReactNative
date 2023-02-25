import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interface/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  /* aqui le puse any asi no me muestra error auque navegue bien 
  lo mismo me muestra un erreor typeScript pero si funciona */
  const navigation: any = useNavigation();
  const isMounted = useRef(true);

  /* metodo para usar la liberia de ImageColors
  despues recibimos del useEffect la uri de la imagenes dde los pokemon
  y esat funcion se encarga de darle el background a las card dependiendo de
  q plataforma esta abierta la app
  */
  const getColors = async (uri: string) => {
    const colors = await ImageColors.getColors(uri, {});

    let primary;
    /* este isMounted me proteje cuando el componente no esta montado para que no me lance
   el warny para evitar cambios en el componente cuandop no esta montado 
   (cuando no esta montado ! es false)*/
    if (!isMounted) return;
    switch (colors.platform) {
      case 'android':
        primary = colors.dominant;

        break;

      case 'ios':
        primary = colors.primary;

      default:
        break;
    }

    setBgColor(primary || 'grey');

    return [primary];
  };

  useEffect(() => {
    getColors(pokemon.picture);
    isMounted.current = false;
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        /*  card style  */
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        {/* Nombre de Pokemon */}
        <View>
          <Text
            style={{
              ...styles.namePokemon,
            }}>
            {pokemon.name}
            {'\n #' + pokemon.id}
          </Text>
        </View>
        <View
          style={{
            ...styles.pokebolaConatiner,
          }}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={{
              ...styles.pokebolaBlanca,
            }}
          />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={{
            ...styles.pokemonImage,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  namePokemon: {
    fontSize: 20,
    color: 'white',
  },
  /* aqui el padre container no deja q la pk blanca
  salga y se note en la sombra lo hago 
  con  position: 'absolute',
    overflow: 'hidden', */
  pokebolaConatiner: {
    width: 100,
    height: 100,
    bottom: 0,
    right: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  pokebolaBlanca: {
    width: 100,
    height: 100,
    bottom: -20,
    right: -20,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
