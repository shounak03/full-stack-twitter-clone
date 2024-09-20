import React, { useEffect } from 'react'
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import Tweet from './Tweet';

const Posts = ({feedType, username, userId}) => {


    
    const getPostEndPoint = () => {
        switch(feedType) {
            case "forYou":
                return "/api/post/all";
            case "following":    
                return "/api/post/following";
            case "posts":    
                return `/api/post/user/${username}`;
            case "likes":    
                return `/api/post/likes/${userId}`;
            default:
                return "/api/post/all";
        }
    }

    const Post_Endpoint = getPostEndPoint();

    

    const {data:posts, isLoading, refetch, isRefetching, error} = useQuery({
        queryKey: ["posts", feedType, username, userId],
        queryFn: async () => {
            try {
                const res = await fetch(Post_Endpoint)
                if (!res.ok) {
                    throw new Error("Failed to fetch posts")
                }
                const data = await res.json()
                return data
            } catch (error) {
                throw new Error(error.message || "Something went wrong")
            }
        }
    });

    
    useEffect(() => {
        refetch();
    }, [feedType, refetch])

    // Handle loading state
    if (isLoading || isRefetching) {
        return (
            <div className='flex flex-col justify-center'>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>
        );
    }

    // Handle error state
    if (error) {
        return <p className='text-center my-4'>Error loading posts: {error.message}</p>;
    }

    // Handle empty posts
    if (!posts || posts?.length === 0) {
        return <p className='text-center my-4'>No posts in this tab. Switch 👻</p>;
    }

    // Render posts
    return (
        <div>
            {posts?.map((post) => (
                <Tweet key={post._id} post={post} />
            ))}
        </div>
    );
}

export default Posts