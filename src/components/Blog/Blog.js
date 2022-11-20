import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
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
          // console.log(snapshot.docs);
          console.log(articles)
        },
        (error) => {
          console.log(error)
        });
    }, [])

  return (
    <div className='blog-list__container'>
      { articles ?
        articles.map((el, key) => {
          if (el.popular == true){
            return (
              <div className='blog-list__item' key={key}> 
                <div className='blog-list__img'>
                  <img src={`${el.src}`}
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
