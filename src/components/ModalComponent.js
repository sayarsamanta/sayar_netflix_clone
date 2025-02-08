import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/slice/MovieSlice";
import Modal from "react-modal";
import { IoCloseCircle } from "react-icons/io5";
import { time_convert } from "../utils/helper";
import { BsBadgeHd } from "react-icons/bs";
import RecommendationCard from "./movie/RecommendationCard";
import { movie_poster_base_url } from "../utils/constants";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "black",
    height: "90%",
  },
};
function ModalComponent() {
  const { showModal, movieDetails, recommendations } = useSelector(
    (store) => store.movie
  );
  console.log(movieDetails);
  const dispatch = useDispatch();
  const onOpenModal = () => {
    dispatch(setModal());
  };
  const onCloseModal = () => {
    dispatch(setModal());
  };
  if (!movieDetails) return;
  const {
    id,
    key,
    original_title,
    overview,
    tagline,
    spoken_languages,
    production_companies,
    genres,
    release_date,
    runtime,
  } = movieDetails;
  return (
    <div className="bg-white">
      <Modal
        isOpen={showModal}
        //onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-black scale-[1]">
          <h1 className="text-white text-lg mt-3 absolute">{original_title}</h1>
          <span className="w-full text-xs absolute mt-9 text-white bg-gradient-to-t from-black">
            {release_date}
          </span>
          <iframe
            class="h-[500px] w-[800px] aspect-video border: none m:none; p:none pointer-events-none rounded-md"
            title="Youtube player"
            allow="autoplay; encrypted-media"
            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
            src={`https://youtube.com/embed/${key}?autoplay=1&mute=1&showinfo=0&controls=0&modestbranding=1&autohide=1&playsinline=1&color=white&loop=1&playlist=${key}`}
          ></iframe>
          <IoCloseCircle
            onClick={() => {
              onCloseModal();
            }}
            className="absolute top-0 right-0 m-4 cursor-pointer"
            fill="white"
            size={40}
          />
          <div className="absolute flex-wrap text-white w-full -bottom-30 ">
            <div className="mt-3 px-2 bg-gradient-to-t from-black">
              <div className="flex justify-start items-center">
                <p className="text-white mr-2">{time_convert(runtime)}</p>
                <BsBadgeHd size={20} />
              </div>
              <div className="flex items-center mt-2">
                <div className="text-white border w-14 justify-center items-center h-6 flex border-white mr-2">
                  <p className="text-xs">{"U/A 16+"}</p>
                </div>
                {genres?.map((item) => (
                  <p className="text-xs mr-1">{item?.name + ","}</p>
                ))}
              </div>

              <div className="font-semibold mr-2 mt-2">{"Watch in"}</div>
              <div className="flex">
                {spoken_languages?.map((lan) => (
                  <p className="text-white mr-2 font-semibold ">
                    {lan?.name + ", "}
                  </p>
                ))}
              </div>
              <p className="w-[600px] text-sm">{overview}</p>
              {production_companies?.length && (
                <>
                  <h1 className="mt-4">{"Produced by"}</h1>
                  <div className="flex flex-wrap">
                    {production_companies?.map((com) => {
                      if (!com?.logo_path) return;
                      return (
                        <img
                          alt="production_companies"
                          className="w-7"
                          src={movie_poster_base_url + com?.logo_path}
                        ></img>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="flex fixed flex-wrap mt-10 pb-10">
                <h1 className="text-center text-white text-xl">
                  {"Recommendations"}
                </h1>
                {recommendations?.map((movie) => {
                  return <RecommendationCard movie={movie} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
