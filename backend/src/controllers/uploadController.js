import { supabaseAdmin } from "../config/supabase.js";

// Upload 1 ảnh lên Supabase Storage
export const uploadImage = async (req, res) => {
  try {
    console.log("=== Upload Request ===");
    console.log("File:", req.file ? req.file.originalname : "NO FILE");
    console.log("Body:", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Không có file được tải lên",
      });
    }

    const file = req.file;
    const folder = req.body.folder || "posts";
    const fileName = `${folder}/${Date.now()}_${file.originalname.replace(
      /\s+/g,
      "_"
    )}`;

    console.log("Uploading to Supabase:", fileName);

    // Upload lên Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("images")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Lỗi upload Supabase:", error);
      return res.status(400).json({
        success: false,
        message: error.message || "Lỗi upload lên Supabase Storage",
      });
    }

    // Lấy URL công khai
    const { data: urlData } = supabaseAdmin.storage
      .from("images")
      .getPublicUrl(data.path);

    console.log("Upload success:", urlData.publicUrl);

    res.json({
      success: true,
      data: {
        url: urlData.publicUrl,
        path: data.path,
      },
      message: "Upload thành công",
    });
  } catch (error) {
    console.error("Lỗi upload:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload nhiều ảnh
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Không có file được tải lên",
      });
    }

    const folder = req.body.folder || "posts";
    const uploadedUrls = [];

    for (const file of req.files) {
      const fileName = `${folder}/${Date.now()}_${file.originalname.replace(
        /\s+/g,
        "_"
      )}`;

      const { data, error } = await supabaseAdmin.storage
        .from("images")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Lỗi upload file:", file.originalname, error);
        continue;
      }

      const { data: urlData } = supabaseAdmin.storage
        .from("images")
        .getPublicUrl(data.path);

      uploadedUrls.push({
        url: urlData.publicUrl,
        path: data.path,
      });
    }

    res.json({
      success: true,
      data: uploadedUrls,
      message: `Đã upload ${uploadedUrls.length} ảnh`,
    });
  } catch (error) {
    console.error("Lỗi upload nhiều ảnh:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Xóa ảnh từ Storage
export const deleteImage = async (req, res) => {
  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({
        success: false,
        message: "Thiếu đường dẫn file",
      });
    }

    const { error } = await supabaseAdmin.storage.from("images").remove([path]);

    if (error) throw error;

    res.json({
      success: true,
      message: "Xóa ảnh thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa ảnh:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
