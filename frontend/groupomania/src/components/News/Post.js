import React, {useState} from 'react'
import IconComment from '../../assets/iconComment.svg'
import IconDelete from '../../assets/iconDelete.svg'
import IconEdit from '../../assets/iconEdit.svg'
import IconAddImg from '../../assets/iconAddimg.svg'
import Comments from './Comments'
import authHeader from '../AuthHeader'
import Pdp from '../../assets/pdp.svg'
import { useDispatch } from 'react-redux'
import { deletePosts, editPosts, addLikesOnPosts, removeLikesOnPosts } from '../../feature/fetchPosts.slice'




export default function Post(props) {


    const id = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    const dispatch = useDispatch();

    const [test, setTest] = useState(props.liked);
    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState(false);
    const [error, setError] = useState();
    const [form, setForm] = useState({
        text: props.text,
        imageUrl: props.imageUrl,
        image: ''
    });

    const handleDeleteFetch = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/posts/${props.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": authHeader()
                }
            })

            let data = await response.json()
            
            dispatch(deletePosts(props.id));

        } catch(error) {
            console.log(error);
        }
    }

    const editPostFetch = async () => {
        try {

            const data = {
                id: props.id,
                text: form.text,
                imageUrl: form.imageUrl
            }

            let formData = new FormData();
            formData.append('text', form.text);
            formData.append('image', form.image);

            let response = await fetch(`http://localhost:8080/api/posts/${props.id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": authHeader()
                }, 
                body: formData
            })

            dispatch(editPosts(data));

        } catch(error) {
            console.log(error);
        };
    };

    const handleEdit = () => {
        setEdit(!edit)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.text === '') {
            setError('Vous ne pouvez pas envoyer de post vide');
        } else {
            setEdit(false);
            editPostFetch();
            setError();
        };
    };

    const handleOnchangeText = (e) => {
        setForm({
            ...form,
            text: e.target.value,
        });
    };

    const handleOnchangeImg = (e) => {
        const files = e.target.files[0];
        setForm({
            ...form,
            imageUrl: URL.createObjectURL(e.target.files[0]),
            image: files
        });
    };

    const handleModalComment = () => {
        setComment(!comment);
    };


    const handleLikeFecth = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": authHeader()
                }, 
                body: JSON.stringify({
                    post_id: props.id
                })
            })

            let data = await response.json();
            dispatch(addLikesOnPosts(data.data))

        } catch(error) {
            console.log(error);
        }
    }

    const handleUnlikeFecth = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/unlike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": authHeader()
                }, 
                body: JSON.stringify({
                    post_id: props.id
                })
            })

            let data = await response.json();
            dispatch(removeLikesOnPosts(data.data))

        } catch(error) {
            console.log(error);
        };
    };

    const deletePostByAdmin = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/posts/moderate/${props.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": authHeader()
                }
            })

            let data = await response.json()
            
            dispatch(deletePosts(props.id));

        } catch(error) {
            console.log(error);
        }
    }

    const toggleClass = () => {
        setTest(!test);
        if(test) {
            handleUnlikeFecth();
        } else{
            handleLikeFecth();
        };
    };


    return (
        <>

            {edit ?
            <div className='container-post'>
                <div className='container-header-news'>
                    <div className='title-post-news'>
                        <h2>Votre post</h2>
                        <p className='error-post'> {error} </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='form-news'>
                    <div>
                        <textarea onChange={handleOnchangeText} defaultValue={form.text}></textarea>
                    </div>
                    <div className='form-news-post-img'>
                        <img src={form.imageUrl} />
                    </div>
                    <div className='form-news-action'>
                        <label htmlFor="edit-img">
                            <img src={IconAddImg} alt="icon-add-img" />
                        </label>
                            <input onChange={handleOnchangeImg} type="file" name="file" id='edit-img' className='input-file-news' />
                        <div>
                            <button className='btn-publish'>Publier</button>
                        </div>
                    </div>
                </form>
            </div>
            
            : 
                <div className='container-post-get'>
                    <div className='container-header-news'>
                        <div className='profil-post-user'>
                            <img src={props.pfp ? props.pfp : Pdp} alt="" />
                            <p>{props.firstname} </p>
                        </div>
                    </div>
                    <div className='text-post'>
                        <p>{form.text}</p>
                        {props.user_id === id  &&
                        <div className='edit-delete-post'>
                            <img onClick={handleEdit} src={IconEdit} alt="icon-edit" />
                            <img onClick={handleDeleteFetch} src={IconDelete} alt="icon-delete" />
                        </div>
                        }
                        {admin === true  &&
                        <div className='edit-delete-post'>
                            <img onClick={handleEdit} src={IconEdit} alt="icon-edit" />
                            <img onClick={deletePostByAdmin} src={IconDelete} alt="icon-delete" />
                        </div>
                        }
                    </div>
                    {form.imageUrl && 
                    <div className='image-post'>
                        <img src={form.imageUrl} alt='img-about-post' />
                    </div>
                    }    

                    <div className='like-comment-post'>
                        <span className={test ? "heart heart-active" : "heart"} onClick={toggleClass}></span>
                        <img src={IconComment} onClick={handleModalComment} alt="icon-comment" />
                    </div>
                            <p> {props.countLikes} </p>
                            <p> {props.countComments} </p>
                    {comment && <Comments post_id={props.id} />}
                </div>
                }
        </>
    );
};
