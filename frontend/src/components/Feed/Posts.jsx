import React, { useEffect } from 'react'
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';

import Tweet from './Tweet';

const Posts = ({feedType}) => {


    
    const getPostEndPoint = ()=>{
        switch(feedType){
            case "forYou":
                return "/api/post/all";
            case "following":    
                return "/api/post/following";
            default:
                return "/api/post/all";
        }
    }

    const Post_Endpoint = getPostEndPoint();

    

    const {data:posts, isLoading,refetch, isRefetching} = useQuery({
        queryKey:["posts"],
        queryFn: async()=>{
            try {
                const res = await fetch(Post_Endpoint)
                const data = await res.json()
                if(!res.ok){
                    throw new Error(data.error || "something went wrong")
                }
                return data
            } catch (error) {
                throw new Error(error.message || "something went wrong")
            }
        }
    });



    useEffect(()=>{
        refetch();
    },[feedType,refetch])

    return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Tweet key={post._id} post={post} />
					))}
                    
				</div>
			)}

		</>
	);
}

export default Posts