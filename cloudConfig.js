const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = {
  _handleFile(req, file, callback) {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'wanderlust_DEV',
        allowed_formats: ["png", "jpg", "jpeg"],
        public_id: 'computed-filename-using-request',
      },
      (error, result) => {
        if (error) return callback(error);
        if (!result) return callback(new Error("Cloudinary upload completed without a result"));
        callback(null, {
          path: result.secure_url,
          size: result.bytes,
          filename: result.public_id,
        });
      }
    );
    file.stream.pipe(uploadStream);
  },
  _removeFile(req, file, callback) {
    cloudinary.uploader.destroy(file.filename, { invalidate: true }, (error) => {
      callback(error);
    });
  },
};

module.exports={
    cloudinary,
    storage,
};