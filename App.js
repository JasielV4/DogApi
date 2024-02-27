//Importamos todas las librerias a utilizar en la aplicación

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

//Todas las funciones a utiliza en la aplicación
export default function App() {

  // Las variables para seleccionar la imagen random del perro, la imagen de la galería
  // para mostrar en caso de error
  const [randomImage, setRandomImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  //la función fetch asíncrona para llamar a la API y obtener la imagen random del perro
  const fetchRandom = async () => {
    try {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
      const data = await res.json();
      setRandomImage(data.message);
      setError(null);
    }
    catch (e) {
      console.error(e)
      setError('Error al cargar la imagen');
    }
  };

  // Función asíncrona para seleccionar la imagen de la galería mediante las librerias
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ // Seleccionar la imagen de la libreria
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Seleccionar todos los tipos de medios para imagenes y demás de la galeria
      allowsEditing: false, // Esto va a ser que no deje editarla después de selecionarla
      quality: 1, // Calidad máxima de la foto
    });

    if (!result.cancelled) { // Seleccion de la imagen de la galeria
      console.log(result.uri); // Se imprime la URI de la imagen
      setSelectedImage(result.uri); // Se guarda la imagen medianete las variables, en este caso el setSelected
      setRandomImage(null); // Se elimina la imagen random en caso de que haya una puesta
    }
  };

  const deleteImage = () => {
    setSelectedImage(null); // Para que el botón que se cree de borrar, borre tanto el random como la galeria
    setRandomImage(null);
  };

  return (
    //Un safe area para que no abarque la barra de notificaciones y la cámara
    //El view es el contenedor que va abarcar todo
    // Text style va a ser el título en este caso será "Dog generator"
    // TouchableOpacity será el botón para llamar a la función fetchRadom y se generé la imagen
    // También para el botón selectImage para llamar su función y seleccionar una foto de la galería
    // Y deleteImage que es el botón para borrar las imagenes
    // El error será para que muestre un error en caso de que haya uno
    // selectImage seráque si hay una imagen aleatoria en la box está será borrada y se sustiruíra por la seleccionada
    // Y así mismo se mostrará en la aplicación
    <SafeAreaView style={styles.container}> 
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Dog generator 🐶</Text>
        <TouchableOpacity
          style={styles.button} 
          onPress={fetchRandom}>
          <Text style={styles.buttonText}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={selectImage}>
          <Text style={styles.buttonText}>Select image</Text>
        </TouchableOpacity>
        {(selectedImage || randomImage) && (
          <TouchableOpacity
            style={styles.button}
            onPress={deleteImage}>
            <Text style={styles.buttonText}>Delete image</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text>{error}</Text>}
      {randomImage && !selectedImage && (
        <View style={styles.resultBox}>
          <Image
            style={styles.image}
            source={{ uri: randomImage }}
          />
        </View>
      )}
      {selectedImage && (
        <View style={styles.resultBox}>
          <Image
            style={styles.image}
            source={{ uri: selectedImage }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

// Solo es el estilo de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#94a5bf',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F51B5',
  },
  button: {
    backgroundColor: '#3F51B5',
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#3F51B5',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 200,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});