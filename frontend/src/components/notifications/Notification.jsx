import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const Notification = () => {

  const queryClient = useQueryClient();

  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {

      try {
        const res = await fetch("api/notification", {
          method: "GET",
        });
        
        if (!res.ok) {
          const errorData = await res.json();

          throw new Error(errorData.error || "Something went wrong");
        }
        
        const data = await res.json();

        return data;
      } catch (error) {

        throw error;
      }
    }
  });


  const { mutate: deleteNotifications, } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("api/notification/delete", {
          method: "DELETE",

        })

      } catch (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully")
      queryClient.invalidateQueries({queryKey: ["notification"]})
    },
    onError: (error) => {
      toast.error("Error deleting notification" || error.message)
    }
  })


  return (
    <>
      <div className='flex-[4,4,1] border border-gray-300 min-h-screen w-[50%]'>
        <div className='flex justify-between items-center p-4 border-b border-gray-300'>
          <p className='font-bold'>Notifications</p>
          <div className='dropdown '>
            <div tabIndex={0} role='button' className='m-1'>
              <IoSettingsOutline className='w-4' />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className='flex justify-center h-full items-center'>
            <LoadingSpinner size='lg' />
          </div>
        )}
        {notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications</div>}
        {notifications?.map((notification) => (
          <div className='border-b border-gray-300' key={notification._id}>
            <div className='flex gap-2 p-4'>
              {notification.type === "follow" && <FaUser className='w-7 h-7 text-primary' />}
              {notification.type === "like" && <FaHeart className='w-7 h-7 text-red-500' />}
              <Link to={`/profile/${notification.from.username}`}>
                <div className='avatar'>
                  <div className='w-8 rounded-full'>
                    <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                  </div>
                </div>
                <div className='flex gap-1'>
                  <span className='font-bold'>@{notification.from.username}</span>{" "}
                  {notification.type === "follow" ? "followed you" : "liked your post"}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Notification