import React, { useState, useEffect } from 'react';

import { db, storage } from '../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function CreatePost ({ postId, toggleNewPostVisibility  }) {
    const [postData, setPostData] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [imageUpload, setImageUpload] = useState(null);
    const [type, setType] = useState(null);
    const [brand, setBrand] = useState(null);


    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const data = {
                ...postData,
                imgSrc: url
            };
            setDoc(doc(db, "blog", postId), data, {
                merge: true
            });
          });
        });
        document.getElementById('inputImg').value = null;
        // setEditorState({editorState})
    }
    

    useEffect(() => {
        const data = {
            ...postData,
            type: type
        };
        setDoc(doc(db, "blog", postId), data, {
            merge: true
        });
    },[type])

    useEffect(() => {
        const data = {
            ...postData,
            brand: brand
        };
        setDoc(doc(db, "blog", postId), data, {
            merge: true
        });
    },[brand])

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
        setType('');
        setBrand('');
        toggleNewPostVisibility()
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

            <div>
                <label htmlFor="applianceTypes">Type: </label>
                <select name="applianceTypes" id="selectType" onChange= { (e) => setType(e.target.value) }>
                    <option value="common mistakes">No type</option>
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

            <div>
                <label htmlFor="applianceBrand">Filter by brand: </label>
                <select name="applianceBrand" id="selectBrand" onChange= { (e) => setBrand(e.target.value) }>
                    <option value="">No brand</option>
                    <option value="samsung">Samsung</option>
                    <option value="aeg">AEG</option>
                    <option value="bosch">BOSCH</option>
                    {/* <option value="cooktop">Cooktop</option>
                    <option value="oven">Oven</option>
                    <option value="freezer">Freezer</option>
                    <option value="washer">Washer</option>
                    <option value="washer">Water heater</option> */}
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
