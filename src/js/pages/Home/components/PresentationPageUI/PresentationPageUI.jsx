import React,{useEffect, useState,useContext} from 'react'
import { Deck, Slide, Heading, DefaultTemplate } from 'spectacle';
import { remote } from 'electron'
import path from 'path'
import Select from 'react-select'


function PresentationPageUI(props) {
  const { musics } = props

  return (
 <>
{musics &&

    <Deck 
    template={ <DefaultTemplate /> } 
    >
      {musics.map(music=>(
        <>
        <Slide backgroundColor={'white'}>
        <Heading color={'black'} lineHeight={'1.2em'} >
            {music.title.trim()}
          </Heading>
        </Slide>
        {music.lyrics.split('#').map(a=>(
          <Slide backgroundColor={'white'}>
          <Heading color={'black'} lineHeight={'1.2em'} >
            {a.trim()}
          </Heading>
          </Slide>
      
      ))
      
      }
        
      
      </>
      ))}
      
      
      
    </Deck>
}
</>)
}

export default PresentationPageUI