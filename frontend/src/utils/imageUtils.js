// Image utility functions
export const validateImagePath = (imagePath) => {
  if (!imagePath) return false;
  return imagePath.startsWith('/images/');
};

export const getImageUrl = (imagePath) => {
  // Ensure the path starts with /images/
  if (!imagePath.startsWith('/images/')) {
    console.warn(`Invalid image path: ${imagePath}. Should start with /images/`);
    return null;
  }
  return imagePath;
};

export const handleImageError = (e, projectTitle) => {
  console.error('Image failed to load:', e.target.src);
  console.log('Project:', projectTitle);
  
  // Create fallback
  const fallback = document.createElement('div');
  fallback.style.cssText = `
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #1890ff, #722ed1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    text-align: center;
    padding: 20px;
  `;
  fallback.textContent = projectTitle;
  
  // Hide broken image and show fallback
  e.target.style.display = 'none';
  e.target.parentElement.appendChild(fallback);
};

export const handleImageLoad = (e) => {
  console.log('Image loaded successfully:', e.target.src);
};
