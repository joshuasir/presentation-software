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
// import DataOptionsTab from '../../../components/DataOptionsTab'

const mapState = ({ musics }) => ({
    list: musics.list,
})

const mapDispatch = (dispatch) => ({
    getMusics: () => dispatch(getMusics()),
    addMusic: (music) => dispatch(addMusic(music)),
    getMusic: (musicId) => dispatch(getMusic(musicId)),
    getMusics: () => dispatch(getMusics()),
    
    updateMusicLyrics: (musicId, newVal) => dispatch(updateMusicLyrics(musicId, newVal)),
    updateMusicTitle: (musicId, newVal) => dispatch(updateMusicTitle(musicId, newVal)),
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
            this.setState({
                isLoading: false,
            })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }

    state = {
        isLoading: false,
        testing: null,
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
            <div style={{ padding: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h2>Music list</h2>
                    {/* <DataOptionsTab
                        onExport={this.handleExport}
                        onImport={this.tryResponder}
                    /> */}
                </div>
                {(this.state.testing) ? <p>{this.state.testing}</p> : null}
                <MusicPageUI
                    list={list}
                    onOpen={() => console.log('hi')}
                    onAddMusic={addMusic}
                    onGetMusic={getMusic}
                    onUpdateMusicLyrics={updateMusicLyrics}
                    onUpdateMusicTitle={updateMusicTitle}
                    onDeleteMusic={deleteMusic}
                />
            </div>
        )
    }
}

Home.propTypes = {
    list: PropTypes.array,
    getMusics: PropTypes.func.isRequired,
}

// export default Home
export default connect(mapState, mapDispatch)(Home)
