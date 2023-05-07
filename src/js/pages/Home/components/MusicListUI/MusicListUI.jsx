import React from 'react'
import PropTypes from 'prop-types'

import MusicItem from './MusicItem'

import getStyles from './MusicListUI.style'
const styles = getStyles()

const MusicListUI = ({ data, onOpen, onDelete, onEdit }) => {
    if (data.length === 0) {
        return (
            <div style={styles.wrapper}>
                <p style={{ margin: 0 }}>List is empty, add some musics!</p>
            </div>
        )
    }
    return (
        <div style={styles.wrapper}>
            {data.map((item, index) => (
                // <p
                //     key={index}
                //     onClick={() => onOpen(item.id)}
                //     style={styles.musicItem}
                // >
                //     {item.description}
                // </p>
                <div key={index}>
                    <MusicItem
                        musicId={item.music_id}
                        lyrics={item.lyrics}
                        title={item.title}
                        onOpen={onOpen}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </div>
            ))}
        </div>
    )
}

MusicListUI.propTypes = {
    data: PropTypes.array,
    onOpen: PropTypes.func.isRequired,
}

MusicListUI.defaultProps = {
    data: [],
}

export default MusicListUI
