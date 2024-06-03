
/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "../../../node_modules/firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../../firebase.config";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { updateProfile } from "firebase/auth/cordova";
export const AuthContext = createContext(null)
const Auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const updateUserProfile = (displayName) => {
        const user = Auth.currentUser;

        if (user) {
            updateProfile(user, {
                displayName: displayName
            }).then(() => {
                console.log('User profile updated successfully');
            }).catch((error) => {
                console.error('Error updating user profile', error);
            });
        } else {
            console.log('No user is signed in');
        }
    };

    const registerWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(Auth, email, password)
    }
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(Auth, email, password)
    }
    const googleLogin = () => {
        return signInWithPopup(Auth, googleProvider)
    }
    const logOutUser = () => {
        signOut(Auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(Auth, currentUser => {
            setUser(currentUser)
            const userInfo = { email: currentUser?.email }
            if (currentUser) {
                axiosSecure.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setUser(currentUser)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [axiosSecure])
    const info = {
        user,
        loading,
        registerWithEmail,
        googleLogin,
        loginWithEmail,
        logOutUser,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;