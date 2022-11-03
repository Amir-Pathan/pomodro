import { db,auth } from "../firebase";
import {GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth'
import {query,addDoc,getDocs,collection, where,doc,getDoc} from 'firebase/firestore'


const services ={

    signinWithGoogle:()=>{

        return new Promise((resolve,reject)=>{
            const GoogleProvider = new GoogleAuthProvider();

            signInWithPopup(auth,GoogleProvider).then((user)=>{
    
                const q = query(collection(db,'users'),where('uid','==',user.user.uid))
    
                getDocs(q).then((res)=>{
    
                    if(res.docs.length===0){
    
                          addDoc(collection(db,'users'),{
                            uid:user.user.uid,
                            name:user.user.displayName,
                            authProvider:'google',
                            email:user.user.email
                          }).then((res)=>{
    
                            localStorage.setItem('user',JSON.stringify({
                                uid:user.user.uid,
                                id:res.id,
                                name:user.user.displayName,
                                email:user.user.email
                            }))
    
                            resolve(true)
    
                          }).catch((err)=>{
                            reject(false)
                          })
    
    
                    }else{

                        res.docs.forEach((i)=>{

                            let allData =i.data()

                            allData.id=i.id

                            localStorage.setItem('user',JSON.stringify(allData))

                            resolve(true)
                        })

                    }
    
                })
    
            }).catch((err)=>{
    
              reject(false)
    
            })
    


        })
 
        

    },

    auth:()=>{


        return new Promise((resolve,reject)=>{


            let user = localStorage.getItem('user')

            user = JSON.parse(user) || {}
    
            if(user === null){
    
                reject(false)
    
            }else{

                if(user.id){

                   const docRef = doc(db,'users',user.id)

                   getDoc(docRef).then((res)=>{

                    if(res.exists()){

                        resolve(true)

                    }else{

                        reject(false)

                    }

                   })


                }else{

                    reject(false)

                }

            }

        })


    },
    
    registerithEmailPassword :(name,email,password)=>{

        createUserWithEmailAndPassword(auth,email,password).then((res)=>{

            addDoc(collection(db,'users'),{
                uid:res.user.uid,
                name:name,
                email:email,
                authProvider:'local'
            }).then((ress)=>{

                localStorage.setItem('user',JSON.stringify({
                    uid:ress.user.uid,
                    id:ress.id,
                    name:name,
                    email:email
                }))

            })

        })

    }

}

export default services