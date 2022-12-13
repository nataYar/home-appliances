import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import './BlogPage.scss';

export default function BlogPage() {
    const [articles, setArticles] = useState([]);
    // const contentState = convertFromRaw(initialState);
    // const editorState = EditorState.createWithContent(contentState)

    // the raw state, stringified
    // const rawDraftContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()) );
    // // convert the raw state back to a useable ContentState object
    // const contentState = convertFromRaw( JSON.parse( rawDraftContentState) );

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

  return (
    <>
    {
      articles.map((el, key) => {
      const contentState = convertFromRaw(el.mainText);
      const editorState = EditorState.createWithContent(contentState);
        return(
          <div key={key} 
          style={ {marginTop:'5rem' } }>
            {el.title}
            <Editor editorState={editorState} readOnly={true}
            />
            {el.time}
          </div>
          )
      })
     }

      {/* { articles ?
        articles.map((el, key) => {
          if (el.popular == true){
            return (
              <div className="reference-container" key={key}> 
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
      } */}
    </>
  )
}