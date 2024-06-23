import { useContext } from "react";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
  const axiosSecure = useAxiosSecure();
const {user} = useContext(AuthContext)
  const { data, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/cart/${user?.email}`);
        return response.data;
      } catch (error) {
        throw new Error("Error fetching delivery man data");
      }
    },
  });
  return {data, refetch};
};

export default useCart;
