/* Container file */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    getMusics,
    addMusic,
    getMusic,
    updateMusicTitle,
    updateMusicLyrics,
    deleteMusic,
} from '../../features/feature-music/services/music.service'


import MusicPageUI from './components/MusicPageUI'
import PreviewPageUI from './components/PreviewPageUI/PreviewPageUI'
import StreamPageUI from './components/StreamPageUI/StreamPageUI'
import PresentationPageUI from './components/PresentationPageUI/PresentationPageUI'
// import DataOptionsTab from '../../../components/DataOptionsTab'

const mapState = ({ musics }) => ({
    list: musics.list,
})

const mapDispatch = (dispatch) => ({
    getMusics: () => dispatch(getMusics()),
    addMusic: (music) => dispatch(addMusic(music)),
    getMusic: (musicId) => dispatch(getMusic(musicId)),
    getMusics: () => dispatch(getMusics()),
    
    updateMusicLyrics: (musicId,newVal) => dispatch(updateMusicLyrics(musicId,newVal)),
    updateMusicTitle: (musicId,newVal) => dispatch(updateMusicTitle(musicId,newVal)),
    deleteMusic: (musicId) => dispatch(deleteMusic(musicId)),
    // deleteMusics: () => dispatch(deleteMusics()),
    // openMusic: musicId => dispatch({
    //     type: '@open::musics::music-page',
    //     musicId: musicId,
    // }),
})


class Home extends Component {
    async componentDidMount() {
        try {
            const { getMusics } = this.props
            
            this.setState({ isLoading: true })
            await getMusics()
            let params = (new URL(document.location)).searchParams;
  
            let isFullScreen = params.get("fullScreenMode");
            let ids = params.get("ids");
            // console.log(isFullScreen,ids)
           // if(JSON.parse()){
            //     this.setState({...state,fullScreenMode:true})
            //     alert(true)
            // }
            this.setState({
                isLoading: false,
                isFullScreen: isFullScreen,
                ids :ids.split(",").map(id=>id.trim()),
            })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }
   handleSetMusic = (id) =>{
        const { list } = this.props
        this.setState({...this.state,music:list.find(a=>a.music_id==id)});
        // setSelectedLyric(0)
        
    }

    state = {
        isLoading: false,
        testing: null,
        isFullScreen: false,
        ids:[],
        music:null
    }

    // tryResponder = async () => {
    //     await this.props.deleteMusics()
    // }

    // handleExport = () => {
    // }

    render() {
        const {
            list,
            addMusic,
            getMusic,
            updateMusicTitle,
            updateMusicLyrics,
            deleteMusic,
        } = this.props

        return (
            <>
            {this.state.isFullScreen ? <PresentationPageUI musics={
                list.filter(l=>this.state.ids.some(id=>id==l.music_id)).
                sort((a, b) => {
                    const indexA = this.state.ids.indexOf(a.music_id+'');
                    const indexB = this.state.ids.indexOf(b.music_id+'');
                    // console.log(a.music_id,this.state.ids)
                    return indexA-indexB;
                  })
            }/> :
            <div className='w-full flex h-screen'>
            <div className='bg-gray-200 w-96 overflow-y-hidden' style={{ padding: 15 }}>
          
            {(this.state.testing) ? <p>{this.state.testing}</p> : null}
            <MusicPageUI
                list={list}
                onOpen={() => console.log('hi')}
                onAddMusic={addMusic}
                onGetMusic={getMusic}
                onUpdateMusicLyrics={updateMusicLyrics}
                onUpdateMusicTitle={updateMusicTitle}
                onDeleteMusic={deleteMusic} 
                handleSetMusic={(id)=>this.handleSetMusic(id)}
                />
            </div>
        <div className='bg-gray-300 w-1/3 overflow-y-hidden'>
            <PreviewPageUI musics={list} music={this.state.music} handleSetMusic={(id)=>this.handleSetMusic(id)}/>

        </div>
        <div className='w-1/3 bg-gray-200 overflow-y-hidden'>
            <StreamPageUI musics={list}/>
        </div>
        </div>
        }
        </>
        )
    }
}

Home.propTypes = {
    list: PropTypes.array,
    getMusics: PropTypes.func.isRequired,
}

// export default Home
export default connect(mapState, mapDispatch)(Home)
