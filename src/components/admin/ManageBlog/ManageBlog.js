import React, { useEffect, useState } from 'react';
import { CreatePost} from '../../importsComponents';

import { db } from '../../../firebaseConfig';
import { collection, doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";


export default function ManageBlog() {
    // const [postsArr, setPostsArr] = useState([]);
    // const [postData, setPostData] = useState({});

    // const [postsId, setPostId] = useState('');
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
        })} */}


    </div>
  )
}
