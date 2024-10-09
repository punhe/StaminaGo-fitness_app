import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
const otdImage = require("../../assets/Images/anh1.jpg");


const WorkoutOTD = () => {
    return (
        <TouchableOpacity className="items-center justify-center">
            <View className="rounded-3xl overflow-hidden h-40 w-[80@]">
                <ImageBackground
                    source={otdImage}
                    className="flex-1 justify-center items-center"
                    resizeMode="cover"
                >
                    <View>
                        <Text className="text-black/70 text-3xl tracking-tight">Workout Of The Day</Text>
                    </View>
                </ImageBackground>
            </View>
            
        </TouchableOpacity>
    )
}

export default WorkoutOTD;