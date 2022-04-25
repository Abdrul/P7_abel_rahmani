import React, {useState, useEffect} from 'react';
import './News.css';
import AuthHeader from '../AuthHeader'
import IconAddImg from '../../assets/iconAddimg.svg'

export default function News() {





    return (
        <>
            <div className='container-post'>
                <div className='title-post-news'>
                    <h2>Votre post</h2>
                </div>
                <form className='form-news'>
                    <div>
                        <textarea placeholder='Quoi de neuf ?'></textarea>
                    </div>
                    <div className='form-news-action'>
                        <label htmlFor="file">
                            <img src={IconAddImg} alt="icon-add-img" />
                        </label>
                            <input type="file" name="file" id="file" className='input-file-news' />
                        <div>
                            <button className='btn-publish'>Publier</button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}
