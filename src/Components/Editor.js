import React, { useEffect,useRef } from 'react';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import CodeMirror from 'codemirror';
import ACTIONS from './Actions';
// import { ConfigProvider } from 'react-avatar';

const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef=useRef(null);
  useEffect(()=>{
    async function init(){
      editorRef.current=CodeMirror.fromTextArea(document.getElementById('textArea'),{
        
        mode:{name:'javascript',json:true},
        theme:'dracula',
        autoCloseBrackets: true,
        autoCloseTags: true,
        lineNumbers:true,
        
      }
      );
      
      editorRef.current.on('change',(instance,changes)=>{
        // console.log('changes',changes);
        const {origin}=changes;
        // console.log(origin)
        const code=instance.getValue();
        onCodeChange(code);
        if(origin!=='setValue'){
          socketRef.current.emit(ACTIONS.CODE_CHANGE,{
              roomId,
              code,
          })
        }
        console.log(code);
      })


      
      // editorRef.current.setValue("Console.log('hello')");
      
    }
    init();
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    if(socketRef.current)
    socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
      if(code!== null){
        editorRef.current.setValue(code);
      }
    })
  },[socketRef.current])
  return (
    <div className='midEditor'>
      <textarea id="textArea"></textarea>
    </div>
  )
}

export default Editor


