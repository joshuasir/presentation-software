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
        const { errorMsg, onInputTitleChange, inputTitleValue, inputLyricsValue,onInputLyricsChange } = this.props
        return (
            <div style={styles.wrapper}>
                <form action="#" onSubmit={this.handleUpdateMusic}>
                    <div>
                        <Input
                            value={inputTitleValue}
                            onChange={onInputTitleChange}
                        />
                    </div>
                    <div>
                        <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="" cols="30" rows="10" onChange={onInputLyricsChange}>{inputLyricsValue}</textarea>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                        <p style={{ margin: 0, marginRight: 'auto', fontWeight: 500, color: 'red' }}>
                            {errorMsg ? errorMsg : ''}
                        </p>
                        <Button
                            children={'Update'}
                            onClick={this.handleUpdateMusic}
                            style={{ width: 150, fontSize: 16 }}
                        />
                        {/* <Button
                            children={'Cancel'}
                            onClick={this.onCancel}
                            style={{ width: 150, fontSize: 16 }}
                        /> */}
                    </div>
                </form>
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
