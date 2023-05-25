import React from 'react'
import PropTypes from 'prop-types'
// import Swal from 'sweetalert2'
import MusicListUI from '../MusicListUI'
import AddMusic from 'components/AddMusic'
import UpdateMusic from 'components/UpdateMusic'
import Modal from 'components/Modal'

import getStyles from './MusicPageUI.style'
import SearchBar from '../../../../components/SearchBar/SearchBar'
import * as xlsx from 'xlsx';


const styles = getStyles()

class MusicPageUI extends React.PureComponent {
    state = {
        inputTitleValue: '',
        inputLyricsValue: '',
        errorMsg: null,
        // edit related
        editModal: false,
        deleteModal:false,
        addModal: false,

        deleteMusicId:null,
        editMusicId: null,
        editInputValue: '',
        editErrorMsg: null,
        successMsg:'',
        keyword:''
    }
    // alert = new Alert();
  
    fileInputRef = React.createRef();
    handleDismissEditModal = () =>{
        this.setState({
            ...this.state, 
            editModal: false,
            successMessage:'', 
        })
    }
    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    handleFileUpload = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }

        // try{
       
        this.getBase64(fileObj,(base64)=>{
            const bufferExcel = Buffer.from(base64.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64", ""),'base64');
            const wb = xlsx.read(bufferExcel, { type: 'buffer' });
            
        // Set up the onload event handler
     
      
          // Assuming the first sheet is the one you want to work with
          const worksheet = wb.Sheets[wb.SheetNames[0]];
      
          // Convert the sheet to JSON data
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: ['Title', 'Lyrics'],range: 1  });

        // Do something with the JSON data
        // console.log(a)
        jsonData.forEach(a=>{
           if(!this.props.list.filter(e=>e.title.toLowerCase()==a.Title.toLowerCase() && e.lyrics.toLowerCase()==a.Lyrics.toLowerCase()).length){
                // console.log(a)
                this.handleAdd({title:a.Title??'',lyrics:a.Lyrics??''})
            }
        })

        });
    
    
    // }catch(ex){
    //     console.log(ex)
    // }
        // Read the file as binary data
        // reader.readAsBinaryString(file);
      };
    handleExportExcel = () => {
        // Create a workbook object
        const workbook = xlsx.utils.book_new();
        const { list } = this.props
        // Create a worksheet and add data to it
        // const aoa
        const worksheet = xlsx.utils.json_to_sheet([...(list.filter(e=>e.title.toLowerCase().match(this.state.keyword.toLowerCase())||e.lyrics.toLowerCase().match(this.state.keyword.toLowerCase())) ?? []).map(a=>({'Title':a.title,'Lyrics':a.lyrics}))]
        );
      
        // Add the worksheet to the workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Music');
        const excelData = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'music.xlsx';
        link.click();
        URL.revokeObjectURL(url);
    
      };
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

        if (!args ||args.title?.length === 0 || args.lyrics?.length===0) return this.setState({ ...this.state,errorMsg: 'Please enter both title and lyrics',successMsg:'' })

        onAddMusic(args)
        this.setState({...this.state,inputTitleValue: '',inputLyricsValue:'',successMsg:'Successfully Added!' })
    }

    handleEditModal = (musicId) => {
        // Prepare modal for update function
        const { list } = this.props
        const selectedMusic = list.filter(item => item.music_id === musicId)
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

    handleDelete = () => {
        const { onDeleteMusic } = this.props
        
        onDeleteMusic(this.state.deleteMusicId)
        this.setState({ ...this.state, deleteMusicId:null, deleteModal: false, editMusicId: null,editErrorMsg:'',successMsg:'' })
    
    }
  

    render () {
        const {
            editModal,
            deleteModal,
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
        const { list, onGetMusic,handleSetMusic } = this.props
        return (
            <div style={styles.wrapper}>
                <Modal
                    isVisible={deleteModal}
                    onDismiss={() => this.setState({ ...this.state,deleteModal: false, deleteMusicId:null, editMusicId: null,editErrorMsg:'',successMsg:'' })}
                    height={275}
                    width={1850}
                >
                    <div className='bg-white w-96 p-5 rounded'>
                        <div className="flex-col h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-0 w-20 h-20 hover:scale-110 transition-transform text-red mx-auto mb-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
            
                    
                    <h1 className="text-center mb-10" > Are you sure to Delete <br/>"<b>{list.find(l=>this.state.deleteMusicId==l.music_id)?.title}</b>" ?</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                       
                        <button
                            children={'Cancel'}
                            onClick={() => this.setState({ ...this.state,deleteModal: false, deleteMusicId:null, editMusicId: null,editErrorMsg:'',successMsg:'' })}
                            className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded mr-3"
                        />
                        <button
                            children={'Yes'}
                            onClick={this.handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        />
                       
                        </div>
                        </div>
                        </div>
                </Modal>
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
                <h2 className='pr-3'>Music list</h2>
                    <div className="flex justify-start items-center">
                        
                        <svg  onClick={()=> this.setState({...this.state, addModal: true })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:scale-110 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <svg onClick={()=>this.handleExportExcel()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>

                   
                        <svg onClick={()=> this.fileInputRef.current.click()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:scale-110 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <input ref={this.fileInputRef} style={{display:'none'}} type="file" accept=".xlsx" onChange={(e)=>this.handleFileUpload(e)} />
    
                        <SearchBar keyword={keyword} setKeyword={(e)=>this.handleSearchChange(e)} >

                        </SearchBar>
                    </div>
                    
                    <MusicListUI
                        data={list.filter(e=>e.title.toLowerCase().match(keyword.toLowerCase())||e.lyrics.toLowerCase().match(keyword.toLowerCase())) ?? []}
                        onOpen={(musicId) => onGetMusic(musicId)}
                        onDelete={(id)=>this.setState({...this.state, deleteMusicId:id, deleteModal:true })}
                        onEdit={this.handleEditModal}
                        handleSetMusic={handleSetMusic}
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
