import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Input from '../Input'

import getStyles from './AddMusic.style'
const styles = getStyles()

class AddMusic extends React.PureComponent {
    state = {
        value: '',
        // errorMsg: null,
    }

    // handleInput = (e) => {
    //     this.setState({ value: e.target.value, errorMsg: null })
    // }

    handleAddMusic = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onAdd({
            title:this.props.inputTitleValue,
            lyrics:this.props.inputLyricsValue
        })
    }

    render () {
        const { errorMsg, onTitleInputChange, onLyricsInputChange, inputTitleValue, inputLyricsValue } = this.props
        return (
            <div style={styles.wrapper}>
                <form action="#" onSubmit={this.handleAddMusic}>
                    <div>
                        <Input
                            value={inputTitleValue}
                            onChange={onTitleInputChange}
                        />
                    </div>
                    <div>
                        <Input
                            value={inputLyricsValue}
                            onChange={onLyricsInputChange}
                        />
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                        <p style={{ margin: 0, marginRight: 'auto', fontWeight: 500, color: 'red' }}>
                            {errorMsg ? errorMsg : ''}
                        </p>
                        <Button
                            children={'Add'}
                            onClick={this.handleAddMusic}
                            style={{ width: 150, fontSize: 16 }}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

AddMusic.propTypes = {
    title: PropTypes.string,
}

AddMusic.defaultProps = {
    title: 'Hello world!',
}

export default AddMusic
