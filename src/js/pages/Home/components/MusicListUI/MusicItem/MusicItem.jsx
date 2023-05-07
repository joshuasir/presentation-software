import React from 'react'
import PropTypes from 'prop-types'

import editIcon from 'resources/editIcon.svg'

import getStyles from './MusicItem.style'
const styles = getStyles()

const MusicItem = ({ musicId, title,lyrics, onOpen, onDelete, onEdit }) => {
    return (
        <div style={styles.musicItem}>
            <p style={styles.musicText} onClick={() => onOpen(musicId)}>{title}</p>
            <span>{lyrics}</span>
            <div style={{ display: 'flex', height: 25 }}>
                <span style={styles.editBtn} onClick={() => onEdit(musicId)}><img src={editIcon} alt={'edit-icon'} style={{ width: '100%' }} /></span>
                <span style={styles.deleteBtn} onClick={() => onDelete(musicId)}>X</span>
            </div>
        </div>
    )
}

MusicItem.propTypes = {
    data: PropTypes.array,
    onOpen: PropTypes.func.isRequired,
}

MusicItem.defaultProps = {
    data: [],
}

export default MusicItem
