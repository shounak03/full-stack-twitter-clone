import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import Avatar from 'react-avatar'
import { FaImages } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";

const CreatePost = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() && !img) {
            alert('Please provide some input (text or image) for your post.');
            return;
        }
        //createPost({ text, img });
        alert("Post created successfully");
        // Clear the input fields after posting
        setText('');
        setImg(null);
        if (imgRef.current) {
            imgRef.current.value = null;
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const imgRef = useRef(null);

    return (
        <div className='w-[100%]'>
            <div>
                <div className='flex justify-around items-center border-b border-gray-200'>
                    <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                        <h1 className='font-semibold text-gray-600 cursor-pointer text-lg'>For You</h1>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                    </div>
                </div>
                <div className='bg-gray-200' >
                    <div className='flex items-center justify-evenly' >
                        <div>
                            <Avatar src="/public/boy3.png" googleId="118096717852922241760" size="38" round={true} className='m-2' />
                        </div>
                        <input
                            className="textarea w-full outline-none border-none text-lg ml-4 bg-gray-200 text-black"
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
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost