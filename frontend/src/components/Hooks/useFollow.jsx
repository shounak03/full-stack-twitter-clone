import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFollow = () => {
    const queryClient = useQueryClient();

    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (id) => {
            try {
                const res = await fetch(`api/users/follow/${id}`, {
                    method: "GET",
                })
                const data = await res.json()
                if (!res.ok)
                    throw new Error(data.Error || "Something went wrong")
                return data
            } catch (error) {
                console.log(error);
                
            }
        },
        onSuccess: ()=>{
            Promise.all([
                queryClient.invalidateQueries({queryKey:["suggestedUser"]}),
                queryClient.invalidateQueries({queryKey:["authUser"]})
            ])
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {follow,isPending}
}
export default useFollow