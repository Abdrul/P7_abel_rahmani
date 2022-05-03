import React, {useState, useEffect} from 'react'
import IconComment from '../../assets/iconComment.svg'
import IconLike from '../../assets/iconLike.svg'
import IconDelete from '../../assets/iconDelete.svg'
import IconEdit from '../../assets/iconEdit.svg'
import IconAddImg from '../../assets/iconAddimg.svg'
import Comments from './Comments'

import authHeader from '../AuthHeader'
import { useDispatch, useSelector } from 'react-redux'
import { deletePosts, editPosts } from '../../feature/fetchPosts.slice'



export default function Post(props) {

    const id = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    // const allPost = useSelector(state => state.post.dataPosts);
    // console.log(allPost);

    // const [a, ab] = useState(allPost.map((a, b) => {
    //     return ({
    //         text: a.text
    //     })
    // }))

    // console.log(a[0].text);

    // console.log(a);

    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState(false);
    const [error, setError] = useState();
    const [form, setForm] = useState({
        text: props.text,
        imageUrl: props.imageUrl,
        image: ''
    });

    // console.log(form);



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
        }
    }


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
        }
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

    const testModal = () => {
        setComment(!comment);
    }


    return (
        <>

        {edit ?
        <div className='container-post'>
            <div className='container-header-news'>
                {/* <div className='test'>
                    <img src={imageUser} alt="" />
                    <p>{firstname} </p>
                </div> */}
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
                {/* <div className='container-header-news'>
                    <div className='test'>
                        <img src={imageUser} alt="" />
                        <p>{firstname} </p>
                    </div>
                </div> */}
                <div className='text-post'>
                    <p>{form.text}</p>
                    {props.user_id === id &&
                    <div className='edit-delete-post'>
                        <img onClick={handleEdit} src={IconEdit} alt="icon-edit" />
                        <img onClick={handleDeleteFetch} src={IconDelete} alt="icon-edit" />
                    </div>
                    }
                </div>
                {form.imageUrl && 
                <div className='image-post'>
                    <img src={form.imageUrl} alt='img-about-post' />
                </div>
                }
                <div className='like-comment-post'>
                    <img src={IconLike} alt="icon-like" />
                    <img src={IconComment} onClick={testModal} alt="icon-comment" />
                </div>
                {comment && <Comments post_id={props.id} />}
            </div>

            }
            

        </>
    )
}
