import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import './BlogPage.scss';

export default function BlogPage() {
    const [articles, setArticles] = useState([]);

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
    <div className='blog-page'>
      {/* BREADCRUMBS */}

      {/* filter by APPLIANCE TYPE  */}
      <div className='filter'>
        <label htmlFor="applianceTypes">Filter by appliance: </label>
        <select name="applianceTypes" >
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
       {/* FILTER by BRAND  */}
       <div className='filter'>
        <label htmlFor="applianceTypes">Filter by brand: </label>
        <select name="applianceTypes" >
            <option value="common mistakes">Samsung</option>
            <option value="refrigerator">AEG</option>
            <option value="dryer">BOSCH</option>
            {/* <option value="cooktop">Cooktop</option>
            <option value="oven">Oven</option>
            <option value="freezer">Freezer</option>
            <option value="washer">Washer</option>
            <option value="washer">Water heater</option> */}
        </select>
      </div>
      <div className='blog-page_container'>
      {
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
      }
      </div>
    </div>
   
  )
}