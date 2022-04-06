


/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  05 Apr 2022                                                  *
 ********************************************************************************/


import React, { useEffect, useState } from 'react';
import { fetchData, fetchCount, fetchBySearch, fetchByPage } from '../services/gallery'
import { toast } from 'react-toastify';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [searchedValue, setSearchedValue] = useState('');
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchdataList = async () => {
            const itemLength = await fetchCount()
            if (itemLength.success) {
                setCount(itemLength.data)
            } else {
                toast.error('Something Went Wrong', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
            const response = await fetchData()
            if (response.success) {
                setImages(response.data)
            } else {
                toast.error('Something Went Wrong', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }
        fetchdataList()
    }, []);

    const fetchByTextSearch = async (e) => {
        if (searchedValue !== '') {
            const response = await fetchBySearch(searchedValue)
            if (response.success) {
                setImages(response.data.data.data)
                setCount(response.data.data.count)
            } else {
                toast.error('Something Went Wrong', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }
    }

    const pagenation = async (e, type) => {
        if (type === 'next') {
            if (count > page + 8) {
                let response = await fetchByPage({ values: searchedValue, from: Number(page + 8), search: searchedValue !== '' ? true : false })
                if (response.success) {
                    setImages(response.data)
                    setPage(page + 8)
                }
            } else {
                toast.error('No More Pages After This', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        } else {
            if (0 <= page - 8) {
                let response = await fetchByPage({ values: searchedValue, from: Number(page - 8), search: searchedValue !== '' ? true : false })
                if (response.success) {
                    setImages(response.data)
                    setPage(page - 8)
                }
            } else {
                toast.error('No More Pages Beyond This', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }

    }

    return (
        <div className="gallery-container">
            <div className="Header">
                <input type="text" className="csInput" placeholder="Type Here for Search" name="searchedValue" value={searchedValue} onInput={e => setSearchedValue(e.target.value)} />
                <span className="btn" onClick={(e) => fetchByTextSearch(e)}>Submit</span>
            </div>
            <div className="gallery-grid">{
                images.length === 0 ? <div>No Data Found</div> :
                    images.map((src, index) => (
                        <div key={index}>
                            {src.linktype === 'img' ?

                                <img src={src.url} alt={src.tags} />
                                :

                                <video controls preload="metadata">
                                    <source src={src.url} type={src.type} />
                                    Video not supported.
                                </video>
                            }
                        </div>
                    ))}
            </div>
            <div className="gallery-pagenation">
                <ul>
                    {images.length > 0 ?
                        <React.Fragment>
                            <li className="btn" onClick={(e) => pagenation(e, 'prev')}>Previous</li>
                            <li className="btn" onClick={(e) => pagenation(e, 'next')}>Next</li></React.Fragment> : <React.Fragment></React.Fragment>
                    }
                </ul>
            </div>
        </div>
    )
}


export default Gallery