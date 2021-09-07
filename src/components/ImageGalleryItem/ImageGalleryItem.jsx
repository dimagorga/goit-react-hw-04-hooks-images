import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";
function ImageGalleryItem({ imagesList, modalOpen }) {
  return imagesList.map((image) => {
    return (
      <li
        key={image.id}
        onClick={() => modalOpen(image.largeImageURL)}
        className={s.ImageGalleryItem}
      >
        <img
          id={image.id}
          src={image.webformatURL}
          alt="/"
          className={s.ImageGalleryItemImage}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  imagesList: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
