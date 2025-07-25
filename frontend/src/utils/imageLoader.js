// Utility to handle image loading with fallbacks
export const getImagePath = (imagePath) => {
  // For development, use process.env.PUBLIC_URL
  const basePath = process.env.NODE_ENV === 'production' ? '' : process.env.PUBLIC_URL || '';
  
  // Ensure the path starts with /
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${basePath}${cleanPath}`;
};

// Project images configuration
export const projectImages = {
  'study-buddy': {
    main: '/projectfolder/study-buddy/dashboard.png',
    gallery: [
      '/projectfolder/study-buddy/dashboard.png',
      '/projectfolder/study-buddy/leetcode.png',
      '/projectfolder/study-buddy/roadmap.png',
      '/projectfolder/study-buddy/signup.png',
      '/projectfolder/study-buddy/testyourself1.png'
    ]
  },
  'health-buddy': {
    main: '/projectfolder/health-buddy/1.jpg',
    gallery: [
      '/projectfolder/health-buddy/1.jpg',
      '/projectfolder/health-buddy/2.jpg',
      '/projectfolder/health-buddy/3.jpg',
      '/projectfolder/health-buddy/4.jpg',
      '/projectfolder/health-buddy/5.jpg',
      '/projectfolder/health-buddy/6.jpg',
      '/projectfolder/health-buddy/7.jpg',
      '/projectfolder/health-buddy/8.jpg',
      '/projectfolder/health-buddy/9.jpg',
      '/projectfolder/health-buddy/10.jpg'
    ]
  },
  'agrivision': {
    main: '/projectfolder/agrivision/landingpage.png',
    gallery: [
      '/projectfolder/agrivision/landingpage.png',
      '/projectfolder/agrivision/plantai.png',
      '/projectfolder/agrivision/cropdetails.png',
      '/projectfolder/agrivision/plantfind.png',
      '/projectfolder/agrivision/ecosystem.png'
    ]
  },
  'sarthi': {
    main: '/projectfolder/sarthi/home.png',
    gallery: [
      '/projectfolder/sarthi/home.png',
      '/projectfolder/sarthi/aboutus.png',
      '/projectfolder/sarthi/work.png',
      '/projectfolder/sarthi/paymentgateway.png'
    ]
  },
  'surasksha-suchak': {
    main: '/projectfolder/surasksha-suchak/1.jpg',
    gallery: [
      '/projectfolder/surasksha-suchak/1.jpg',
      '/projectfolder/surasksha-suchak/2.jpg',
      '/projectfolder/surasksha-suchak/3.jpg'
    ]
  },
  'code-off-duty': {
    main: '/projectfolder/code-off-duty/1.png',
    gallery: [
      '/projectfolder/code-off-duty/1.png',
      '/projectfolder/code-off-duty/2.png',
      '/projectfolder/code-off-duty/3.png',
      '/projectfolder/code-off-duty/4.png'
    ]
  }
};
