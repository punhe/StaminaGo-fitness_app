import { View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import React from 'react';

const workoutImages = {
    pushup: require("../../assets/Images/chongday.jpg"),
    squat: require("../../assets/Images/squat.jpg"),
    plank: require("../../assets/Images/plank.jpg"),
    // Thêm ảnh cho các bài tập khác tại đây
};

const WorkoutOTD = () => {
    const workouts = [
        { id: '1', title: 'Chống đẩy', description: 'Tăng cường cơ tay và ngực', image: workoutImages.pushup },
        { id: '2', title: 'Squat', description: 'Tăng cường cơ chân và mông', image: workoutImages.squat },
        { id: '3', title: 'Plank', description: 'Tăng cường cơ bụng và lưng', image: workoutImages.plank },
        
        // Thêm các bài tập khác tại đây
    ];

    const renderWorkoutCard = ({ item }) => (
        <TouchableOpacity className="items-center justify-center mb-4">
            <View className="rounded-3xl overflow-hidden h-32 w-[70%] bg-white shadow-md">
                <ImageBackground
                    source={item.image}
                    className="flex-1 justify-center items-center"
                    resizeMode="cover"
                >
                    <View className="bg-white/80 p-1 rounded-xl">
                        <Text className="text-black/80 text-lg font-bold">{item.title}</Text>
                        <Text className="text-black/60 text-sm">{item.description}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            {/* Bài tập trong ngày */}
            <TouchableOpacity className="items-center justify-center">
                <View className="rounded-3xl overflow-hidden h-40 w-[80%] mb-4">
                    <ImageBackground
                        source={require("../../assets/Images/anh1.jpg")}
                        className="flex-1 justify-center items-center"
                        resizeMode="cover"
                    >
                        <View>
                            <Text className="text-black/70 text-3xl tracking-tight">Bài tập trong ngày</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            {/* Danh sách các bài tập */}
            <FlatList
                data={workouts}
                renderItem={renderWorkoutCard}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default WorkoutOTD;

