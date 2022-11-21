import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
// import { FaTimes, FaRegPaperPlane } from 'react-icons/fa';
import './Blog.scss';

export default function Blog() {
    const [articles, setArticles] = useState([]);
   
    // const [commentForm, setCommentForm] = useState(false);
    // const [commentAdded, setCommentAdded] = useState(false)

    useEffect(() => {
      const displayArticles = onSnapshot(
      collection(db, "blog"), 
      (snapshot) => {
        setArticles(snapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
        console.log(articles)
        getDownloadURL(ref(storage, '1.jpg'))
        .then((url) => {console.log(url)})
      })
    }, [])

   


    const getImgUrl = (el) => {
      // el.getDownloadURL().then(function(url){
      //   console.log(url)
      //   return url
      //   // const img = document.getElementById('myimg');
      //   // img.setAttribute('src', url);
      // })
    }

  return (
    <div className='blog-list__container'>
      { articles ?
        articles.map((el, key) => {
          if (el.popular == true){
            const gsReference = ref(storage, el.src);
            console.log(gsReference)
            return (
              <div className='blog-list__item' key={key}> 
                <div className='blog-list__img'>
                  <img 
                  // src={el => {getImgUrl(el)}}
                  alt='appliance image'/>
                  <p>ho</p>
                </div>
                <div className='blog-list__text'>
                  <div className=''>{el.text} </div>
                  <div>
                    <p>{el.type}</p>
                    <p>{el.date}</p>
                    </div>
                </div>
            </div>
            )
          } else {
            return 
          }
        })
      : null
      }

      {/* <button 
        className="button-standard" role="button"
        onClick={
        () => toggleCommentForm() }
        >
        add comment
      </button> */}
    </div>
  )
}
