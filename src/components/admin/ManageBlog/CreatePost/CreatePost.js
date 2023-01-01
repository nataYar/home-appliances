import React, { 
  useMemo,
  useEffect,
  useRef,
  useState } from 'react';
import { db, storage } from '../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { convertToRaw} from 'draft-js';

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from '@draft-js-plugins/buttons';
import './editorStyles.scss';

const text =
  'In this editor a toolbar shows up once you select part of the text …';

export default function CreatePost ({ postId, toggleNewPostVisibility  }) {
    const [postData, setPostData] = useState({});
    const [editorState, setEditorState] = useState(() => createEditorStateWithText(''));
    const [imageUpload, setImageUpload] = useState(null);
    const [type, setType] = useState(null);
    const [brand, setBrand] = useState(null);
    const editor = useRef(null);

    const [plugins, InlineToolbar] = useMemo(() => {
      const inlineToolbarPlugin = createInlineToolbarPlugin();
      return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    }, []);

    useEffect(() => {
        // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
        setEditorState(createEditorStateWithText(text));
    }, []);

    const onChange = (value) => { setEditorState(value); };

    const focus = () => {
        var _a;
        (_a = editor.current) === null || _a === void 0 ? void 0 : _a.focus();
    };

    // headlines
    const HeadlinesPicker = (props) => {
      useEffect(() => {
        setTimeout(() => {
          window.addEventListener('click', onWindowClick);
        });
        return () => {
          window.removeEventListener('click', onWindowClick);
        };
      }, []);

      const onWindowClick = () => {
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        props.onOverrideContent(undefined);
      }

        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
          <div>
            { buttons.map((Button, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Button key={i} {...props} 
               />
            ))}
          </div>
        );
    }

    const HeadlinesButton = (props) => {
        // When using a click event inside overridden content, mouse down
      // events needs to be prevented so the focus stays in the editor
      // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
      const onMouseDown = (event) => { event.preventDefault(); }
    
      const onClick = () => {
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        props.onOverrideContent(HeadlinesPicker);
      }
        return (
          <div
            onMouseDown={(e) => onMouseDown(e)}
            className='headlineButtonWrapper' 
          >
            <button 
            onClick={onClick}
             className='headlineButton'>
              H
            </button>
          </div>
        );
    }

    useEffect(() => {
      setPostData({
        ...postData,
        type: type
      });
    },[type])

    useEffect(() => {
      setPostData({
          ...postData,
          brand: brand
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
        cleanUp()
    }
   
    const uploadFile = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const data = {
            ...postData,
            imgSrc: url
          }
          setDoc(doc(db, "blog", postId), data, {
            merge: true
        });
        });
        
      });
    }

    const writePost = () => {
      uploadFile();
      const data = {
          ...postData,
          title: postData.title,
          mainText: convertToRaw(editorState.getCurrentContent()),
          brand: brand,
          type: type,
          // imgSrc: postData.imgSrc,
          time: getDate(),
          postId: postId,
      };
      setDoc(doc(db, "blog", postId), data, {
          merge: true
      });
    }

    const cleanUp = () => {
      console.log('clean up')

      setPostData({
        // imgSrc: null,
        title: '', 
        // brand: null,
        // type: null
      })
      setImageUpload(null);
      setType(null);
      setBrand(null);
      // setImgURL(null)
      document.getElementById('inputImg').value = null;
      toggleNewPostVisibility()
    }

    // useEffect(()=>{
    //   console.log(imageUpload)
    // }, [imageUpload])


    useEffect(()=>{
      console.log(postData.imgSrc)
    }, [postData.imgSrc])

    function getDate(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`
    }

  return (
    <div className='create-post_container'>
        <form className='sc-form' onSubmit={submitPost} >
            <div className='create-post_container-btns'>
                <button className="button-standard" value="CANCEL">CANCEL</button>
                <button className="button-standard" type="submit" value="SEND">SEND</button>
            </div>
            <textarea className="form-control" rows="2" placeholder="Title" 
            name="title" 
            type="mainText"
            onChange={ (e) => updatePostInput(e) }
            value={ postData.title || '' }
            required
            />
            <div>
              <p>Attach image: </p>
              <input type="file" id="inputImg" name="img" accept="image/*"
              onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
                // required
            />
            </div>
            
            <div>
                <label htmlFor="applianceTypes">Choose type: </label>
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
                <label htmlFor="applianceBrand">Choose brand: </label>
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
        </form>

        <div className='editor' onClick={focus}>
          <Editor
            editorKey="CustomInlineToolbarEditor"
            editorState={editorState}
            onChange={onChange}
            plugins={plugins}
            ref={(element) => {
              editor.current = element;
            }}
          />
          <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <Separator {...externalProps} />
                <HeadlinesButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
        </div>
    </div>
  )
}
