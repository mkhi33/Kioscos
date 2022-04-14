

export const getCroppedImage = (sourceImage, cropConfig) => {
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas');
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext('2d');

    console.log(sourceImage)
    ctx.drawImage(
        sourceImage,
        cropConfig.x * scaleX,
        cropConfig.y * scaleY,
        cropConfig.width * scaleX,
        cropConfig.height * scaleY,
        0,
        0,
        cropConfig.width,
        cropConfig.height
    );

    console.log(canvas)
    return canvas
}

export const formatearDinero = (cantidad) => {
    
    return cantidad.toLocaleString('en-US',{
        style:'currency',
        currency:'HNL'
    })
}