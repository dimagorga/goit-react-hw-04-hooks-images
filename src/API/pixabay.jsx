import axios from "axios";

function fetchImages(inputValue, pageValue) {
  return axios.get(
    `https://pixabay.com/api/?q=${inputValue}&page=${pageValue}&key=22395218-1fa4e36600279d8c4f99c77de&image_type=photo&orientation=horizontal&per_page=12`
  );
}

const api = {
  fetchImages,
};

export default api;
