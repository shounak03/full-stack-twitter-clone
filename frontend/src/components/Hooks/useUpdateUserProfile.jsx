import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useUpdateUserProfile = () => {

    const queryClient = useQueryClient()

    const{ mutateAsync:updateProfile, isPending:isUpdatingProfile } = useMutation({
        mutationFn: async(formData)=>{
            try {
                const res = fetch(`api/users/profile/updateProfile`,{
                    method: 'POST',
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(formData)
                });
                const data = res.json()
                if(!res.ok)     throw new Error(data.error || "Something went wrong");

                return data;
            } catch (error) {
                throw new Error(error?.message || "Something went wrong");
            }
        },
        onSuccess: () => {
            toast.success("Profile update successfully")
            Promise.all([
                queryClient.invalidateQueries(['userProfile']),
                queryClient.invalidateQueries(['authUser']),

            ]);
        },
        onError: (error)=>{
            toast.error(error.message)
        }
    })

  return {updateProfile, isUpdatingProfile}
}

export default useUpdateUserProfile