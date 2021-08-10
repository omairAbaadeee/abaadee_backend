var Jimp = require("jimp");
export function Watermark(logopath:string,imgpath:string){
    // console.log(logopath,imgpath)
    const ORIGINAL_IMAGE =imgpath;
      
    const LOGO = logopath;
    
    const LOGO_MARGIN_PERCENTAGE = 4;
    
    const FILENAME = "test.jpg";
    
    const main = async () => {
      const [image, logo] = await Promise.all([
        Jimp.read(ORIGINAL_IMAGE),
        Jimp.read(LOGO)
      ]);
    
      logo.resize(image.bitmap.width / 2, Jimp.AUTO);
    
      const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
      const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    
      const X = image.bitmap.width - logo.bitmap.width - xMargin;
      const Y = image.bitmap.height - logo.bitmap.height - yMargin;
    
      return image.composite(logo, 100, 280, [
        {
          mode: Jimp.BLEND_SCREEN,
          opacitySource: 0.8,
          opacityDest: 1
        }
      ]);
    };
    
    main().then(image => image.write(ORIGINAL_IMAGE));
}