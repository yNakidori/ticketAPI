export const getCroppedImg = (imageSrc, crop) => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { x, y, width, height } = crop;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, -x, -y);

      // Converter a imagem cortada em uma URL de imagem
      canvas.toBlob((blob) => {
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    };

    image.onerror = (error) => reject(error);
  });
};
