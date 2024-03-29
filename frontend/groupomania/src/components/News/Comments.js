import React, {useState, useEffect} from 'react'
import './Comments.css'
import IconSend from '../../assets/iconSend.svg'
import IconAddImg from '../../assets/iconAddimg.svg'
import IconDelete from '../../assets/iconDelete.svg'
import Pdp from '../../assets/pdp.svg'
import {useDispatch, useSelector} from 'react-redux'
import { getComments, addComments, deleteComments } from '../../feature/fetchComments.slice'
import authHeader from '../AuthHeader'
import { addCommentsOnPosts, deleteCommentsOnPosts } from '../../feature/fetchPosts.slice'



export default function Comments(props) {

    const id = JSON.parse(localStorage.getItem('user'));

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
                let formData = new FormData();
                formData.append('post_id', props.post_id);
                let response = await fetch(`http://localhost:8080/api/comments`, {
                    method: 'GET',
                    headers : {
                        "Authorization": authHeader()
                    },

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
        dispatch(addCommentsOnPosts(data.data))

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
            image: files,
            post_id: props.post_id
        });
    };

    const handleDeleteComment = (commentId) => {

            const fetchDeleteComments = async () => {
                try {
                        
                    let response = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": authHeader()
                        }
                    })
        
                    let data = await response.json()
                    dispatch(deleteComments(commentId));
                    dispatch(deleteCommentsOnPosts(commentId))

                } catch (err) {
                    console.log(err);
                }
            }
            fetchDeleteComments()
    }


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
                    <div key={comment.id} className="display-user-comment">
                            <div key={comment.id}>
                                {comment.post_id === props.post_id &&
                                    <div className='profil-comment-user'>
                                    <img src={comment.user.imageUrl ? comment.user.imageUrl : Pdp} alt="" />
                                    <p>{comment.user.firstname} </p>
                                    {/* <p>  {comments1.length} </p> */}
                                    </div>
                                }
                            </div>

                    {props.post_id === comment.post_id &&
                        <div className='container-comment-user'>
                            <p> {comment.text} </p>
                            <img src={comment.imageUrl} />
                            {comment.user_id === id &&
                            <button onClick={() => handleDeleteComment(comment.id)} className='btn-delete-comment'>
                                <img src={IconDelete} />
                            </button>
                            }
                        </div>
                    }
                    </div>
                    )
                })}

        </>
    )
}
