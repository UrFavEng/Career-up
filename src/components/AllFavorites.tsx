import { useGetAllFavQuery } from "../store/apislice";

const AllFavorites = () => {
  const { data } = useGetAllFavQuery();
  console.log(data);
  return <div className=" text-[100px] min-h-[72vh]">AllFavorites</div>;
};

export default AllFavorites;
