import React, {useState, useEffect} from 'react'
import IconComment from '../../assets/iconComment.svg'
import IconLike from '../../assets/iconLike.svg'
import IconDelete from '../../assets/iconDelete.svg'
import IconEdit from '../../assets/iconEdit.svg'
import IconAddImg from '../../assets/iconAddimg.svg'

import authHeader from '../AuthHeader'
import { useDispatch } from 'react-redux'
import { deletePosts } from '../../feature/fetchPosts.slice'



export default function Post(props) {

    const id = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({
        text: props.txt,
        imageUrl: props.imageUrl,
        image: ''
    });

    console.log(form);



    const deletePost = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/posts/${props.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": authHeader()
                }
            })

            let data = await response.json()
            
            // dispatch(deletePost(data.data.id));

        } catch(error) {
            console.log(error);
        }
    }

    const editPostFetch = async () => {
        try {

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

        } catch(error) {
            console.log(error);
        }
    }


    const editPost = () => {
        setEdit(!edit)
    }

    const handleSubmit = (e) => {
        setEdit(false);
        e.preventDefault();
        editPostFetch();

    }

    const testOnchange = (e) => {

        const files = e.target.files[0];

        setForm({
            ...form,
            [e.target.name]: e.target.value,
            imageUrl: URL.createObjectURL(e.target.files[0]),
            image: files
        });
    };


    return (
        <>

        {edit ?
        <div className='container-post'>
        <div className='title-post-news'>
            <h2>Votre post</h2>
            <p> </p>
        </div>
        <form onSubmit={handleSubmit} className='form-news'>
            <div>
                <textarea name='text' onChange={testOnchange} defaultValue={form.text}></textarea>
            </div>
            <div className='form-news-post-img'>
                <img src={form.imageUrl} />
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
        
        : 
            <div className='container-post-get'>
                <div className='text-post'>
                    <p>{form.text}</p>
                    {props.user_id === id &&
                    <div className='edit-delete-post'>
                        <img onClick={editPost} src={IconEdit} alt="icon-edit" />
                        <img onClick={deletePost} src={IconDelete} alt="icon-edit" />
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
                    <img src={IconComment} alt="icon-comment" />
                </div>
            </div>

            }

        </>
    )
}
