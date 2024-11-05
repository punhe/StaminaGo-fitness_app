// import { View, Text, Platform } from "react-native";
// import React from "react";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { blurhash } from "../../utils/common";
// import { useAuth } from "../context/authContext";
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from "react-native-popup-menu";
// import { MenuItem } from "./CustomMenuItems";
// import { useNavigation } from "@react-navigation/native"; // Use this import for navigation
// import { AntDesign, Feather } from "@expo/vector-icons";

// const android = Platform.OS === "android";

// export default function HomeHeader() {
//   const { user, logout } = useAuth();
//   const navigation = useNavigation();
//   const { top } = useSafeAreaInsets();

//   const handleProfile = () => {
//     navigation.navigate("Profile"); // Ensure the screen name matches your navigator
//   };

//   const handleLogout = async () => {
//     await logout();
//   };

//   return (
//     <View
//       style={{ paddingTop: android ? top : top + 10 }}
//       className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow"
//     >
//       <View>
//         <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
//           Trang chủ
//         </Text>
//       </View>

//       <View>
//         <Menu>
//           <MenuTrigger
//             customStyles={{
//               triggerWrapper: {
//                 //trigger wrapper styles
//               },
//             }}
//           >
//             <Image
//               style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
//               source={user?.profileUrl}
//               placeholder={blurhash}
//               transition={500}
//             />
//           </MenuTrigger>
//           <MenuOptions
//             customStyles={{
//               optionsContainer: {
//                 borderRadius: 10,
//                 borderCurve: "continuous",
//                 marginTop: 40,
//                 marginLeft: -30,
//                 backgroundColor: "white",
//               },
//             }}
//           >
//             <MenuItem
//               text="Hồ sơ"
//               action={handleProfile}
//               value={null}
//               icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
//             />
//             <Divider />
//             <MenuItem
//               text="Đăng xuất"
//               action={handleLogout}
//               value={null}
//               icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
//             />
//           </MenuOptions>
//         </Menu>
//       </View>
//     </View>
//   );
// }

// const Divider = () => {
//   return <View className="p-[1px] w-full bg-neutral-200" />;
// };
import { View, Text, Platform, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { AntDesign } from "@expo/vector-icons";

const android = Platform.OS === "android";

export default function HomeHeader() {
  const { logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ paddingTop: android ? top : top + 10 }} className="flex-row justify-between items-center px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <AntDesign name="logout" size={24} color="#FF4D4F" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  logoutText: {
    marginLeft: 8,
    color: "#4F46E5", // Indigo color
    fontWeight: "600",
  },
});
