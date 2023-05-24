import React,{useEffect, useState,useContext} from 'react'
import { remote } from 'electron'
import path from 'path'
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd'
import Select from 'react-select'

function StreamPageUI(props) {
  const { musics } = props
  // const location = useLocation();
  // const isPresenterMode = new URLSearchParams(location.search).get('presenterMode') === 'true';

  const [selectMusics, setSelectMusics] = useState([]);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if(!destination) return;

    if(destination.droppableId===source.droppableId &&
        destination.index===source.index
      ) return;

      const new_music = Array.from(selectMusics)

      new_music.splice(source.index, 1)
      new_music.splice(destination.index,0,musics.find(m=>m.music_id == draggableId));
      // console.log(new_music,[...new_music])
      setSelectMusics([...new_music]);
  }
  const handleSetMusic = (selected) =>{
    // console.log(musics.filter(m=>selected.some(s=>s.value == m.music_id)))
    setSelectMusics(musics.filter(m=>selected.some(s=>s.value == m.music_id)))
  }


  const createPresenterWindow = () => {
  
    // console.log(window.location.href.parse(global.location.search)['fullScreenMode'])
            
    const BrowserWindow = remote.BrowserWindow
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
          // as a best practice + safety, nodeIntegration should be false
          // this keeps the renderer thread having direct access to Node
          nodeIntegration: true,
          // will sanitize JS code to be safe
          worldSafeExecuteJavascript: true,
          // is a feature that ensures that both your
          // preload scripts and Electron's internal logic tunes in seperate context:
          contextIsolation: false,
          // preload script exposes the parts needed for renderer from main thread:
          preload: path.join(__dirname, 'preload.js')
      },
  }).loadURL(window.location.href+'&fullScreenMode=true&ids='+selectMusics.map(a=>a.music_id).join(','));

  win.loadFile('index.html')
  // win.webContents.openDevTools()
    // BrowserWindow.loadURL();
    // Add any additional configuration or event handling for the presenter window
  }
  // const {Deck,Slide,Heading,DefaultTemplate} = window.spectacle
  return (
     <>

    <div className='p-5 pb-0 h-1/5 pt-3'>
    <div className='flex p-2'>
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-auto hover:cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
    <svg onClick={()=> createPresenterWindow()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white hover:cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>

    </div>
    <Select isMulti onChange={(e)=>handleSetMusic(e)} options={musics.map(a=>({value:a.music_id,label:a.title}))}/>
     
        

     
    </div>
    <div className='p-5 pl-7 h-4/5 overflow-y-scroll'>
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={'0'} key={'0'}>
    {(provided)=>(
      <ol {...provided.droppableProps}
      ref={provided.innerRef}>
        {selectMusics && selectMusics.map((a,idx)=>(
          <Draggable draggableId={a.music_id+""} key={a.music_id+""} index={idx} >
          {(provider)=>(
            <li 
            {...provider.draggableProps} 
            {...provider.dragHandleProps}
            ref={provider.innerRef}
            className='truncate p-2 bg-white border rounded-md m-1'
            
            >{(idx+1) + ". "+ a.title.trim()}</li>
          
            )}
            </Draggable>
          ))}
          
        {/* <button onClick={createPresenterWindow}>tes</button> */}
        {provided.placeholder}
      </ol>
    )}
      </Droppable>
    </DragDropContext>
    </div>

    
   
    </>
  )
}

export default StreamPageUI