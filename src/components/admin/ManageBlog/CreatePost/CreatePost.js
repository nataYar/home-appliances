import React, { useState } from 'react';

import { db, storage } from '../../../../firebaseConfig';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list } from "firebase/storage";

import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function CreatePost ({ postId }) {
    const [postData, setPostData] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [imageUpload, setImageUpload] = useState(null);

    const uploadFile = (e) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // setImageUrls(url);
            console.log(url)
          });
        });
        document.getElementById('inputImg').value = null;
        setEditorState({editorState})
    }
    

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
        uploadFile();
        setPostData({
            title: ''
        })
        setImageUpload(null);
    }

    const writePost = () => {
        const data = {
            ...postData,
            title: postData.title,
            time: getDate(),
        };
        setDoc(doc(db, "blog", postId), data, {
            merge: true
        });
    }

    function getDate(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        const data = {
            ...postData,
            mainText: convertToRaw(editorState.getCurrentContent())
        };
        setDoc(doc(db, "blog", postId), data, {
            merge: true
        });
    }

  return (
    <div>
        <form className="sc-form" onSubmit={submitPost} >
            <textarea className="form-control" rows="10" placeholder="Title" 
            name="title" 
            type="text"
            onChange={ (e) => updatePostInput(e) }
            value={ postData.title || '' }
            required
            />

            <input type="file" id="inputImg" name="img" accept="image/*"
            onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
              required
            />
            {/* <button onClick={uploadFile}>Upload Image</button> */}
            <div>
                <label htmlFor="applianceTypes">Type: </label>
                <select name="applianceTypes" id="type">
                    <option value="common mistakes">Common mistakes</option>
                    <option value="refrigerator">Refrigerator</option>
                    <option value="dryer">Dryer</option>
                    <option value="cooktop">Cooktop</option>
                    <option value="oven">Oven</option>
                    <option value="freezer">Freezer</option>
                    <option value="washer">Washer</option>
                    <option value="washer">Water heater</option>
                </select>
            </div>
            <button className="button-standard" type="submit" value="SEND">SEND</button>
        </form>

        <Editor 
        editorClassName='editor'
        editorState={editorState}
        onEditorStateChange={onEditorStateChange} />
    </div>
  )
}
