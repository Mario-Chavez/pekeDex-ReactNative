import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonFull, Type} from '../interface/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

/* este componente muestra los detalles de los pokemon */
interface Props {
  pokemon: PokemonFull;
}
export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* type y peso */}
      <View
        style={{
          ...styles.container,
          marginTop: 360,
        }}>
        <Text style={styles.title}>Type</Text>
        <View style={{flexDirection: 'row'}}>
          {/* aqui utilizamon el map de react para ir iterando todos los 
            elemento que trae type (ya viene el type en la api) */}
          {pokemon.types.map(({type}) => (
            <Text
              style={{
                ...styles.typeText,
                marginRight: 10,
              }}
              key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.typeText}>{pokemon.weight}Kg</Text>
      </View>
      {/* type */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>
      {/* Habilidades */}
      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Habilidades Base</Text>
        <View style={{flexDirection: 'row'}}>
          {/* aqui utilizamon el map de react para ir iterando todos los 
            elemento que trae type */}
          {pokemon.abilities.map(({ability}) => (
            <Text
              style={{
                ...styles.typeText,
                marginRight: 10,
              }}
              key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>
      {/* Movimiento */}
      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Movimientos</Text>
        {/* este style es cuando no quiero que se vea  uno debajo pero
        tampoco todo horizontal */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {/* aqui utilizamon el map de react para ir iterando todos los 
            elemento que trae type */}
          {pokemon.moves.map(({move}) => (
            <Text
              style={{
                ...styles.typeText,
                marginRight: 10,
              }}
              key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* stats */}
      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
              <Text
                style={{
                  ...styles.typeText,
                  marginRight: 10,
                  width: 150,
                }}>
                {stat.stat.name}
              </Text>
              <Text
                style={{
                  ...styles.typeText,
                  fontWeight: 'bold',
                }}
                key={stat.base_stat}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{marginBottom: 50, alignItems: 'center', marginTop: 20}}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  typeText: {
    fontSize: 18,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
