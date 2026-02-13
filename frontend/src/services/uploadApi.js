import axios from "./axios";

// Upload 1 ảnh
export const uploadSingleImage = async (file, folder = "posts") => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  // Không set Content-Type, axios sẽ tự set với boundary
  const response = await axios.post("/upload/single", formData);
  return response.data;
};

// Upload nhiều ảnh
export const uploadMultipleImages = async (files, folder = "posts") => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });
  formData.append("folder", folder);

  const response = await axios.post("/upload/multiple", formData);
  return response.data;
};

// Xóa ảnh
export const deleteImage = async (path) => {
  const response = await axios.delete("/upload", { data: { path } });
  return response.data;
};
