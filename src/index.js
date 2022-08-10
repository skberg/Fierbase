
//importing initializeapp/ fierbaseapp
import {initializeApp} from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    EmailAuthCredential,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore'



//getting the fierbase config
const firebaseConfig = {
    apiKey: "AIzaSyAOGOa_aKl-9gCYVb8oIuw8GDzk_LFo5gc",
    authDomain: "worshopdb.firebaseapp.com",
    projectId: "worshopdb",
    storageBucket: "worshopdb.appspot.com",
    messagingSenderId: "497924416331",
    appId: "1:497924416331:web:739a2f4a382ab15d077ece"
  };

  //init fierbase app
  initializeApp(firebaseConfig)

  //init services
   const db = getFirestore()

  //sign in or out 
  const auth = getAuth()
  
  //colllection ref
  const colRef = collection(db, 'books')

  //queries
  const q = query(colRef, orderBy('createdAT'))



  //real tiome  collection data 
 
 const unsubCol =  onSnapshot (q, (snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc) =>{
        books.push({...doc.data(),id :doc.id})
    })
    console.log(books)
})



//adding doc
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    addDoc(colRef,{
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAT: serverTimestamp()
    })
    .then(()=>{
        addBookForm.reset()
    })
})


  //del doc

  const removebutton = document.querySelector('.delete')
  removebutton.addEventListener('submit', (e)=>{
      e.preventDefault();
    const docRef = doc(db, 'books', removebutton.id.value)
    deleteDoc(docRef)
    .then(()=>{
        removebutton.reset()
    })

  })

  //get a single doc
const docRef = doc(db, 'books', "OCzZzancfodbwkBfiC9t")

const unsubDoc = onSnapshot(docRef, (doc)=>{
console.log(doc.data(),doc.id)
})

//updateform 

const updateFrom = document.querySelector('.update')
updateFrom.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const docRef = doc(db, 'books', updateFrom.id.value)
    updateDoc(docRef,{
        title: 'updated title'
    })
    .then(()=>{
        updateFrom.reset
    })
})


//signup

const signupFrom = document.querySelector('.signup')
signupFrom.addEventListener('submit', (e)=>{
    e.preventDefault()

    const email = signupFrom.email.value
    const password = signupFrom.password.value

    createUserWithEmailAndPassword(auth, email, password)

    .then ((cred)=>{
        //console.log('user create: ', cred.user)
        signupFrom.reset()
    })
    .catch((err)=>{
        console.log(err.message)
    })

})


//login and out 

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e)=>{
    e.preventDefault()
    signOut(auth)
    .then(()=>{
        //console.log('the user sign out')
    })
    .catch((err) =>{
        console.log(err.message)
    })

})
/*
const loginButton = document.querySelector('.login')
loginButton.addEventListener('click', ()=>{
    
})*/
const loginForm = document.querySelector('.loginfrom')
loginForm.addEventListener('submit', (e)=>{
e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            //console.log('user logged in:', cred.user)
        })
        .catch((err)=>{
            console.log(err.message)
        })



})

//subscrib to on of stat
const unsubAuth = onAuthStateChanged(auth, (user)=>{
    console.log('user status changs:', user)
})


//unsubscripe to all

const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('unsubscribe') 
    unsubCol()
     unsubAuth()
     unsubDoc()
})