import React from 'react'
import PropTypes from 'prop-types'

import MusicListUI from '../MusicListUI'
import AddMusic from 'components/AddMusic'
import UpdateMusic from 'components/UpdateMusic'
import Modal from 'components/Modal'

import getStyles from './MusicPageUI.style'
const styles = getStyles()

class MusicPageUI extends React.PureComponent {
    state = {
        inputTitleValue: '',
        inputLyricsValue: '',
        errorMsg: null,
        // edit related
        editModal: false,
        editMusicId: null,
        editInputValue: '',
        editErrorMsg: null,
    }

    handleTitleInput = (e) => {
        this.setState({ inputTitleValue: e.target.value, errorMsg: null })
    }
    handleLyricsInput = (e) => {
        this.setState({ inputLyricsValue: e.target.value, errorMsg: null })
    }

    handleEditInputTitle = (e) => {
        this.setState({ editInputTitleValue: e.target.value, editErrorMsg: null })
    }
    handleEditInputLyrics = (e) => {
        this.setState({ editInputLyricsValue: e.target.value, editErrorMsg: null })
    }
    handleAdd = (args) => {
        const { onAddMusic } = this.props

        if (!args ||args.title.length === 0 || args.lyrics.length===0) return this.setState({ errorMsg: 'Please enter at least one character' })

        onAddMusic(args)
        this.setState({ inputTitleValue: '',inputLyricsValue:'' })
    }

    handleEditModal = (musicId) => {
        // Prepare modal for update function
        // 1 - pick the item to be updated
        const { list } = this.props
        const selectedMusic = list.filter(item => item.music_id === musicId)
        // 2 - set the state for modal display
        this.setState({
            editModal: true,
            editMusicId: musicId,
            editInputValue: selectedMusic[0].description,
        })
    }

    handleMusicUpdate = (args) => {
        // import service
        const { editMusicId } = this.state
        const { onUpdateMusic } = this.props

        if (!args || args.title.length === 0|| args.lyrics.length === 0) return this.setState({ editErrorMsg: 'Please enter at least one character' })

        // update the music and close modal
        onUpdateMusic(editMusicId, args)
        this.setState({ editModal: false })
    }

    handleDelete = (musicId) => {
        const { onDeleteMusic } = this.props
        onDeleteMusic(musicId)
    }

    render () {
        const {
            editModal,
            errorMsg,
            inputTitleValue,
            inputLyricsValue,
            editInputTitleValue,
            editInputLyricsValue,
            editErrorMsg,
        } = this.state
        const { list, onGetMusic } = this.props
        return (
            <div style={styles.wrapper}>
                <Modal
                    isVisible={editModal}
                    onDismiss={() => this.setState({ editModal: false, editMusicId: null })}
                    height={200}
                    width={750}
                >
                    <div style={{ padding: 15, width: '100%', background: 'white' }}>
                        <p style={{
                            margin: 0,
                            padding: '0 15px',
                            fontSize: 18,
                            fontWeight: 500,
                        }}>Edit music</p>
                        <UpdateMusic
                            onUpdate={(e) => this.handleMusicUpdate(e)}
                            // onInputChange={(e) => this.handleEditInput(e)}
                            onTitleInputChange={(e) => this.handleEditInputTitle(e)}
                            onLyricsInputChange={(e) => this.handleEditInputLyrics(e)}
                    
                            errorMsg={editErrorMsg}
                            // inputValue={editInputValue}

                            inputTitleValue={editInputTitleValue}
                            inputLyricsValue={editInputLyricsValue}
                />
                        
                    </div>
                </Modal>
                <AddMusic
                    onAdd={(e) => this.handleAdd(e)}
                    onTitleInputChange={(e) => this.handleTitleInput(e)}
                    onLyricsInputChange={(e) => this.handleLyricsInput(e)}
                    
                    errorMsg={errorMsg}
                    inputTitleValue={inputTitleValue}
                    inputLyricsValue={inputLyricsValue}
                />
                <div>
                    <h2>Music list</h2>
                    <MusicListUI
                        data={list}
                        onOpen={(musicId) => onGetMusic(musicId)}
                        onDelete={this.handleDelete}
                        onEdit={this.handleEditModal}
                    />
                </div>
            </div>
        )
    }
}


MusicPageUI.propTypes = {
    title: PropTypes.string,
}

MusicPageUI.defaultProps = {
    title: 'Hello world!',
}

export default MusicPageUI
