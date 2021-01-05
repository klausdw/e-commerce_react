import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDpcorC-Q2BC75HBRwkPVWomSwdFoRUZfU",
    authDomain: "e-commerce-db-e9143.firebaseapp.com",
    projectId: "e-commerce-db-e9143",
    storageBucket: "e-commerce-db-e9143.appspot.com",
    messagingSenderId: "451290803576",
    appId: "1:451290803576:web:339933c31c762d4d2e6c8d",
    measurementId: "G-GXYV5HTY0Q"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    
    return userRef;
  }

  firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey, 
  objectsToAdd
  ) => {
  const collectionRef = firestore.collection(collectionKey);
  //console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    //const newDocRef = collectionRef.doc(obj.title);
    const newDocRef = collectionRef.doc();
    //console.log(newDocRef)
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  console.log(transformedCollection);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
