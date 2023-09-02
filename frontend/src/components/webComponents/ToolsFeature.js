import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolsFeatureImageModal from '../ToolsFeatureImageModal';

const ToolsFeature = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [toolsFeatureImage, setToolsFeatureImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchToolsFeatureImage();
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .post(
        'http://localhost:5000/api/tools-feature-image/upload-tools-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        fetchToolsFeatureImage();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const fetchToolsFeatureImage = () => {
    axios
      .get(
        'http://localhost:5000/api/tools-feature-image/get-tools-feature-image',
        {
          responseType: 'arraybuffer',
        }
      )
      .then((response) => {
        const imageBlob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        setToolsFeatureImage(URL.createObjectURL(imageBlob));
      })
      .catch((error) => {
        console.error('Error fetching tools feature image:', error);
      });
  };

  const handleReplace = () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .put(
        'http://localhost:5000/api/tools-feature-image/replace-tools-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image replaced successfully:', response.data);
        fetchToolsFeatureImage();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error replacing image:', error);
      });
  };

  return (
    <div className="listed-components">
      {/* TOOLS FEATURE IMAGE */}
      <div className="single-component" onClick={handleOpenModal}>
        <h4>Tools Feature Image</h4>
        {toolsFeatureImage && (
          <img src={toolsFeatureImage} alt="Tools Feature" />
        )}
      </div>
      <ToolsFeatureImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleImageChange={handleImageChange}
        handleReplace={handleReplace}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default ToolsFeature;
