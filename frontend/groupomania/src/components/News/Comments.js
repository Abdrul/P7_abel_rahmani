import React, {useState, useEffect} from 'react'
import './Comments.css'
import IconSend from '../../assets/iconSend.svg'
import IconAddImg from '../../assets/iconAddimg.svg'
import {useDispatch, useSelector} from 'react-redux'
import { getComments, addComments } from '../../feature/fetchComments.slice'
import authHeader from '../AuthHeader'


export default function Comments(props) {

    

    const dispatch = useDispatch();
    const allComments = useSelector(state => state.comments.dataComments);
    // console.log(allComments);

    const [error, setError] = useState();
    const [comment, setComment] = useState({
        text: "",
        imageUrl: "",
        image: "",
        post_id: ""
    });
    const [clearComments, setClearComments] = useState({
        text: "",
        imageUrl: "",
        image: "",
        post_id: ""
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
            formData.append('post_id', comment.post_id);
            formData.append('image', comment.image);

            let response = await fetch(`http://localhost:8080/api/comments`, {
            method: 'POST',
            headers : {
                "Authorization": authHeader(),
            },
            body: formData
        });
        
        let data = await response.json();
        dispatch(addComments(data.data));
        // setComment(clearComments);

        } catch (err) {
            console.log(err);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(comment.text !== '' || comment.imageUrl !== '') {
            fetchComments();
            setComment(clearComments);
            setError();
        } else {
            setError('Vous ne pouvez pas envoyer de commentaire vide')
        }
    };

    const handleOnchangeText = (e) => {
        setComment({
            ...comment,
            text: e.target.value,
            post_id: props.post_id
        })
    };

    const handleOnchangeImg = (e) => {
        const files = e.target.files[0];
        setComment({
            ...comment,
            imageUrl: URL.createObjectURL(e.target.files[0]),
            image: files
        });
    }

    // console.log(comment);

    return (
        <>
            
            <div className='container-comments'>
                <div className='container-form-content'>
                    <p className='error-comments'>{error}</p>
                    <form onSubmit={handleSubmit} className='form-comments'>
                        <textarea value={comment.text} onChange={handleOnchangeText}></textarea>
                        <div className='form-comments-post-img'>
                            <img src={comment.imageUrl} alt="" />
                        </div>
                        <div className='container-add-send-comments'>
                            <label htmlFor="comment-img">
                                <img src={IconAddImg} alt="icon-add-img" />
                            </label>
                                <input onChange={handleOnchangeImg} type="file" name="file" id='comment-img' className='input-file-news' />
                            <button className='btn-send-comments'> <img src={IconSend} alt="" /> </button>
                        </div>
                    </form>
                </div>
            </div>

            {allComments.map((comment, index) => {

                return (
                    <div key={comment.id}>
                        {props.post_id === comment.post_id &&
                            <div className='container-comment-user'>
                                <p> {comment.text} </p>
                                <img src={comment.imageUrl} />
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}
