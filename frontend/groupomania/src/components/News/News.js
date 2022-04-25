import React, {useState, useEffect} from 'react';
import './News.css';
import authHeader from '../AuthHeader'
import IconAddImg from '../../assets/iconAddimg.svg'

export default function News() {

    const [text, setText] = useState({
        text: ""
    })

    const [clearText, setClearText] = useState({
        text: ""
    })

    const fetchPosts = async () => {
        try {

            let formData = new FormData();
            formData.append('text', text.text);

            let response = await fetch(`http://localhost:8080/api/posts`, {
            method: 'POST',
            headers : {
                "Authorization": authHeader(),
            },
            body: formData
        });
        
        let data = await response.json();
        console.log(data);

        } catch (err) {
            console.log(err);
        };
    }

    const testPosts = (e) => {
        e.preventDefault();
        setText(clearText);
        fetchPosts()
    }

    const testChange = (e) => {
        setText({
            text : e.target.value
        })
    }


    return (
        <>
            <div className='container-post'>
                <div className='title-post-news'>
                    <h2>Votre post</h2>
                </div>
                <form onSubmit={testPosts} className='form-news'>
                    <div>
                        <textarea value={text.text} onChange={testChange} placeholder='Quoi de neuf ?'></textarea>
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
