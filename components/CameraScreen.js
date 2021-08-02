import React, {Fragment, useEffect, useRef, useState} from "react";
import {Camera} from "expo-camera";
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {StatusBar} from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";

const CameraScreen = ({navigation}) => {

    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [imagesArr, setImagesArr] = useState([]);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            /*Få camera permissions*/
            const { status } = await Camera.requestPermissionsAsync();
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            /*Brug state til at styre perimissions*/
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const snap = async () => {
        if (!cameraRef.current) {
            return;
        }
        const result = await cameraRef.current.takePictureAsync();

        /*Udkommenter nedenstående for at gemme billedet taget til telefonen*/
        /*await MediaLibrary.saveToLibraryAsync(result.uri)*/

        /*Vi ligger vores taget billedet først ind i arrayet*/
        setImagesArr((imagesArr) => [result].concat(imagesArr));
    };

    const CameraGallery = () => {
        return (
            <View style={styles.gallery}>
                <Text style={styles.buttonGallery}>Images taken are {imagesArr.length}</Text>
                <ScrollView horizontal={true} >
                    {
                        imagesArr.length > 0
                            ? imagesArr.map((image,index) => (
                                <TouchableOpacity key={index} style={{paddingHorizontal:10}} onPress={() => navigation.navigate('image',{image:image.uri}) } >
                                    <Image source={{ uri: image.uri }} style={{ width: 100, height: 200 }} />
                                </TouchableOpacity>
                            ))
                            : <Text style={{color:"white"}}> No images taken </Text>
                    }
                </ScrollView>
            </View>
        )
    };

    /*Vælg billeder fra telefonen*/
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImagesArr((imagesArr) => [result].concat(imagesArr));
        }
    };

    return (
        <Fragment>
            <StatusBar StatusBarStyle="dark-content" style={{fontcolor:"white"}} backgroundColor={'rgba(255,255,255,0.4)'} />
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={{flexDirection:"column",alignContent:"center",flex:1,padding:20}}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    );
                                }}>
                                <Text style={styles.text}> Flip </Text>
                            </TouchableOpacity>

                            {/*Gir sig selv*/}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={snap}
                            >
                                <Text style={styles.text}> Tag billede </Text>
                            </TouchableOpacity>

                            {/*Skift retning på kamera*/}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={pickImage}
                            >
                                <Text style={styles.text}> Galleri </Text>
                            </TouchableOpacity>
                        </View>

                        <CameraGallery/>

                    </View>
                </Camera>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent:"space-between",
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    buttonGallery: {
        fontSize: 15,
        color:"white",
        padding: 10,
        borderRadius:10,
        alignSelf: 'center',
    },
    button: {
        padding:5,
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    gallery:{
        flex: 0.4,
        paddingTop:20,
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CameraScreen;
