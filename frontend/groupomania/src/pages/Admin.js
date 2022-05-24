import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import authHeader from '../components/AuthHeader';
import {deletePostsAdmin, getAllPostAdmin, editPostsCanDisplay} from '../feature/fetchAdmin'
import Navbar from '../components/Navbar/Navbar';
import IconDelete from '../assets/iconDelete.svg'
import IconCheck from '../assets/iconCheck.svg'




export default function Admin() {


    const dispatch = useDispatch();
    const allPostsToModerate = useSelector(state => state.admin.dataAdmin)
    // console.log(allPostsToModerate);

    const [canDisplay, setCanDisplay] = useState({
        canDisplay: true
    })

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                let response = await fetch(`http://localhost:8080/api/posts/moderate`, {
                    method: 'GET',
                    headers : {
                        "Authorization": authHeader()
                    }
                });
                
                let data = await response.json();

                dispatch(getAllPostAdmin(data.data))
    
            } catch (err) {
                console.log(err);
            };
        }
    
            fetchAllPosts();
    }, [dispatch]);


    const handleDeleteByAdmin = (postId) => {
        
        const fetchDeleteByAdmin = async () => {
            try {
                    
                let response = await fetch(`http://localhost:8080/api/posts/moderate/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": authHeader()
                    }
                })
                let data = await response.json()
                dispatch(deletePostsAdmin(postId))

            } catch (err) {
                console.log(err);
            }
        }
        fetchDeleteByAdmin()
    }

    const handleEditByAdmin = (postId) => {
        const editPostFetch = async () => {
            try {
    
                const data = {
                    canDisplay: canDisplay.canDisplay
                }
    
                // let formData = new FormData();
                // formData.append('canDisplay', canDisplay.canDisplay);
    
                let response = await fetch(`http://localhost:8080/api/posts/moderate/${postId}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": authHeader(),
                        'Content-Type': 'application/json' 
                    }, 
                    body: JSON.stringify({ canDisplay:  canDisplay.canDisplay })
                })
    
                dispatch(editPostsCanDisplay(canDisplay.canDisplay));
    
            } catch(error) {
                console.log(error);
            };
        };
        editPostFetch();
    };

    


    return (
        <div>

            <Navbar/>
            
            {allPostsToModerate.map(post => {
                return (
                    
                    <div className='container-post-get' key={post.id}>
                        <div className='text-post'>
                            <p>{post.text}</p>

                                <div className='edit-delete-post'>
                                    <img src={IconCheck} onClick={() => handleEditByAdmin(post.id)}   alt="icon-check" />
                                    <img src={IconDelete} onClick={() => handleDeleteByAdmin(post.id)}  alt="icon-delete" />
                                </div>                            

                        </div>
                        {post.imageUrl && 
                        <div className='image-post'>
                            <img src={post.imageUrl} alt='img-about-post' />
                        </div>
                        }    
                    </div>
                    
                )
            })}


        </div>
    )
}
