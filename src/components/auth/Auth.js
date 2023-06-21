import {useState} from 'react';
import {auth, googleProvider} from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
    //console.log(auth?.currentUser?.email);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIm = async () => {
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            alert('sighin');
        }
        catch(err){
            console.log(err);
        }
    }
    const logout = async () => {
        try{
            await signOut(auth);
            alert('logout');
        }
        catch(err){
            console.log(err);
        }
    }
    const signwithgoogle = async () => {
        try{
            await signInWithPopup(auth,googleProvider);
            alert('signin');
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={signIm}>login</button>
        <button onClick={logout}>logout</button>
        <button onClick={signwithgoogle}>siginin with google</button>
    </div>
  )
}

export default Auth