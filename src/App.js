import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import imagesApi from "./API/pixabay";
import Loader from "react-loader-spinner";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState("");
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (searchInput === "") {
      return;
    }
    if (setPage((prevState) => prevState) !== page) {
      searchImages(searchInput, page);
    }
  }, [page, searchInput]);

  const searchImages = (searchInput, page) => {
    setIsLoading(true);
    imagesApi
      .fetchImages(searchInput, page)
      .then((images) => {
        setLoadMoreBtn(true);
        const totalPages = Math.round(images.data.totalHits / 12);
        if (page === totalPages) {
          setLoadMoreBtn(false);
        }
        if (images.data.hits.length === 0) {
          toast.error(`"${searchInput}" is not found`, {
            theme: "dark",
          });
          setLoadMoreBtn(false);
        }
        setImages((prevState) => {
          return page === 1
            ? images.data.hits
            : [...prevState, ...images.data.hits];
        });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        const notify = () => toast(error.message);
        notify();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleFormSubmit(searchInput) {
    if (searchInput.trim === "") {
      setImages([]);
    } else {
      setSearchInput(searchInput);
      setPage(1);
    }
  }

  const onLoadMoreClick = () => {
    setPage((prevState) => {
      return prevState + 1;
    });
  };

  const onModalOpen = (largeImg) => {
    setShowModal(true);
    setModal(largeImg);
  };

  const onModalClose = () => {
    setShowModal(false);
    setModal("");
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery>
        <ImageGalleryItem modalOpen={onModalOpen} imagesList={images} />
      </ImageGallery>
      {isLoading && (
        <Loader
          className="Loader"
          type="Grid"
          color="#00BFFF"
          height={80}
          width={80}
        />
      )}
      {loadMoreBtn && (
        <Button
          type="button"
          name="Load more"
          onBtnClick={onLoadMoreClick}
          className="Button"
        />
      )}
      {showModal && <Modal modalClose={onModalClose} modalImage={modal} />}
      <ToastContainer />
    </div>
  );
}

export default App;
