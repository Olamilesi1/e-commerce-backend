import path from "path";

import multer from "multer";

//Configure storage options for multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder to save files temporarily. cb means call back
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Get the file extension
      cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Create a unique file name
    },
  });
  
  // Initialize multer with the defined storage configuration
  const upload = multer({ storage });
  
  export default upload;

