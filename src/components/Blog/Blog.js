import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
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

  const openModal = (el) => {
    setShowModal(true)
    // displayPost(el)
    const contentState = convertFromRaw(el.mainText);
    // const text = EditorState.createWithContent(contentState);
    setText(EditorState.createWithContent(contentState))
    setModal(el)
  }

  // useEffect(()=> {
  //   displayPost(el)
  // }, [showModal])

  const hideModal = () => {
    setShowModal(!showModal)
  }

  // const ModalContainer = (el, editorState ) => {
  //   return (
  //     <div className='modal_container' onClick={() => setShowModal(!showModal)} >
  //       <div className='modal-guts'>
  //         <button onClick={hideModal}> close </button>
  //         {
  //           el.brand ? <p className=''>{el.brand}</p> : null
  //         }
  //         <p className=''>{el.type}</p>
  //       </div>
  //       <h2>{el.title}</h2>
  //       <div className=''>
  //         <img src={el.imgSrc} alt=''
  //         />
  //       </div>
  //       {/* <Editor editorState={editorState} readOnly={true} /> */}
  //       <p className='blog-page_date'>{el.time}</p>
  //     </div>
  //   )
  // }

  // const displayPost = (el) => {
  //   // console.log(el)
  //   // const contentState = convertFromRaw(el.mainText);
  //   // const editorState = EditorState.createWithContent(contentState);
  //    return <ModalContainer el={el} />
  //   //  editorState={editorState}
     
  // }


  return (
    <div className='blog-list__container'>
      {
        showModal ?
        <div className='modal_container' onClick={() => setShowModal(false)} >
            <button onClick={hideModal}> close </button>
            {
              modal.brand ? <p className=''>{modal.brand}</p> : null
            }
            <p className=''>{modal.type}</p>
            
            <h2>{modal.title}</h2>
            <div className='blog-list__img'>
              <img src={modal.imgSrc} alt=''
              />
            </div>
            <Editor editorState={text} readOnly={true} />
            <p className='blog-page_date'>{modal.time}</p>
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
