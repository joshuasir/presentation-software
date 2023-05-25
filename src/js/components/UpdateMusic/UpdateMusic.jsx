import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Input from '../Input'

import getStyles from './UpdateMusic.style'
const styles = getStyles()

class UpdateMusic extends React.PureComponent {
    state = {
        value: '',
        // errorMsg: null,
    }

    // handleInput = (e) => {
    //     this.setState({ value: e.target.value, errorMsg: null })
    // }

    handleUpdateMusic = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onUpdate({
            title:this.props.inputTitleValue,
            lyrics:this.props.inputLyricsValue
        })
    }

    render () {
        const { errorMsg,successMsg, onTitleInputChange, inputTitleValue, inputLyricsValue,onLyricsInputChange,onDismiss } = this.props
        return (
            <div className='bg-white w-96 p-5 rounded'>
            <div className="flex-col ">
                <h5 className='text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-600 mb-5'>Edit Music</h5>
            <form action="#" onSubmit={this.handleUpdateMusic}>
                <div className="relative h-11 w-full min-w-[200px]">
                        <input
                        value={inputTitleValue}
                        onChange={onTitleInputChange}
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        />
                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Title
                        </label>
                    </div>
                        

                    <div className="mt-5">
                    <div className="relative">
                        <textarea
                        className="peer h-full min-h-[300px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-5 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        onChange={onLyricsInputChange}
                        value={inputLyricsValue}
                        ></textarea>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Lyrics
                        </label>
                    </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {errorMsg &&
                        <p style={{ margin: 0, marginRight: 'auto', fontWeight: 500, color: 'red' }}>
                             {errorMsg }
                        </p>
                    }
                    {successMsg &&
                        <p style={{ margin: 0, marginRight: 'auto', fontWeight: 500, color: 'green' }}>
                            {successMsg}
                        </p>
                    }
                        </div>
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                       
                        <button
                            children={'Cancel'}
                            onClick={onDismiss}
                            className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded mr-3"
                        />
                        <button
                            children={'Update'}
                            onClick={this.handleUpdateMusic}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        />
                       
                        </div>
                    {/* <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                        <p style={{ margin: 0, marginRight: 'auto', fontWeight: 500, color: 'red' }}>
                            {errorMsg ? errorMsg : ''}
                        </p>
                        <Button
                            children={'Update'}
                            onClick={this.handleUpdateMusic}
                            style={{ width: 150, fontSize: 16 }}
                        />
                       
                    </div> */}
                </form>
            </div>
            </div>
        )
    }
}

UpdateMusic.propTypes = {
    title: PropTypes.string,
}

UpdateMusic.defaultProps = {
    title: 'Hello world!',
}

export default UpdateMusic
