// import React, { useState, useEffect, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { X, ArrowLeft, ArrowRight, Upload, Folder } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { delImg, uploadImg } from "../../features/upload/uploadSlice"; // Assuming these are actions for upload and delete
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// export default function ImageUpload({ setImages, images }) {
//   const [isUploading, setIsUploading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const dispatch = useDispatch();
//   const imgState = useSelector((state) => state.upload.images);

  

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       setIsUploading(true);
//       dispatch(uploadImg(acceptedFiles))
//         .unwrap()
//         .then(() => {
//           toast.success("Images Uploaded Successfully!");
//           setIsUploading(false);
//         })
//         .catch(() => {
//           toast.error("Image Upload Failed!");
//           setIsUploading(false);
//         });
//     },
//     [dispatch]
//   );

//   const removeImage = (publicId) => {
//     dispatch(delImg(publicId));
//   };
//   const removeAllImages = () => {
//     setImages([]);
//   };
//   const moveImage = (index, direction) => {
//     setImages((prevImages) => {
//       const newImages = [...prevImages];
//       const [removed] = newImages.splice(index, 1);
//       newImages.splice(
//         direction === "left" ? index - 1 : index + 1,
//         0,
//         removed
//       );
//       return newImages;
//     });
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   useEffect(() => {
//     setImages(
//       imgState.map((img) => ({
//         url: img.url,
//         public_id: img.public_id,
//       }))
//     );
//   }, [imgState, setImages]);

//   const openPreview = (image) => {
//     setPreviewImage(image);
//   };

//   const closePreview = () => {
//     setPreviewImage(null);
//   };

//   return (
//     <div className="max-w-2xl border p-6 bg-background rounded-md my-4  lg:mx-0">
//       <h2 className="text-xl font-bold mb-4">Images</h2>
//       <div
//         {...getRootProps()}
//         className={`border border-dashed bg-image-man rounded-lg p-8 mb-4 text-center cursor-pointer ${
//           isDragActive ? "border-emerald-500 bg-blue-50" : "border-gray-300"
//         }`}
//       >
//         <input {...getInputProps()} />
//         <div className="flex justify-center items-center hover:opacity-65">
//           <span class="icon-[solar--gallery-send-bold-duotone] h-28 w-28 text-gray-400"></span>
//         </div>
//         <p className="mt-4 text-lg font-semibold">Drop or select file</p>
//         <p className="text-sm text-gray-500">
//           Drop files here or click to{" "}
//           <span className="text-emerald-500 hover:underline">browse</span>{" "}
//           through your machine.
//         </p>
//       </div>

//       {images.length > 0 && (
//         <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 mb-4">
//           {images.map((image, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={image.url}
//                 alt={`preview ${index}`}
//                 className="bg-green-100 aspect-square h-30 w-40 object-cover rounded-xl"
//               />
//               <div
//                 onClick={() => removeImage(image.public_id)}
//                 className="absolute top-1 right-1 bg-gray-500/80 rounded-full p-[3px] opacity-1 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
//               >
//                 <X className="h-3 w-3 text-white" />
//               </div>
//               <div className="absolute bottom-2 right-2 flex space-x-2 opacity-1 group-hover:opacity-100 transition-opacity">
//                 {index > 0 && (
//                   <div
//                     onClick={() => moveImage(index, "left")}
//                     className="bg-white rounded-full p-1 shadow-md"
//                   >
//                     <ArrowLeft className="h-4 w-4 text-gray-600" />
//                   </div>
//                 )}
//                 {index < images.length - 1 && (
//                   <div
//                     onClick={() => moveImage(index, "right")}
//                     className="bg-white rounded-full p-1 shadow-md"
//                   >
//                     <ArrowRight className="h-4 w-4 text-gray-600" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="flex justify-between items-center">
//         <div
//           onClick={removeAllImages}
//           className="px-4 py-2 bg-background border hover:bg-muted rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 "
//         >
//           Remove all
//         </div>
//        </div>
//        <div className="flex justify-end items-end">
//         <div
//           disabled={isUploading || !images.length}
//           className={`px-4 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center ${
//             (isUploading || !images.length) && "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           {isUploading ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Uploading...
//             </>
//           ) : (
//             <>
//               <Upload className="mr-2 h-5 w-5 " />
//               Upload
//             </>
//           )}
//         </div>
//       </div>
      
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, ArrowLeft, ArrowRight, Upload, Folder } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ImageUpload({ setImages, images }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const imgState = useSelector((state) => state.upload.images);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setIsUploading(true);
      dispatch(uploadImg(acceptedFiles))
        .unwrap()
        .then(() => {
          toast.success("Images Uploaded Successfully!");
          setIsUploading(false);
        })
        .catch(() => {
          toast.error("Image Upload Failed!");
          setIsUploading(false);
        });
    },
    [dispatch]
  );

  const removeImage = (publicId) => {
    // Dispatch the delete action for the specific image
    dispatch(delImg(publicId))
      .unwrap()
      .then(() => {
        // Filter out the deleted image from the local state
        setImages(prevImages => 
          prevImages.filter(img => img.public_id !== publicId)
        );
        toast.success("Image deleted successfully!");
      })
      .catch((error) => {
        toast.error("Failed to delete image");
        console.error("Delete image error:", error);
      });
  };

  const removeAllImages = () => {
    // Dispatch delete actions for all images
    imgState.forEach(img => {
      dispatch(delImg(img.public_id));
    });

    // Clear the local images state
    setImages([]);
    toast.success("All images removed!");
  };

  const moveImage = (index, direction) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [removed] = newImages.splice(index, 1);
      newImages.splice(
        direction === "left" ? index - 1 : index + 1,
        0,
        removed
      );
      return newImages;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setImages(
      imgState.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }))
    );
  }, [imgState, setImages]);

  const openPreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="max-w-2xl border p-6 bg-background rounded-md my-4 lg:mx-0">
      <h2 className="text-xl font-bold mb-4">Images</h2>
      <div
        {...getRootProps()}
        className={`border border-dashed bg-image-man rounded-lg p-8 mb-4 text-center cursor-pointer ${
          isDragActive ? "border-emerald-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex justify-center items-center hover:opacity-65">
          <span className="icon-[solar--gallery-send-bold-duotone] h-28 w-28 text-gray-400"></span>
        </div>
        <p className="mt-4 text-lg font-semibold">Drop or select file</p>
        <p className="text-sm text-gray-500">
          Drop files here or click to{" "}
          <span className="text-emerald-500 hover:underline">browse</span>{" "}
          through your machine.
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={`preview ${index}`}
                className="bg-green-100 aspect-square h-30 w-40 object-cover rounded-xl"
              />
              <div
                onClick={() => removeImage(image.public_id)}
                className="absolute top-1 right-1 bg-gray-500/80 rounded-full p-[3px] opacity-1 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
              >
                <X className="h-3 w-3 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 flex space-x-2 opacity-1 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <div
                    onClick={() => moveImage(index, "left")}
                    className="bg-white rounded-full p-1 shadow-md"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-600" />
                  </div>
                )}
                {index < images.length - 1 && (
                  <div
                    onClick={() => moveImage(index, "right")}
                    className="bg-white rounded-full p-1 shadow-md"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div
          onClick={removeAllImages}
          className="px-4 py-2 bg-background border hover:bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Remove all
        </div>
       </div>
       <div className="flex justify-end items-end">
        <div
          disabled={isUploading || !images.length}
          className={`px-4 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center ${
            (isUploading || !images.length) && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5 " />
              Upload
            </>
          )}
        </div>
      </div>
    </div>
  );
}