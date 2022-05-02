import React, {useState, useEffect} from 'react'
import './Comments.css'
import IconSend from '../../assets/iconSend.svg'
import IconAddImg from '../../assets/iconAddimg.svg'
import {useDispatch, useSelector} from 'react-redux'
import { getComments, addComments } from '../../feature/fetchComments.slice'
import authHeader from '../AuthHeader'


export default function Comments() {

    const dispatch = useDispatch();
    const allComments = useSelector(state => state.comments.dataComments);
    // console.log(allComments);


    const [comment, setComment] = useState({
        text: "",
        imageUrl: "",
        image: ""
    });
    const [clearComments, setClearComments] = useState({
        text: "",
        imageUrl: "",
        image: ""
    });

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                let response = await fetch(`http://localhost:8080/api/comments`, {
                    method: 'GET',
                    headers : {
                        "Authorization": authHeader()
                    }
                });
                
                let data = await response.json();
                dispatch(getComments(data.data))
    
            } catch (err) {
                console.log(err);
            };
        }
    
        fetchAllComments();
    }, [dispatch]);

    const fetchComments = async () => {
        try {

            let formData = new FormData();
            formData.append('text', comment.text);
            // formData.append('image', comment.image);

            let response = await fetch(`http://localhost:8080/api/comments`, {
            method: 'POST',
            headers : {
                "Authorization": authHeader(),
            },
            body: formData
        });
        
        let data = await response.json();
        console.log(data);
        dispatch(addComments(data.data));

        } catch (err) {
            console.log(err);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchComments();
        setClearComments(clearComments);
    }

    const handleOnchangeText = (e) => {
        setComment({
            ...comment,
            text: e.target.value
        })
    }

    // console.log(comment);

    return (
        <div className='container-comments'>
            <div className='container-form-content'>
                <form onSubmit={handleSubmit} className='form-comments'>
                    <textarea onChange={handleOnchangeText}></textarea>
                    <div className='container-add-send-comments'>
                        <label htmlFor="comment-img">
                            <img src={IconAddImg} alt="icon-add-img" />
                        </label>
                            <input type="file" name="file" id='comment-img' className='input-file-news' />
                        <button className='btn-send-comments'> <img src={IconSend} alt="" /> </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
