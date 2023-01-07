import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { FaTimes } from 'react-icons/fa';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import './Blog.scss';

export default function Blog( numOfArticles  ) {
  const [articles, setArticles] = useState([]);
  const [sixArticles, setSixArticles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({})
  const [text, setText] = useState(null)

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

  useEffect(()=> {
    setSixArticles(articles.slice(0, 5))
  }, [articles])

  const openModal = (el) => {
    setShowModal(true)
    // displayPost(el)
    const contentState = convertFromRaw(el.mainText);
    // const text = EditorState.createWithContent(contentState);
    setText(EditorState.createWithContent(contentState))
    setModal(el)
  }


  const hideModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className='blog-list__container'>
      {
        showModal ?
        <div className='modal_container' onClick={() => setShowModal(false)} >
             {/* <FaTimes className='modal-btn' onClick={hideModal}/> */}
            <div className='modal-top'>
              {
                modal.brand ? <p>{modal.brand}</p> : null
              }
              <p>{modal.type}</p>
            </div>
          
          <div className='modal-content'>
            <h2>{modal.title}</h2>
            <div className='modal-content_body'>
              <div className='modal_img'>
                <img src={modal.imgSrc} alt=''
                />
              </div>
              <div className='modal_editor'>
                <Editor editorState={text} readOnly={true} />
              </div>
              
            </div>
            <p className='blog-page_date'>{modal.time}</p>
          </div>
        </div>
      : null
      }

      { sixArticles.map((el, key) => {
            return (
              <div className='blog-list__item' key={key}
              onClick={() => openModal(el)} > 
                <div className='blog-list__img'>
                  <img 
                  src={el.imgSrc}
                  />
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
