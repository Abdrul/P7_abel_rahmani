import React from 'react'
import './Comments.css'
import IconSend from '../../assets/iconSend.svg'
import IconAddImg from '../../assets/iconAddimg.svg'


export default function Comments() {



    return (
        <div className='container-comments'>
            <div className='container-form-content'>
                <form className='form-comments'>
                    <textarea></textarea>
                </form>
                <div className='container-add-send-comments'>
                    <label htmlFor="comment-img">
                        <img src={IconAddImg} alt="icon-add-img" />
                    </label>
                        <input type="file" name="file" id='comment-img' className='input-file-news' />
                    <button className='btn-send-comments'> <img src={IconSend} alt="" /> </button>
                </div>
            </div>
        </div>
    )
}
