import React,{useEffect, useState,useContext} from 'react'
import { Deck, Slide, Heading, DefaultTemplate } from 'spectacle';



function PresentationPageUI(props) {
  const { musics } = props

  return (
 <>
{musics &&

    <Deck 
    template={ <DefaultTemplate color={'black'} /> } 
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
          <Heading color={'black'} lineHeight={'1.2em'}>
          <span className='whitespace-pre-line'>{a.trim()}</span>
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