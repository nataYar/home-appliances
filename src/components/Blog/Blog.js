import React from 'react';
// import { FaTimes, FaRegPaperPlane } from 'react-icons/fa';
import { cookSm, refSm, drSm, freezSm, ovSm, washSm } from '../../Images/imgImports';
import './Blog.scss';

export default function Blog() {
    const articles = [
      {
      id: '1',
      popular: true,
      type: 'refrigerators',
      brand: 'Samsung',
      mainiImg: freezSm,
      brief:'how to fix a fridge',
      text: [
          'text begining', 
          'text middle', 
          'text end' 
        ]
      },
      {
        id: '2',
        popular: true,
        type: 'washing machines',
        brand: 'AEG',
        mainiImg: washSm,
        brief:'how to fix a washing machine',
        text: [
            'text begining', 
            'text middle', 
            'text end' 
          ]
        },
        {
          id: '3',
          popular: true,
          type: 'cook tops',
          brand: 'Bosch',
          mainiImg: cookSm,
          brief:'how to fix a cook top',
          text: [
              'text begining', 
              'text middle', 
              'text end' 
            ]
          },
    ] 

    const goToTheArticle = (id) => {
      console.log(id)
    } 

  return (
    <div className='blog-list__container'>
      { articles.map((el) => {
          if (el.popular == true){
            return (
              <div className='blog-list__item' key={el.id}> 
                <div className='blog-list__img'>
                  <img 
                  src={el.mainiImg}
                  alt='appliance image'/>
                </div>
                <div className='blog-list__text'>
                  <div className=''>{el.brief} </div>
                  {/* {
                    el.text.map((p, index) => {
                      return (
                        <div key={index}>{p}</div>
                      )
                    })
                  } */}
                  <div className='blog-list__text-info'>
                    <p>{el.type}</p>
                    <p>{el.brand}</p>
                    </div>
                </div>
                
            </div>
            )
          } else {
            return 
          }
        })
      }
    </div>
  )
}

 // useEffect(() => {
    //   const displayArticles = onSnapshot(
    //   collection(db, "blog"), 
    //   (snapshot) => {
    //     setArticles(snapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
    //   })
    

      // Get metadata properties
    //   const imgRef = ref(storage, '1.jpg');
    //   getMetadata(imgRef)
    //   .then((metadata) => {
    //     // console.log(metadata)
    //     // Metadata now contains the metadata for 'images/forest.jpg'
    //   })
    //   .catch((error) => console.log(error))

    // }, [])
