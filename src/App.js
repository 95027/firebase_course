import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import { db,auth,storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';


function App() {

  const [movies, setMovies] = useState([]);

  //new movie states
  const [newMovie, setNewMovie] = useState('');
  const [year, setYear] = useState(0);
  const [result, setResult] = useState('');

  //update movie
  const [updateTitle, setUpdateTitle] = useState('');

  //file state
  const [upload, setUpload] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  const submitMovie = async ()=>{
    try{
      await addDoc(moviesCollectionRef,{
        title:newMovie,
        released:year,
        success:result,
        userId:auth?.currentUser?.uid
      })
    }
    catch(err){
      console.log(err);
    }
    getMoviesList()
  }
  useEffect(()=>{
    getMoviesList();
  })

    const  getMoviesList =async ()=>{
      try{
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc)=>({...doc.data(),id:doc.id }));
        //console.log(filteredData);
        setMovies(filteredData);
      }
       
      catch(err){
        console.log(err);
      }
    }

    const deleteMovie = async (id) => {
      const movieDoc = doc(db,"movies",id);
      await deleteDoc(movieDoc);
    }
    
    const updateMovie = async (id) => {
      const movieDoc = doc(db,"movies",id);
      await updateDoc(movieDoc, {title:updateTitle});
    }

    const uploadFile = async () =>{
      if(!upload) return;
      const filesFolderRef = ref(storage, `files/${upload.name}`);
      try{
        await uploadBytes(filesFolderRef,upload);
      }
      catch(err){
        console.log(err);
      }
    }



  return (
    <div className="App">
      <Auth/><br/><br/>
      <div>
        <input type="text" placeholder='title' onChange={e=>setNewMovie(e.target.value)}/>
        <input type="number" placeholder='year'onChange={e=>setYear(e.target.value)}/>
        <input type="text" placeholder='hit/flop'onChange={e=>setResult(e.target.value)}/>
        <button onClick={submitMovie}>submit movie</button>
      </div>
      <div>
        {
          movies.map((movie)=>{
            return(<div key={movie.id} className='movie'>
              <h1>{movie.title}</h1>
              <p> released year: {movie.released}</p>
              <p>hit/flop: {movie.success ? 'hit' : 'flop'}</p>
              <button onClick={()=>deleteMovie(movie.id)}>delete movie</button>
              <input type="text" placeholder='title' onChange={(e)=>setUpdateTitle(e.target.value)}/>
              <button onClick={()=>updateMovie(movie.id)}>update movie</button>
            </div>)
          })
        }
      </div>
      <div>
        <input type="file" onChange={(e)=>setUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
