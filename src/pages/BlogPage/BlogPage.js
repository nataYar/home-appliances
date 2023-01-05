import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import './BlogPage.scss';

export default function BlogPage() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [filterBrand, setFilterBrand] = useState('all');

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


    useEffect(() => { 
      if (filterType === 'all' && filterBrand === 'all') {
        setFilteredArticles(articles)
     }}, [articles])
  
    function defineFilter(e){
      const filterByType = document.getElementById("filterByType");
      const filterByBrand = document.getElementById("filterByBrand");
      if (e.target === filterByBrand) {
          setFilterBrand(e.target.value.toLowerCase());
      }
      if (e.target === filterByType) {
        setFilterType(e.target.value.toLowerCase());
        handleFilter();
      } 
    }

    useEffect(() => { handleFilter()}, [filterType, filterBrand])

    const handleFilter = () => {
      if (filterType === 'all' && filterBrand === 'all') {
        setFilteredArticles(articles)
      } else if (filterType !== 'all' && filterBrand === 'all') {
        let filtered = articles.filter(element => {
          return element.type === filterType.toLowerCase();
        });
        setFilteredArticles(filtered); 
      } else if (filterType !== 'all' && filterBrand !== 'all') {
         let filtered = articles.filter(element => {
          return element.brand === filterBrand.toLowerCase() && element.type === filterType.toLowerCase();
        });
        setFilteredArticles(filtered); 
      } else if (filterType === 'all' && filterBrand !== 'all') {
        let filtered = articles.filter(element => {
          return element.brand === filterBrand.toLowerCase();
        });
        setFilteredArticles(filtered); 
      } 
    }

  return (
    <div className='blog-page'>
      {/* BREADCRUMBS */}

      {/* filter by APPLIANCE TYPE  */}
      <div className='filter'>
        <label htmlFor="applianceTypes">Filter by appliance: </label>
        <select name="applianceTypes" id="filterByType" onChange= { (e) => defineFilter(e) }>
            <option value="all">All</option>
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
        <label htmlFor="applianceBrand">Filter by brand: </label>
        <select name="applianceBrand" id="filterByBrand" onChange= { (e) => defineFilter(e) }>
            <option value="all">All</option>
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
      <div className='blog-page_container'>
      {
        filteredArticles.map((el, key) => {
        const contentState = convertFromRaw(el.mainText);
        const editorState = EditorState.createWithContent(contentState);
          return(
            <div className='blog-page_post' key={key}>
              <div className='blog-page_info'>
                <p className='blog-page_brand'>{el.brand}</p>
                <p className='blog-page_type'>{el.type}</p>
              </div>
              <h2>{el.title}</h2>
              <div className='blog-page_img'>
                <img src={el.imgSrc} alt=''
                />
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