import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import './Blog.scss';

export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const displayArticles = onSnapshot(
      collection(db, "blog"), 
      (snapshot) => {
        setArticles(snapshot.docs.map(doc => 
          ({ ...doc.data() })
          )
        )
      },
      (error) => {
        console.log(error)
      });
  }, [])
  
  // useEffect(() => {
  //     const displayArticles = onSnapshot(
  //     collection(db, "blog"), 
  //     (snapshot) => {
  //       setArticles(snapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
  //     })
    

  //     // Get metadata properties
  //     const imgRef = ref(storage, '1.jpg');
  //     getMetadata(imgRef)
  //     .then((metadata) => {
  //       // console.log(metadata)
  //       // Metadata now contains the metadata for 'images/forest.jpg'
  //     })
  //     .catch((error) => console.log(error))
  //   }, [])

  return (
    <div className='blog-list__container'>
      { articles.map((el, key) => {
            return (
              <div className='blog-list__item' key={key}> 
                <div className='blog-list__img'>
                  <img 
                  src={el.imgSrc}
                  alt='appliance image'/>
                </div>
                <div className='blog-list__text'>
                  <div className=''>{el.title} </div>
                  <div className='blog-list__text-info'>
                    <p>{el.type}</p>
                    { el.brand ? <p>{el.brand}</p> : null }
                    </div>
                </div>
            </div>
            ) 
        })
      }
    </div>
  )
}
