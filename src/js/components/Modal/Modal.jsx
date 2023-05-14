import React from 'react'
import PropTypes from 'prop-types'

import getStyles from './Modal.style'
const styles = getStyles()

const Modal = ({
    isClosable,
    isVisible,
    onDismiss,
    height,
    width,
    children,
}) => {
    if (!isVisible) return null

    return (
        <div>
            <div style={styles.wrapper} onClick={()=> isClosable && onDismiss()}/>
            <div className='w-80'
                style={{
                    ...styles.innerWrapper,
                    height: height,
                    maxHeight: height,
                    
                }}
            >
                
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    isVisible: PropTypes.bool,
    onDismiss: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired, // eslint-disable-line
    height: PropTypes.number,
    width: PropTypes.number,
}

Modal.defaultProps = {
    isVisible: false,
    height: 250,
    width: 250,
}

export default Modal
