import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { FaRegCommentAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/LoadingSpinner';

const Tweet = ({ post }) => {

    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const postOwner = post.user;
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const queryClient = useQueryClient()
    const isMyPost = authUser.data._id === post.user._id;
    const formattedDate = "1h";

    //Mutation functions

    const { mutate: deletePost, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/post/delete/${post._id}`, {
                    method: "DELETE",
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error)
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }

    })
    
    const { mutate: likePost, isPending: isLiking } = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/post/like/${post._id}`, {
                method: "POST",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to like post");
            }
            return await res.json();
        },
        onMutate: async () => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries(["posts"]);
    
            // Snapshot the previous value
            const previousPosts = queryClient.getQueryData(["posts"]);
    
            // Optimistically update to the new value
            queryClient.setQueryData(["posts"], (old) => {
                if (!Array.isArray(old)) return old;
                return old.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, likes: [...p.likes, authUser.data._id] };
                    }
                    return p;
                });
            });
    
            // Return a context object with the snapshotted value
            return { previousPosts };
        },
        onSuccess: (updatedPost, variables, context) => {
            queryClient.setQueryData(["post", updatedPost._id], updatedPost);
            setIsLiked(prev => !prev);
        },
        onError: (error, variables, context) => {
            console.error(error);
            toast.error(error.message || "Something went wrong");
            // If the mutation fails, use the context returned from onMutate to roll back
            queryClient.setQueryData(["posts"], context.previousPosts);
        },
        onSettled: () => {
            // Always refetch after error or success to ensure we have the latest data
            queryClient.invalidateQueries(["posts"]);
        },
    });
   
    const { mutate: commentOnPost, isPending: isCommenting } = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/post/comment/${post._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: comment })
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to post comment");
            }
            return res.json();
        },
        onSuccess: (response, variables, context) => {
            console.log("Server response:", response); // Log the entire response
    

            if (!response || typeof response !== 'object') {
                console.error("Invalid response from server:", response);
                toast.error("Unexpected server response");
                return;
            }
    

            const updatedPost = response.updatedPost || response;
    

    
            if (!updatedPost || typeof updatedPost !== 'object' || !updatedPost._id) {
                console.error("Invalid updated post data:", updatedPost);
                toast.error("Failed to update post with new comment");
                return;
            }
    

            queryClient.setQueryData(["posts"], (oldPosts) => {
                if (!Array.isArray(oldPosts)) return oldPosts;
                return oldPosts.map((p) => p._id === updatedPost._id ? updatedPost : p);
            });
    

            queryClient.setQueryData(["post", updatedPost._id], updatedPost);
    
            setComment("");
            toast.success('Comment posted successfully');
        },
        onError: (error) => {
            console.error("Error posting comment:", error);
            toast.error(error.message || "Failed to post comment");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["posts"]);
            queryClient.invalidateQueries(["post", post._id]);
        }
    });
    
    const { mutate: getPostDetails } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/post/${post._id}`);
                const data = await res.json();

                console.log(data);
                
                
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;

                
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: (postDetails) => {
            queryClient.setQueryData(["posts"], (oldData) => {
                return oldData.map((p) => {
                    if (p._id === postDetails._id) {
                        return postDetails;
                    }
                    return p;
                });
            });

        },
        onError: () => {
            toast.error("Cannot fetch post details");
        }
    });

    const handleDeletePost = () => {
        deletePost();
    };

    const handlePostComment = (e) => {
        e.preventDefault();
        if(isCommenting) return;
        commentOnPost();
    };

    const handleLikePost = () => {
        if (isLiking) return
        likePost();
    };

    const handlePostDetails = () => {
        document.getElementById("comments_modal" + post._id).showModal()
        // getPostDetails()
    }
    
    useEffect(() => {
        setIsLiked(post.likes.includes(authUser.data._id));
    }, [post.likes, authUser.data._id]);

    return (
        <div className='border-b border-gray-200'>
            <div >
                <div className='flex p-4'>
                    <Link to={`profile/${postOwner.username}`}>
                        <Avatar src={postOwner?.profileImg || "./public/avatar-placeholder.png"} size="38" round={true} />
                    </Link>

                    <div className='ml-3 w-full'>
                        <Link to={`profile/${postOwner.username}`} className='flex items-center'>
                            <h1 className='font-bold'>{postOwner.fullname}</h1>
                            <p className='text-gray-500 text-sm ml-1'> @{postOwner.username}</p>
                            <span>.</span>
                            <span>{formattedDate}</span>
                        </Link>
                        {isMyPost && (
                            <div className='flex justify-end flex-1' >
                                {!isPending && <FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />}
                                {isPending && <LoadingSpinner size='sm' />}
                            </div>
                        )}
                        <div>
                            <p>{post.text}</p>
                            {post.img && <img
                                src={post.img}
                                className='h-80 object-contain rounded-lg border border-gray-700'
                                alt=''
                            />}
                        </div>

                        <div className='flex justify-between my-3'>
                            <div className='flex  items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'
                                    onClick={handlePostDetails}
                                    >
                                    <FaRegCommentAlt size="15px" />
                                </div>

                                <p className='text-gray-500 text-sm'> {post.comments.length}</p>
                            </div>

                            <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
                                <div className='modal-box rounded border border-gray-600'>
                                    <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                                    <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                                        {post.comments.length === 0 && (
                                            <p className='text-sm text-slate-500'>
                                                No comments yet!
                                            </p>
                                        )}
                                        {post.comments.map((comment) => (
                                            <div key={comment._id} className='flex gap-2 items-start'>
                                                <div className='avatar'>
                                                    <div className='w-8 rounded-full'>
                                                        <img
                                                            src={comment.user.profileImg || "/avatar-placeholder.png"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='font-bold'>{comment?.user.fullName}</span>
                                                        <span className='text-gray-700 text-sm'>
                                                            @{comment?.user.username}
                                                        </span>
                                                    </div>
                                                    <div className='text-sm'>{comment.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <form
                                        className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                                        onSubmit={handlePostComment}
                                    >
                                        <textarea
                                            className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                                            placeholder='Add a comment...'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                                            {isCommenting ? (
                                                <span className='loading loading-spinner loading-md'></span>
                                            ) : (
                                                "Post"
                                            )}
                                        </button>
                                    </form>
                                </div>
                                <form method='dialog' className='modal-backdrop'>
                                    <button className='outline-none'>close</button>
                                </form>
                            </dialog>

                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                    <AiOutlineRetweet />
                                </div>
                                <p className='text-gray-400 text-sm '> 2</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer' onClick={handleLikePost}>
                                    {isLiking ? (
                                        <LoadingSpinner size='sm' />
                                    ) : isLiked ? (
                                        <FaHeart color="red" />
                                    ) : (
                                        <CiHeart />
                                    )}
                                </div>
                                <p className='text-gray-500 text-sm '> {post.likes.length}</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                    <FaRegBookmark size={14} className='mr-3' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet






