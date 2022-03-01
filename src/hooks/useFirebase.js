import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import initializeFirebase from "../firebase/firebase.init";


initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [user2, setUser2] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const resisterUser = (email, password, name, location, navigate) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('');
                const newUser = { email, displayName: name };
                setUser(newUser);

                // save user to database
                saveUser(email, name, 'POST');

                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .catch((err) => setError(err.message));

                // redirect url
                const destination = '/';
                navigate(destination);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithEmailPassword = (email, password, location, navigate) => {

        fetch(`https://tranquil-forest-38467.herokuapp.com/users/${email}`)
            .then(res => res.json())
            .then(data => {
                setUser2(data.user);

            });
        console.log(user2, user);
        if (user2?.status !== "Blocked") {
            setIsLoading(true);

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(user2);
                    setError('');
                    const destination = '/';
                    navigate(destination);
                })
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => setIsLoading(false));
        } else {
            setError('You are blocked');
        }
    }

    const signInWithGoogle = (location, navigate) => {
        setIsLoading(true);


        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
                setError('');

                // save user to database
                saveUser(result.user.email, result.user.displayName, 'PUT');

                const destination = location?.state?.from || '/';
                navigate(destination);
            })
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                setUser(user);
                setError("");
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);


    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                setError("");
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => setIsLoading(false))
    }

    // save user details to server
    const saveUser = (email, displayName, method) => {
        setIsLoading(true);
        const user = { email, displayName };
        console.log(user)
        fetch('https://tranquil-forest-38467.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

    }

    // check admin
    useEffect(() => {

        fetch(`https://tranquil-forest-38467.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.isAdmin);

            });
    }, [user.email]);
    console.log(admin);

    // console.log(admin)
    return {
        user,
        error,
        isLoading,
        admin,
        setUser,
        setError,
        setIsLoading,
        resisterUser,
        signInWithEmailPassword,
        signInWithGoogle,
        logOut,
        user2
    }
}

export default useFirebase;