import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Upload, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ImageManagement = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch all images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/images/images"
      );
      setImages(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch images");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Image uploaded successfully!");
      setImages([...images, response.data]);
      setSelectedFile(null);
      // Reset file input
      event.target.reset();

      // Refresh images list
      fetchImages();
    } catch (err) {
      setError("Failed to upload image");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (imageId) => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/images/images/${imageId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Image updated successfully!");
      setSelectedFile(null);
      setSelectedImage(null);

      // Refresh images list
      fetchImages();
    } catch (err) {
      setError("Failed to update image");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/images/images/${imageId}`);
      setSuccess("Image deleted successfully!");

      // Remove image from state
      setImages(images.filter((img) => img._id !== imageId));
    } catch (err) {
      setError("Failed to delete image");
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="container mx-auto p-4">
      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-8 p-4 border rounded-lg bg-white shadow"
      >
        <h2 className="text-xl font-bold mb-4">Upload Image</h2>
        <div className="flex gap-4">
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            <Upload size={20} />
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {/* Messages */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Refresh Button */}
      <button
        onClick={fetchImages}
        disabled={loading}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"
      >
        <RefreshCw size={20} />
        Refresh List
      </button>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image._id}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <img
              src="http://localhost:8000/api/images/images/159742263_297172491968248_3251189529295112750_n.jpg"
              //   src={image?.fullUrl || ""}
              alt={image.originalname}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-medium truncate">{image.originalname}</h3>
                <p className="text-sm text-gray-500">
                  Size: {Math.round(image.size / 1024)} KB
                </p>
              </div>
              <div className="flex gap-2">
                {selectedImage === image._id ? (
                  <>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="w-32"
                    />
                    <button
                      onClick={() => handleUpdate(image._id)}
                      disabled={loading || !selectedFile}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedImage(image._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="p-1 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManagement;


