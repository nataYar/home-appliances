import React, { useState, useEffect, lazy } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Editor,  EditorState, convertFromRaw } from 'draft-js';
import './ManageBlog.scss';
import { CreatePost } from '../../importsComponents'

export default function ManageBlog() {
    const [newPostModuleVisible, setNewPostModuleVisible] = useState(false)
    const [articlesApproved, setArticlesApproved] = useState([]);
    
    const toggleNewPostVisibility = () => {
        setNewPostModuleVisible(!newPostModuleVisible)
    }

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
                            className="button-standard"
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
                        toolbarClassName='hide-toolbar'
                        readOnly={true}
                        />
                        <p className='blog-page_date'>{el.time}</p>
                    </div>
                )})
        }
    
    return (
    <div className='manage-blog_container'> 
        {! newPostModuleVisible ? 
          <button className="button-standard btn-add-blog" value="Add new article"
          onClick={() => toggleNewPostVisibility()}
          >Add new article</button>
          : null
        }
        { newPostModuleVisible ? < CreatePost postId={Date.now().toString()} toggleNewPostVisibility={toggleNewPostVisibility} /> : null }
         <div className='manage-blog_posts-container'>
            <h2>Your articles</h2>
            { mapArray(articlesApproved) }
         </div>
        
    </div>
  )
}
