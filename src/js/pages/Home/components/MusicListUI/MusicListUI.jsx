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
                <div className="overflow-x-auto ">
                    <div className="inline-block min-w-full py-2">
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
                <nav aria-label="Page navigation example" className='mt-3'>
                  <ul className="list-style-none flex justify-start">
                  {page.number-1>0 && <>
                  <li 
                       >
                      <a onClick={(e) => {e.preventDefault();setPage({number:1}); }}
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black"
                        href="#"
                         > {"<<"} </a>
                    </li>
                    
                    <li className='pr-3'>
                    <a
                      className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black ml-2"
                      href="#"
                      onClick={() => setPage({number:Math.max(1,page.number-1)})}
                      >{page.number-1}</a>
                  </li>
                  </>
                    }
                    
                   <li aria-current={"page"} className='pr-3'>
                      <a 
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-600 dark:hover:text-black"
                        href="#"
                        onClick={() => setPage({number:page.number})}
                        >{page.number}</a>
                    </li>
                    {page.number+1<= parseInt(data.length/ROWS)+(Math.min(data.length%ROWS,1)) && <>
                    <li 
                       >
                      <a onClick={(e) => {e.preventDefault();setPage({number:Math.min(parseInt(data.length/ROWS)+(Math.min(data.length%ROWS,1)),page.number+1)}); }}
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black"
                        href="#"
                         >{page.number+1}</a>
                    </li>

                    <li>
                      <a onClick={(e) => {e.preventDefault();setPage({number:parseInt(data.length/ROWS)+(Math.min(data.length%ROWS,1))}); }}
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:bg-neutral-700 dark:hover:text-black ml-2"
                        href="#"
                         > {">>"} </a>
                    </li>
                    </>}
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
