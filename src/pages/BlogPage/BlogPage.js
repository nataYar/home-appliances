import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, onSnapshot } from "firebase/firestore";
// import { FaTimes, FaRegPaperPlane } from 'react-icons/fa';
import './BlogPage.scss';


export default function BlogPage() {
    const [articles, setArticles] = useState([]);
    // const [commentForm, setCommentForm] = useState(false);
    // const [commentAdded, setCommentAdded] = useState(false)

    useEffect(() => {
      const displayArticles = onSnapshot(
        collection(db, "blog"), 
        (snapshot) => {

          // setArticles(snapshot.docs.map(doc => ({...doc.data()})))
          setArticles(snapshot.docs.map(doc => ({...doc.data()})   ));
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        });
    }, [])

  return (
    <>
      { articles ?
        articles.map((el, key) => {
          if (el.popular == true){
            return (
              <div className="reference-container" key={key}> 
                {/* <div>{el.text}</div> */}
                <div className='reference-btm-text'>
                  <p className='reference-name'>{el.text} </p>
                  <p>{el.type} </p>
                  <p>{el.date} </p>
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
    </>
  )
}