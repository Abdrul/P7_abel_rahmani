import React, {useState, useEffect} from 'react';
import Post from './Post';
import './News.css';
import authHeader from '../AuthHeader'
import IconAddImg from '../../assets/iconAddimg.svg'
import { getPosts, addPosts, deletePosts } from '../../feature/fetchPosts.slice';
import { useSelector, useDispatch } from 'react-redux';

export default function News() {

    const id = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();
    const allPost = useSelector(state => state.post.dataPosts);

    const [error, setError] = useState();
    
    const [post, setPost] = useState({
        text: "",
        imageUrl: "",
        image: ""
    });

    const [clearPost, setClearPost] = useState({
        text: "",
        imageUrl: "",
        image: ""
    });

    const fetchPosts = async () => {
        try {

            let formData = new FormData();
            formData.append('text', post.text);
            formData.append('image', post.image)

            let response = await fetch(`http://localhost:8080/api/posts`, {
            method: 'POST',
            headers : {
                "Authorization": authHeader(),
            },
            body: formData
        });
        
        let data = await response.json();
        dispatch(addPosts(data.data));

        } catch (err) {
            console.log(err);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(post.text !== '' || post.imageUrl !== '') {
            setPost(clearPost);
            setError();
            fetchPosts();
        } else {
            setError('Vous ne pouvez pas envoyer de post vide')
        };
    };

    const changeInputText = (e) => {
        setPost({
            ...post,
            text : e.target.value,
        });
    };

    const changeInputImage = (e) => {
        const files = e.target.files[0];
        setPost({
            ...post,
            imageUrl: URL.createObjectURL(e.target.files[0]),
            image: files
        });
    };

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                let response = await fetch(`http://localhost:8080/api/posts`, {
                    method: 'GET',
                    headers : {
                        "Authorization": authHeader()
                    }
                });
                
                let data = await response.json();
                dispatch(getPosts(data.data))
    
            } catch (err) {
                console.log(err);
            };
        }
    
            fetchAllPosts();
    }, [dispatch]);


    // const deletePost = async (elementId) => {
    //     try {
    //         let response = await fetch(`http://localhost:8080/api/posts/${elementId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 "Authorization": authHeader()
    //             }
    //         })

    //         let data = await response.json()
            
    //         dispatch(deletePost());

    //     } catch(error) {
    //         console.log(error);
    //     }

    // }


    return (
        <>
            <div className='container-post'>
                <div className='title-post-news'>
                    <h2>Votre post</h2>
                    <p> {error} </p>
                </div>
                <form onSubmit={handleSubmit} className='form-news'>
                    <div>
                        <textarea value={post.text} onChange={changeInputText} placeholder='Quoi de neuf ?'></textarea>
                    </div>
                    <div className='form-news-post-img'>
                        <img src={post.imageUrl} />
                    </div>
                    <div className='form-news-action'>
                        <label htmlFor="file">
                            <img src={IconAddImg} alt="icon-add-img" />
                        </label>
                            <input onChange={changeInputImage} type="file" name="file" id="file" className='input-file-news' />
                        <div>
                            <button className='btn-publish'>Publier</button>
                        </div>
                    </div>
                </form>
            </div>

            {allPost.map((post) => {

                return (
                    <Post 
                    txt={post.text} 
                    imageUrl={post.imageUrl} 
                    id={post.id} key={post.id} 
                    // deleteFunc={deletePost}
                    user_id={post.user_id} />
                )
            })}


        </>

    )
}
