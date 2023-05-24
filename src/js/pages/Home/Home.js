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
  
           // if(JSON.parse()){
            //     this.setState({...state,fullScreenMode:true})
            //     alert(true)
            // }
            this.setState({
                isLoading: false,
                isFullScreen: isFullScreen,
                ids :ids.split(",").map(id=>id.trim())
            })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }

    state = {
        isLoading: false,
        testing: null,
        isFullScreen: false,
        ids:[]
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
            {this.state.isFullScreen ? <PresentationPageUI musics={list.filter(l=>this.state.ids.some(id=>id==l.music_id))}/> :
            <div className='w-full flex'>
            <div className='bg-white w-1/3 h-screen' style={{ padding: 15 }}>
          
            {(this.state.testing) ? <p>{this.state.testing}</p> : null}
            <MusicPageUI
                list={list}
                onOpen={() => console.log('hi')}
                onAddMusic={addMusic}
                onGetMusic={getMusic}
                onUpdateMusicLyrics={updateMusicLyrics}
                onUpdateMusicTitle={updateMusicTitle}
                onDeleteMusic={deleteMusic} />
            </div>
        <div className='bg-gray-300 w-1/3 h-screen'>
            <PreviewPageUI musics={list}/>

        </div>
        <div className='w-1/3'>
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
