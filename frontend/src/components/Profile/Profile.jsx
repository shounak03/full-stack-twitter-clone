import React, { useRef, useState } from 'react'
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import EditProfile from './EditProfile'

const Profile = () => {
  const [coverImg, setCoverImg] = useState(null)
  const [profileImg, setProfileImg] = useState(null)
  const [feedType, setFeedType] = useState("posts")

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);c

  const isLoading = false;
  const isMyProfile = true;

  const user = {
    _id: "1",
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "https://pbs.twimg.com/profile_images/1807128314529898496/oH9YW1Ao_400x400.jpg",
    coverImg: "https://pbs.twimg.com/profile_banners/1424624896806555649/1719689085/1500x500",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "https://youtube.com/@asaprogrammer_",
    following: ["1", "2", "3"],
    followers: ["1", "2", "3"],
  };

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='w-[50%] border border-gray-200'>
      {isLoading && <ProfileHeaderSkeleton />}
      {!isLoading && !user && <p className='text-center text-lg mt-4'>User not found</p>}
      <div>
        {!isLoading && user && (
          <>
            <div className='flex items-center py-2 '>
              <Link to='/' className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
                <IoMdArrowBack size="24px" />
              </Link>
              <div className='ml-2'>
                <h1 className='font-bold text-lg'>{user?.fullName}</h1>
                <p className='text-gray-500 text-sm'>{124} posts</p>
              </div>
            </div>
            <div className='relative group/cover'>
              <img src={user?.coverImg || 'public/cover.png'} alt="cover-img" className='w-full' />

              {isMyProfile && (
                <div
                  className='absolute top-2 right-2 rounded-full p-2 bg-gray-700 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                  onClick={() => coverImgRef.current.click()}
                >
                  <MdEdit className='w-20px h-5 text-white' />
                </div>
              )}
              <input
                type='file'
                accept='image/*'
                hidden
                ref={coverImgRef}
                onChange={(e) => handleImgChange(e, "coverImg")}
              />
              <input
                type='file'
                accept='image/*'
                hidden
                ref={profileImgRef}
                onChange={(e) => handleImgChange(e, "profileImg")}
              />
            </div>
            <div className='top-56 border-4 border-white rounded-full ml-4 absolute group/cover'>
              <Avatar src={user?.profileImg || 'public/avatar-placeholder.png'} size='120px' round={true} />

              {isMyProfile && (
                <div
                  className='absolute top-2 right-4 rounded-full p-2 bg-gray-700 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                  onClick={() => coverImgRef.current.click()}
                >
                  <MdEdit
                    className='w-10px h-5 text-white'
                    onClick={() => profileImgRef.current.click()}
                  />
                </div>
              )}

            </div>
            <div className='text-right m-4'>
              {isMyProfile && <EditProfile />}
              {!isMyProfile && (

                <button className='px-4 py-2 w-[20%] bg-black text-white rounded-full border border-gray-400 hover:bg-white hover:text-black'>Follow</button>
              )}
              {(coverImg || profileImg) && (
                <button
                  className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                  onClick={() => alert("Profile updated successfully")}
                >
                  Update
                </button>
              )}
            </div>
            <div className='m-4'>
              <h1 className='font-bold text-xl'>{user?.fullName}</h1>
              <p className='text-sm text-gray-500'>@{user?.username}</p>
            </div>
            <div className='m-4'>
              <p>{user.bio}</p>
            </div>
            <div className='flex gap-2 flex-wrap'>
              {user?.link && (
                <div className='flex gap-1 items-center ml-3'>
                  <>
                    <FaLink className='w-4 h-4 text-slate-500' />
                    <a
                      href='https://youtube.com/@asaprogrammer_'
                      target='_blank'
                      rel='noreferrer'
                      className='text-sm text-blue-500 hover:underline'
                    >
                      <p className='text-sm p-1'>youtube.com/@asaprogrammer_</p>
                    </a>
                  </>
                </div>
              )}
              <div className='flex gap-2 items-center'>
                <SlCalender className='w-4 h-4 text-slate-500 ml-3' />
                <p className=' text-gray-600'>Joined August 2021</p>
              </div>
            </div>
            <div className='m-4 flex items-center justify-start'>
              <p className='font-bold '>{user?.following.length}</p>
              <h1 className='pl-1 text-gray-500'>Following</h1>
              <div className='flex items-center justify-start'>
                <p className='font-bold ml-6'>{user?.followers.length}</p>
                <h1 className='pl-1 text-gray-500'>Followers</h1>
              </div>
            </div>

            {/* <div className='flex justify-center items-center border-b border-gray-200 mt-4'>
              <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                <h1 className='font-semibold text-gray-600 cursor-pointer text-lg'>Posts</h1>
              </div>
              <div className='cursor-pointer hover:bg-gray-200 w-full text-slate-500 text-center px-4 py-3'>
                <h1 className='font-semibold text-gray-600 text-lg'>Likes</h1>
              </div>
            </div> */}
            <div className='flex w-full border-b border-gray-500 mt-4'>
								<div
									className='flex justify-center flex-1 p-3  hover:bg-gray-200 transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("posts")}
								>
									Posts
									{feedType === "posts" && (
										<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
									)}
								</div>
								<div
									className='flex justify-center flex-1 p-3 text-slate-500 hover:bg-gray-200  transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("likes")}
								>
									<h1 className=' text-black '>Likes</h1>
									{feedType === "likes" && (
										<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
									)}
								</div>
							</div>
          </>
        )}



      </div>
    </div>
  )
}

export default Profile