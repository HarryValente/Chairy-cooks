




// export const createFirebaseUser = async (email, password) => {
//   return new Promise((resolve, reject) => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(response => {
//         resolve(response.user.uid)

//         return auth.signOut()
//       })
//       .catch(error => {
//         if (error) {
//           throw new Error(error)
//         }

//         return reject(error)
//       })
//   })
// }


import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth'
import { uploadBytes, uploadBytesResumable } from 'firebase/storage'

// Firestore
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD7lln8DFMGkvjqcjEStICg6cBptRd_W-A",
  authDomain: "chairy-cooks.firebaseapp.com",
  projectId: "chairy-cooks",
  storageBucket: "chairy-cooks.appspot.com",
  messagingSenderId: "932235974846",
  appId: "1:932235974846:web:450a03e69f378a1399e6ef",
  measurementId: "G-JQHQBCJY2S"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const storage = getStorage(app);
const auth = getAuth(app)

// Add document to Firebase
export const addFirebaseDoc = async (col, data, id) => {
  let document = null

  if (id) {
    document = await setDoc(doc(database, col, id), {
      ...data,
      id,
      created_at: serverTimestamp()
    })
  } else {
    document = await addDoc(collection(database, col), data)
    document = await updateFirebaseDoc(col, document.id, {
      id: document.id,
      created_at: serverTimestamp()
    })
  }

  return document
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns created user
 * TODO - add error handling
 */
export const createFirebaseUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    // harry-joevalente@live.co.uk
    await createUserWithEmailAndPassword(auth, email, password)
  })
}

export const loginFirebaseUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    // harry-joevalente@live.co.uk
    await signInWithEmailAndPassword(auth, email, password)
    console.log('signed up')
  })
}

export const signOutFirebaseUser = async () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('sign-out successful')
  }).catch((error) => {
    // An error happened.
    console.log('sign-out unsuccessful')
  });
}


export const deleteFirebaseDoc = async (col, id) =>
  await deleteDoc(doc(database, col, id))

// Add item to Storage
export const addStorageItem = async (url, file, name) => {
  return new Promise((resolve, reject) => {
    let file_type = file.type == 'image/png' ? '.png' : '.jpg'

    let file_name = name ? name + file_type : file.name

    const r = ref(storage, url + file_name)

    const upload = uploadBytesResumable(r, file)

    upload.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      error => {
        console.log('there was an error')

        return reject(error)
      },
      () => {
        const url = `https://storage.googleapis.com/chairy-cooks.appspot.com/${upload.snapshot.ref.fullPath}`

        return resolve(url)
      }
    )
  })
}

// Get item to Storage
export const getStorageItem = async path => {
  const reference = ref(storage, path)
  const url = `https://storage.googleapis.com/chairy-cooks.appspot.com/${reference.fullPath}`

  return url
}

// Generate Firebase ID
export const generateFirebaseId = () => {
  const PUSH_CHARS =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  let lastPushTime = 0
  let lastRandChars = []
  let now = new Date().getTime()

  const duplicateTime = now === lastPushTime

  lastPushTime = now

  let timeStampChars = new Array(8)

  for (var i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64)
    now = Math.floor(now / 64)
  }

  if (now !== 0)
    throw new Error('We should have converted the entire timestamp.')

  var id = timeStampChars.join('')

  if (!duplicateTime) {
    for (i = 0; i < 12; i++) {
      lastRandChars[i] = Math.floor(Math.random() * 64)
    }
  } else {
    for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
      lastRandChars[i] = 0
    }

    lastRandChars[i]++
  }

  for (i = 0; i < 12; i++) {
    id += PUSH_CHARS.charAt(lastRandChars[i])
  }

  if (id.length != 20) id = id.substring(0, Math.min(id.length, 20))

  return id
}


export const generateNumericId = async (col, field) => {
  const previous = await getFirebaseDocs(col, orderBy(field, 'desc'))

  const id = previous ? parseInt(previous[0][field]) + 1 : 1

  return id.toString().padStart(7, '0')
}

// Get a Firebase document
export const getFirebaseDoc = async (col, id) => {
  const r = doc(database, col, id)

  const data = await getDoc(r)

  if (data.exists()) {
    return {
      id: data.id,
      ...data.data()
    }
  } else {
    return null
  }
}

// Get all documents from Firebase collection
export const getFirebaseDocs = async (col, filter) => {
  const q = filter
    ? query(collection(database, col), filter)
    : query(collection(database, col))

  const data = await getDocs(q)

  const array = []

  data.docs.map(snapshot => {
    if (snapshot.exists()) {
      return array.push({
        id: snapshot.id,
        ...snapshot.data()
      })
    } else {
      return null
    }
  })

  if (array.length > 0) {
    return array
  } else {
    return null
  }
}

// Update a Firebase
export const updateFirebaseDoc = async (col, id, data) => {
  const r = doc(database, col, id)

  const d = await getDoc(r)

  let update = null

  if (d.exists()) {
    update = await updateDoc(r, { ...data, updated_at: serverTimestamp() })
  } else {
    update = await setDoc(r, { ...data, created_at: serverTimestamp() })
  }

  return update
}