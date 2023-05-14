import React from 'react'
import PropTypes from 'prop-types'

import MusicListUI from '../MusicListUI'
import AddMusic from 'components/AddMusic'
import UpdateMusic from 'components/UpdateMusic'
import Modal from 'components/Modal'

import getStyles from './MusicPageUI.style'
import SearchBar from '../../../../components/SearchBar/SearchBar'
const styles = getStyles()

class MusicPageUI extends React.PureComponent {
    state = {
        inputTitleValue: '',
        inputLyricsValue: '',
        errorMsg: null,
        // edit related
        editModal: false,
        addModal: false,
        editMusicId: null,
        editInputValue: '',
        editErrorMsg: null,
        successMsg:'',
        keyword:''
    }
    handleDismissEditModal = () =>{
        this.setState({
            ...this.state, 
            editModal: false,
            successMessage:'', 
        })
    }
    handleDismissAddModal = () =>{
        this.setState({
            ...this.state, 
            addModal: false,
            successMessage:'', 
        })
    }
    handleSearchChange = (val) => {
        this.setState({...this.state,keyword: val })
    }

    handleTitleInput = (e) => {
        this.setState({...this.state,inputTitleValue: e.target.value, errorMsg: null })
    }
    handleLyricsInput = (e) => {
        this.setState({...this.state,inputLyricsValue: e.target.value, errorMsg: null })
    }

    handleEditInputTitle = (e) => {
        //console.log('tes')
        this.setState({...this.state,editInputTitleValue: e.target.value, editErrorMsg: null })
    }
    handleEditInputLyrics = (e) => {
        this.setState({...this.state,editInputLyricsValue: e.target.value, editErrorMsg: null })
    }
    handleAdd = (args) => {
        const { onAddMusic } = this.props

        if (!args ||args.title.length === 0 || args.lyrics.length===0) return this.setState({ ...this.state,errorMsg: 'Please enter both title and lyrics',successMsg:'' })

        onAddMusic(args)
        this.setState({...this.state,inputTitleValue: '',inputLyricsValue:'',successMsg:'Successfully Added!' })
    }

    handleEditModal = (musicId) => {
        // Prepare modal for update function
        // 1 - pick the item to be updated
        const { list } = this.props
        const selectedMusic = list.filter(item => item.music_id === musicId)
        // 2 - set the state for modal display
        this.setState({
            ...this.state,
            editModal: true,
            successMsg:'',
            editMusicId: musicId,
            editInputTitleValue: selectedMusic[0].title,
            editInputLyricsValue: selectedMusic[0].lyrics,
        })
    }

    handleMusicUpdate = (args) => {
        // import service
        const { editMusicId } = this.state
        const { onUpdateMusicLyrics,onUpdateMusicTitle } = this.props
        // console.log(args)
        if (!args || args.title.length === 0|| args.lyrics.length === 0) return this.setState({ ...this.state,editErrorMsg: 'Please enter both title and lyrics',successMsg:'' })

        // update the music and close modal
        // console.log(args)
        onUpdateMusicLyrics(editMusicId,args.lyrics)
        onUpdateMusicTitle(editMusicId, args.title)
        this.setState({...this.state,successMsg:'Successfully Updated!' })
    }

    handleDelete = (musicId) => {
        const { onDeleteMusic } = this.props
        onDeleteMusic(musicId)
    }

    render () {
        const {
            editModal,
            errorMsg,
            successMsg,
            inputTitleValue,
            inputLyricsValue,
            editInputTitleValue,
            editInputLyricsValue,
            editErrorMsg,
            addModal,
            keyword
        } = this.state
        const { list, onGetMusic } = this.props
        return (
            <div style={styles.wrapper}>
                <Modal
                    isVisible={editModal}
                    onDismiss={() => this.setState({ ...this.state,editModal: false, editMusicId: null,editErrorMsg:'',successMsg:'' })}
                    height={550}
                    width={1850}
                >
                 
                        <UpdateMusic
                            onUpdate={(e) => this.handleMusicUpdate(e)}
                            // onInputChange={(e) => this.handleEditInput(e)}
                            onTitleInputChange={(e) => this.handleEditInputTitle(e)}
                            onLyricsInputChange={(e) => this.handleEditInputLyrics(e)}
                            errorMsg={editErrorMsg}
                            successMsg={successMsg}
                            onDismiss={() => this.handleDismissEditModal()}
                    
                            // inputValue={editInputValue}
                            inputTitleValue={editInputTitleValue}
                            inputLyricsValue={editInputLyricsValue}
                />
                
                </Modal>
                <Modal
                    isClosable={false}
                    isVisible={addModal}
                    onDismiss={() => this.setState({...this.state, addModal: false,errorMsg:'',successMsg:'' })}
                    height={550}
                    width={1850}
                >
                <AddMusic
                    onAdd={(e) => this.handleAdd(e)}
                    onTitleInputChange={(e) => this.handleTitleInput(e)}
                    onLyricsInputChange={(e) => this.handleLyricsInput(e)}
                    onDismiss={() => this.handleDismissAddModal()}
                    successMsg={successMsg}
                    errorMsg={errorMsg}
                    inputTitleValue={inputTitleValue}
                    inputLyricsValue={inputLyricsValue}
                />
                </Modal>
                <div>
                    <div className="flex justify-start">
                        <h1 className='pr-3'>Music list</h1>
                        <svg  onClick={()=> this.setState({...this.state, addModal: true })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <svg onClick={()=>{}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <SearchBar keyword={keyword} setKeyword={(e)=>this.handleSearchChange(e)} >

                        </SearchBar>
                    </div>
                    
                    <MusicListUI
                        data={list.filter(e=>e.title.includes(keyword)||e.lyrics.includes(keyword)) ?? []}
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
