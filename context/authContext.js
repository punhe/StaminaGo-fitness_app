import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) =>{
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, [])

    const updateUserData = async (userId) =>{
        const docRef = doc(db,'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId })
        }
    }

    const login = async (email, password) => {
        try {
            const respone = await signInWithEmailAndPassword(auth, email, password);
            return {success: true}
        } catch (e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg="Email không hợp lệ"
            if(msg.includes('(auth/invalid-credential)')) msg="Tài khoản không hợp lệ"
            if(msg.includes('(auth/weak-password)')) msg="Mật khẩu cần ít nhất 6 kí tự"
            return {success: false, msg};       
        }
    }
    

    const logout = async (email, password) => {
        try {
            await signOut(auth);
            return {success: true}
        } catch (e) {
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try {
            const respone = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', respone?.user);

            // setUser(respone?.user);
            // setIsAuthenticated(true);

            await setDoc(doc(db,"users", respone?.user?.uid),{
                username,
                profileUrl,
                userId: respone?.user?.uid
            });
            return {success: true, data: respone?.user};
        } catch (e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg="Email không hợp lệ"
            if(msg.includes('(auth/email-already-in-use)')) msg="Email đã tồn tại"
            if(msg.includes('(auth/weak-password)')) msg="Mật khẩu cần ít nhất 6 kí tự"
            return {success: false, msg};            
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}