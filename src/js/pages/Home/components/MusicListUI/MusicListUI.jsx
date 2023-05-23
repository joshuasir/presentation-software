import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'

import MusicItem from './MusicItem'

import getStyles from './MusicListUI.style'
const styles = getStyles()

const MusicListUI = ({ data, onOpen, onDelete, onEdit }) => {
    const ROWS = 5
    if (data.length === 0) {
        return (
        
          <p style={{ margin: 0 }}>List is empty, add some musics!</p>
         
        )
    }
    const [page,setPage] = useState({number:1})
    useEffect(() => {
      
      setPagenateData([...data.slice((page.number-1)*ROWS,page.number*ROWS)])
    }, [data,page])

    
    const [pagenateData,setPagenateData] = useState([])
    
    return (
    
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm">
                        <thead
                            className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-400">
                            <tr>
                            <th scope="col" className="px-3 py-4 w-1">Id</th>
                            <th scope="col" className="px-3 py-4">Title</th>
                            {/* <th scope="col" className="px-6 py-4">Lyrics</th> */}
                            <th scope="col" className="px-3 py-4 w-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pagenateData.map((item, index) => (
                            <MusicItem
                                musicId={item.music_id}
                                lyrics={item.lyrics}
                                title={item.title}
                                onOpen={onOpen}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                idx={index}
                            />
                        ))}
                            
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="list-style-none flex justify-start">
                    <li className='pr-3'>
                      <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black"
                        href="#"
                        onClick={() => setPage({number:Math.max(1,page.number-1)})}
                        >Previous</a>
                    </li>
                    {[...Array(parseInt(data.length/ROWS)+(Math.min(data.length%ROWS,1))).keys()].map((index) => (
                    <li aria-current={index==page.number ? "page":""} className='pr-3'>
                      <a 
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black"
                        href="#"
                        onClick={() => setPage({number:index+1})}
                        >{index+1}</a>
                    </li>
                    ))}
                    <li 
                       >
                      <a onClick={(e) => {e.preventDefault();setPage({number:Math.min(parseInt(data.length/ROWS)+(Math.min(data.length%ROWS,1)),page.number+1)}); }}
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black"
                        href="#"
                         >Next</a>
                    </li>
                  </ul>
              </nav>
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
