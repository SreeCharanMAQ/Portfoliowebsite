import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ 
  animationData, 
  width = 300, 
  height = 300, 
  loop = true, 
  autoplay = true,
  className = '',
  style = {}
}) => {
  // Default animation data (coding animation JSON would go here)
  const defaultAnimation = {
    "v": "5.7.4",
    "fr": 30,
    "ip": 0,
    "op": 90,
    "w": 300,
    "h": 300,
    "nm": "Coding Animation",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Code",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100},
          "r": {"a": 1, "k": [{"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]}, {"t": 89, "s": [360]}]},
          "p": {"a": 0, "k": [150, 150, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 0, "k": [100, 100, 100]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "ty": "rc",
                "d": 1,
                "s": {"a": 0, "k": [60, 60]},
                "p": {"a": 0, "k": [0, 0]},
                "r": {"a": 0, "k": 10}
              },
              {
                "ty": "fl",
                "c": {"a": 0, "k": [0, 0, 0, 1]},
                "o": {"a": 0, "k": 100}
              }
            ]
          }
        ],
        "ip": 0,
        "op": 90,
        "st": 0
      }
    ]
  };

  return (
    <div className={`lottie-container ${className}`} style={{ width, height, ...style }}>
      <Lottie
        animationData={animationData || defaultAnimation}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;
