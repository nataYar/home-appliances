import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function ManageBlog() {
    const [blogArr, setBlogArr] = useState([]);
    const [postData, setPostData] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
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

    // const approveFn = (el) => {
    //     const data = {
    //     name: el.name,
    //     phoneNumber: el.phoneNumber,
    //     city: el.city,
    //     text: el.text,
    //     date: el.date,
    //     status: 'approved',
    // };
    
    //     setDoc(doc(db, "testimonials", el.phoneNumber ), data);
    // }

    // const deleteFn = (el) => {
    //     const data = {
    //     name: el.name,
    //     phoneNumber: el.phoneNumber,
    //     city: el.city,
    //     text: el.text,
    //     date: el.date,
    //     status: 'deleted',
    //     };
    //     setDoc(doc(db, "testimonials", el.phoneNumber), data);
    // }

const submitPost = () => {}

const updatePostInput = e => {
    setPostData({
        ...postData,
        // [e.target.picture]: e.target.value,
        [e.target.title]: e.target.value,
        [e.target.text]: e.target.text,
        time: new Date(),
  })
}
const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    
    //     const data = {
    //     name: el.name,
    //     phoneNumber: el.phoneNumber,
    //     city: el.city,
    //     text: el.text,
    //     date: el.date,
    //     status: 'approved',
    // };
    
    //     setDoc(doc(db, "testimonials", el.phoneNumber ), data);

}

  return (
    <div>ManageBlog
       { blogArr.map((el, key) => {
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
        })}


        <Editor 
        editorClassName='editor'
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}/>



        {/* <form className="sc-form"
                onSubmit={submitPost}>
                    <div>
                        <input className="form-control" type="text" placeholder='Title'
                        name="title" 
                        onChange={(e) => updatePostInput(e)}
                        value={postData.title || ''} 
                        required />

                        <input className="form-control" 
                        type="text"
                        placeholder="Text" 
                        name="text" 
                        onChange={(e) => updatePostInput(e)}
                        value={postData.text || ''}
                        required />
                        
                        <textarea className="form-control" rows="10" placeholder="Prices" 
                        name="prices" 
                        type="text"
                        onChange={(e) => updatePostInput(e)}
                        value={postData.prices || ''}
                        />
                        
                        <input type="file" id="img" name="img" accept="image/*"></input>

                    </div>
                    <button className="button-standard" type="submit" value="SEND">SEND </button>
                </form> */}
    </div>
  )
}
