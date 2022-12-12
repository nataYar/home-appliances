import React, { useState } from 'react';

import { db } from '../../../../firebaseConfig';
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function CreatePost ({ postId }) {
    const [postData, setPostData] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
   
    // useEffect(() => {
    //     const id = Date.now().toString();
    //     setPostId(id)
    //     console.log(id)
    // },[])

    // useEffect(() => {
    //     const displaytestimonials = onSnapshot(
    //     collection(db, "testimonials"), 
    //     (snapshot) => {
    //         setTestimonialsArr(snapshot.docs.map(doc => ({...doc.data(), id: doc.id, })))
    //     },
    //     (error) => {
    //         console.log(error)
    //     });
    // }, [])



const updatePostInput = e => {
    setPostData({
        ...postData,
        title: e.target.value
    });
}

const submitPost = (e) => {
    e.preventDefault()
    writePost();
    setPostData({
        title: '',
    })
}

const writePost = () => {
    const data = {
        ...postData,
        title: postData.title,
        time: new Date(),
    };
    setDoc(doc(db, "blog", postId), data, {
        merge: true
    });
}


const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    const text = convertToRaw(editorState.getCurrentContent())
    setDoc(doc(db, "blog", postId), text, {
        merge: true
    });
}


  return (
    <div>
        <form className="sc-form" onSubmit={submitPost} >
            <textarea className="form-control" rows="10" placeholder="Title" 
            name="title" 
            type="text"
            onChange={(e) => updatePostInput(e)}
            value={postData.title || ''}
            />

            <input type="file" id="img" name="img" accept="image/*"></input> 

            <button className="button-standard" type="submit" value="SEND">SEND </button>
        </form>

        <Editor 
        editorClassName='editor'
        editorState={editorState}
        onEditorStateChange={onEditorStateChange} />
    </div>
  )
}
