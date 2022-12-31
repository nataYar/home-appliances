import React, { useState, useEffect } from 'react';
import { CreatePost} from '../../importsComponents';
import { db } from '../../../firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './ManageBlog.scss';

export default function ManageBlog() {
    const [newPostModuleVisible, setNewPostModuleVisible] = useState(false)
    const [articlesPending, setArticlesPending] = useState([]);
    const [articlesApproved, setArticlesApproved] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const toggleNewPostVisibility = () => {
        setNewPostModuleVisible(!newPostModuleVisible)
    }

    useEffect(() => {
        const showPosts = onSnapshot(
          collection(db, "blog"), 
          (snapshot) => {
            setArticlesPending(snapshot.docs.map(doc => 
              ({ ...doc.data() })
              )
            )
          },
          (error) => {
            console.log(error)
          });
      }, [])

      useEffect(() => {
        const showPosts = onSnapshot(
          collection(db, "blog"), 
          (snapshot) => {
            setArticlesApproved(snapshot.docs.map(doc => 
              ({ ...doc.data() })
              )
            )
          },
          (error) => {
            console.log(error)
          });
      }, [])

      const deletePost = (el) => {
        deleteDoc(doc(db, "blog", el.postId));
      }

      function mapArray(arr) {
        return arr.map((el, ind) => {
            const contentState = convertFromRaw(el.mainText);
            const editorState = EditorState.createWithContent(contentState);
                return(
                    <div className='blog-page_post' key={ind}>
                        <div className='buttons'>
                            <button 
                            className="button-standard" role="button"
                            onClick={ () => deletePost(el)}
                            >
                            DELETE
                            </button>
                        </div>

                        <div className='blog-page_info'>
                            {el.brand ? <p className='blog-page_brand'>{el.brand}</p> : null} 
                            {el.type ? <p className='blog-page_type'>{el.type}</p> : null} 
                            
                        </div>
                        <h3> {el.title}</h3>
                        <div className='blog-page_img'>
                            <img src={el.imgSrc} />
                        </div>
                        <Editor 
                        editorState={editorState} 
                        // onEditorStateChange={onEditorStateChange} 
                        toolbarClassName='hide-toolbar'
                        readOnly={true}
                        />
                        <p className='blog-page_date'>{el.time}</p>
                    </div>
                )})
        }
    
    return (
    <div className='manage-blog_container'> 
        <button className="button-standard" value="Add new article"
        onClick={() => toggleNewPostVisibility()}
        >Add new article</button>
        { newPostModuleVisible ? < CreatePost postId={Date.now().toString()} toggleNewPostVisibility={toggleNewPostVisibility} /> : null }
         <div className='manage-blog_posts-container'>
            <h2>Your articles</h2>
            { mapArray(articlesApproved) }
         </div>
        
    </div>
  )
}
