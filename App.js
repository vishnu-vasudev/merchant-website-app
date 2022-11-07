import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image as Img} from 'react-native-compressor';
import {stat} from 'react-native-fs';

const App = () => {
  const [image, setImage] = useState();
  const [cImage, setCImage] = useState();
  const [size, setSize] = useState();

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  const handleClick = async () => {
    const images = await launchImageLibrary(options);
    setImage(images.assets[0].uri);
    console.log(images);
  };

  const compress = async () => {
    const result = await Img.compress(`${image}`, {
      maxWidth: 1000,
      quality: 0.8,
    });
    setCImage(result);
    console.log(result);
    const statResult = await stat(`${result}`);
    console.log('file size: ' + statResult.size);
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity onPress={handleClick}>
          <Text>Browse</Text>
        </TouchableOpacity>
        <Image style={style.image} source={{uri: image}} />
        <TouchableOpacity onPress={compress}>
          <Text>Compress</Text>
        </TouchableOpacity>
        <Image style={style.image} source={{uri: cImage}} />
        <Text>{size}</Text>
      </View>
    </ScrollView>
  );
};

export default App;

const style = StyleSheet.create({
  image: {
    width: 500,
    height: 500,
  },
});
