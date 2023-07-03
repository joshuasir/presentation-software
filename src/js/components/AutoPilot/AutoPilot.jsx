import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Input from '../Input'

const styles = getStyles()

class AutoPilot extends React.PureComponent {
    

    state = {
        value: '',
        // errorMsg: null,
    }

    // handleInput = (e) => {
    //     this.setState({ value: e.target.value, errorMsg: null })
    // }

    handleContinue = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // this.props.onAdd({
        //     title:this.props.inputTitleValue,
        //     lyrics:this.props.inputLyricsValue
        // })
    }

    render () {
        const { errorMsg, handleInputChange,input, stop,isLoading, onContinue, onMusicInputChange, onDismiss,onLyricsInputChange, inputMusicValue, inputLyricsValue, musics } = this.props
        return (
            <div className='bg-white w-96 p-5 rounded'>
                <div className="flex-col ">
                    <h5 className='text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-600 mb-5'>Auto Pilot</h5>
                <form action="#" onSubmit={this.handleSubmit}>
                   
                   
                    <div className='p-5 pb-0 h-20'>
                    <Select value={inputMusicValue ? {value:inputMusicValue.music_id,label:inputMusicValue.title}:''} onChange={(e)=>onMusicInputChange(e.value)} options={musics.map(a=>({value:a.music_id,label:a.title}))}/>
                    
                    </div>

                    <div className="mt-5">
                    <div className="relative">
                        <textarea
                        className="peer h-full min-h-[300px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-5 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        onChange={handleInputChange}
                        value={input}
                        ></textarea>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Lyrics
                        </label>
                    </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* {errorMsg &&
                        <p style={{ margin: 0, marginRight: 'auto', fontWeight: 500, color: 'red' }}>
                             {errorMsg }
                        </p>
                    } */}
                    </div>
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                       
                        <button
                            children={'Cancel'}
                            onClick={onDismiss}
                            className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded mr-3"
                        />
                         <button
                            children={'Stop'}
                            onClick={stop}
                            className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded mr-3"
                        />
                        <button
                        disabled={isLoading}
                            children={'Continue'}
                            onClick={onContinue}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        />
                       
                        </div>
                       
                    
                </form>
            </div>
            </div>
        )
    }
}

AutoPilot.propTypes = {
    title: PropTypes.string,
    completion: PropTypes.string,
    input: PropTypes.string,
    stop: PropTypes.func,
    isLoading: PropTypes.bool,
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func
}

AutoPilot.defaultProps = {
    title: 'Hello world!',
}

export default AutoPilot
