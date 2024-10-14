import { View, Text, TouchableOpacity, ImageBackground, FlatList, Pressable } from 'react-native';
import React from 'react';

const workoutImages = {
    pushup: require("../assets/images/chongday.jpg"),
    squat: require("../assets/images/squat.jpg"),
    plank: require("../assets/images/plank.jpg"),
    // lunges: require("../assets/images/lunges.jpg"),
    // jumpingJacks: require("../assets/images/jumpingjacks.jpg"),
    // burpees: require("../assets/images/burpees.jpg"),
    // yoga: require("../assets/images/yoga.jpg"),
    // running: require("../assets/images/running.jpg"),
};

const WorkoutOTD = ({ navigation }) => {
    const workouts = [
        { id: '1', title: 'Chống đẩy', description: 'Tăng cường cơ tay và ngực', image: workoutImages.pushup },
        { id: '2', title: 'Squat', description: 'Tăng cường cơ chân và mông', image: workoutImages.squat },
        { id: '3', title: 'Plank', description: 'Tăng cường cơ bụng và lưng', image: workoutImages.plank },
        // { id: '4', title: 'Lunges', description: 'Tăng cường cơ chân và mông', image: workoutImages.lunges },
        // { id: '5', title: 'Jumping Jacks', description: 'Đốt cháy calo và tăng cường sức bền', image: workoutImages.jumpingJacks },
        // { id: '6', title: 'Burpees', description: 'Bài tập toàn thân giảm mỡ', image: workoutImages.burpees },
        // { id: '7', title: 'Yoga', description: 'Cải thiện sự linh hoạt và thăng bằng', image: workoutImages.yoga },
        // { id: '8', title: 'Chạy bộ', description: 'Tăng cường sức khỏe tim mạch', image: workoutImages.running },
    ];

    const renderWorkoutCard = ({ item }) => (
        <TouchableOpacity className="items-center justify-center mb-6">
            <View className="rounded-3xl overflow-hidden h-40 w-[100%] bg-white shadow-lg">
                <ImageBackground
                    source={item.image}
                    className="flex-1 justify-center items-center"
                    resizeMode="cover"
                >
                    <View className="bg-white/80 p-3 w-full items-center">
                        <Text className="text-black/80 text-xl font-bold text-center">{item.title}</Text>
                        <Text className="text-black/60 text-sm text-center">{item.description}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            {/* Bài tập trong ngày */}
            <TouchableOpacity className="items-center justify-center mb-6">
                <View className="rounded-3xl overflow-hidden h-48 w-[100%] shadow-lg">
                    <ImageBackground
                        source={require("../assets/images/anh1.jpg")}
                        className="flex-1 justify-center items-center"
                        resizeMode="cover"
                    >
                        <View className="bg-white/80 p-4 rounded-2xl">
                            <Text className="text-black/80 text-2xl font-bold text-center">Bài tập trong ngày</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            {/* Danh sách các bài tập */}
            <FlatList
                data={workouts}
                renderItem={renderWorkoutCard}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* Footer */}
            <View className="absolute bottom-0 w-full border-t border-gray-300 py-4 bg-white">
                <View className="flex-row justify-around">
                    <Pressable onPress={() => navigation.navigate("map")}>
                        <Text className="text-indigo-500 font-bold text-base">Map</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("shop")}>
                        <Text className="text-indigo-500 font-bold text-base">Cửa hàng</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("chat")}>
                        <Text className="text-indigo-500 font-bold text-base">Tin nhắn</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("settings")}>
                        <Text className="text-indigo-500 font-bold text-base">Cài đặt</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default WorkoutOTD;
