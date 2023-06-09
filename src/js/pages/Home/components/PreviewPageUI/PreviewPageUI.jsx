import React,{useEffect, useState,useContext} from 'react'
import { Deck, Slide, Heading } from 'spectacle';
import { remote } from 'electron'
import path from 'path'
import Select from 'react-select'


function PreviewPageUI(props) {
  const { musics,music,handleSetMusic } = props
  // const location = useLocation();
  // const isPresenterMode = new URLSearchParams(location.search).get('presenterMode') === 'true';

  
  const [currSlide, setCurrSlide] = useState(0);
  // const [selectedLyric, setSelectedLyric] = useState(-1);
  const [isHover, setIsHover] = useState(0);

  // const [music, setMusic] = useState(musics.find(a=>a.music_id==1));
  const handleSelectMusic = (id) =>{
    handleSetMusic(id);
    // setSelectedLyric(0)
    setCurrSlide(0)
    handleSelectedStyle(0)
  }

  const handleSelectedStyle = (id) =>{
    let style = {}
    if(isHover==id) style.cursor = 'pointer';
    if(currSlide==id+1) style = {...style,backgroundColor:'#0099ff',color:'white'}
    return style;
  }
  const handleSelectedSlide = (id) =>{
   
    setCurrSlide(id+1)
  }

  // function createPresenterWindow() {
  //   console.log(window.location.href.split('?')[0])
  //   const BrowserWindow = remote.BrowserWindow
  //   const win = new BrowserWindow({
  //     width: 1200,
  //     height: 800,
  //     webPreferences: {
  //         // as a best practice + safety, nodeIntegration should be false
  //         // this keeps the renderer thread having direct access to Node
  //         nodeIntegration: true,
  //         // will sanitize JS code to be safe
  //         worldSafeExecuteJavascript: true,
  //         // is a feature that ensures that both your
  //         // preload scripts and Electron's internal logic tunes in seperate context:
  //         contextIsolation: false,
  //         // preload script exposes the parts needed for renderer from main thread:
  //         preload: path.join(__dirname, 'preload.js')
  //     },
  // }).loadURL(window.location.href+'&fullScreenMode=true')

  // win.loadFile('index.html')
    
  //   // BrowserWindow.loadURL();
  //   // Add any additional configuration or event handling for the presenter window
  // }
  // const {Deck,Slide,Heading,DefaultTemplate} = window.spectacle
  return (
     <>

    <div className='p-5 pb-0 h-20'>
      <Select value={music ? {value:music.music_id,label:music.title}:''} onChange={(e)=>handleSelectMusic(e.value)} options={musics.map(a=>({value:a.music_id,label:a.title}))}/>
     
    </div>

    <div className='p-3 pl-5 h-2/5 overflow-y-scroll'>
    <ol>
      {music && music.lyrics.split('#').map((a,idx)=>(
        <li style={
          handleSelectedStyle(idx)
        } 
        className='truncate p-1 hover:bg-gray-100'
        onClick={(e)=>handleSelectedSlide(idx)}
        onMouseEnter={() => setIsHover(idx)}
        onMouseLeave={() => setIsHover(-1)}
        >{(idx+1) + ". "+ a.trim()}</li>
      ))}
      {/* <button onClick={createPresenterWindow}>tes</button> */}
    
    </ol>
    </div>
  
    
    <div className='h-2/5 mt-10'>
    
{music &&

    <Deck theme={{backdropStyle:{ position: 'relative', height:'100%'}}} template={({ slideNumber, numberOfSlides }) => (
      <></>
    )} >
      
      <Slide backgroundColor={'white'} >
      {currSlide==0 ? 
        <Heading color={'black'} lineHeight={'1.2em'} marginTop={'1em'}>
              {music.title.trim()}
            </Heading>
          :<></>  
        }
        {music.lyrics.split('#').filter((a,idx)=> idx+1==currSlide && currSlide!=0 ).map(a=>(<>

        <Heading color={'black'} lineHeight={'1.2em'} >
              <span className='whitespace-pre-line'>{a.trim()}</span> 
            </Heading>

      </>
      ))
      
      }
        
      </Slide>
      
      
    </Deck>
}
</div>

    </>
  )
}

export default PreviewPageUI