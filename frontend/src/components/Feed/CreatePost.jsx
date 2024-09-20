import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import Avatar from 'react-avatar'
import { FaImages } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";

import Posts from './Posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const CreatePost = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const [feedType, setFeedType] = useState("forYou")
    const imgRef = useRef(null);

    const { data: authUser } = useQuery({ queryKey: ["authUser"] })


    const queryClient = useQueryClient();

    const { mutate: createPost, error, isError, isPending } = useMutation({
        mutationFn: async ({ text, img }) => {
            const formData = new FormData();
            formData.append('text', text);
            if (img) {
                formData.append('img', img);
            }

            try {
                const res = await fetch('/api/post/createPost', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                if (!res.ok)
                    throw new Error(data.error || "Something Went Wrong");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            setText("");
            setImg(null);
            toast.success("Post Created successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() && !img) {
            alert('Please provide some input (text or image) for your post.');
            return;
        }
        createPost({ text, img });

        if (imgRef.current) {
            imgRef.current.value = null;
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImg(prevState => ({
                    file: file,
                    preview: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div className='w-[100%]'>
            <div>
                <div className='flex justify-around items-center border-b border-gray-200'>
                    <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'
                        onClick={() => setFeedType("forYou")}>
                        <h1 className='font-semibold text-gray-600 text-lg'>For You</h1>

                        {feedType === "forYou" && (
                            <div className='absolute mx-24 w-[7%]  h-1 rounded-full bg-primary'></div>
                        )}

                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'
                        onClick={() => setFeedType("following")}
                    >
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                        {feedType === "following" && (
                            <div className='absolute w-[7%] mx-24 h-1 rounded-full bg-primary'></div>
                        )}

                    </div>
                </div>

                <div className='bg-gray-200' >
                    <div className='flex items-center justify-evenly' >
                        <div className='mb-5'>
                            <Avatar src={authUser?.data.profileImg || "./public/avatar-placeholder.png"} googleId="118096717852922241760" size="38" round={true} className='m-2' />
                        </div>

                            <textarea
                                resize:none
                                cols="30" rows="2"
                                className="w-full outline-none border-none text-lg ml-4 bg-gray-200 text-black"
                                placeholder='What is happening?!'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                    </div>

                    {img && (
                        <div className='relative w-72 ml-9'>
                            <IoCloseSharp
                                className='absolute top-1 right-1 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                                onClick={() => {
                                    setImg(null);
                                    if (imgRef.current) {
                                        imgRef.current.value = null;
                                    }
                                }}
                            />
                            <img src={img} className='p-2 mt-2 my-auto w-full h-72 object-contain rounded' alt="Selected" />
                        </div>
                    )}

                    <div className='flex items-center justify-between p-4 border-b border-gray-300 mt-7'>
                        <div className='cursor-pointer flex items-center justify-evenly'>
                            <FaImages size="25px" onClick={() => imgRef.current.click()} />
                            <BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer ml-2' />
                            <input type="file" accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className='appearance-none bg-black border-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer hover:bg-white hover:text-gray-950 font-semibold text-[16px] w-[80px] h-[30px]'
                        >
                            {isPending ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>
            </div>
            {isError && <div className='text-red-500'>{error.message}</div>}
            <Posts feedType={feedType} />
        </div>
    )
}

export default CreatePost