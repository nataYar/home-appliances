import React, { useState } from 'react';
import { CreatePost} from '../../importsComponents';

import { db } from '../../../firebaseConfig';
import { collection, doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";


export default function ManageBlog() {
    const [newPostModuleVisible, setNewPostModuleVisible] = useState(false)

    const toggleNewPostVisibility = () => {
        setNewPostModuleVisible(!newPostModuleVisible)
    }

    return (
    <div> 
        <button className="button-standard" value="Add new article"
        onClick={() => toggleNewPostVisibility()}
        >Add new article</button>
         { newPostModuleVisible ? <CreatePost postId={Date.now().toString()} /> : null }


         {/* {
            articles.map((el, key) => {
            const contentState = convertFromRaw(el.mainText);
            const editorState = EditorState.createWithContent(contentState);
            return(
                <div className='blog-page_post' key={key}>
                <div className='blog-page_info'>
                    <p className='blog-page_brand'>{el.brand}</p>
                    <p className='blog-page_type'>{el.type}</p>
                </div>
                <h4>{el.title}</h4>
                <div className='blog-page_img'>
                    <img src={el.imgSrc} />
                </div>
                <Editor editorState={editorState} readOnly={true}
                />
                <p className='blog-page_date'>{el.time}</p>
                </div>
                )
            })
        } */}

       {/* { blogArr.map((el, key) => {
            // const gsReference = ref(storage, el.src);
            // console.log(gsReference)
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
        })
        } */}


    </div>
  )
}
