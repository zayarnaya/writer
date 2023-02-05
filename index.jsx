"use strict";

const Page = () => {
  const imagesLetters = {
    Fcap: "public/files/letters/F.png",
    f: "public/files/letters/f.png",
    Bcap: "public/files/letters/B.png",
    b: "public/files/letters/b.png",
    Lcap: "public/files/letters/L.png",
    l: "public/files/letters/l.png",
    Vcap: "public/files/letters/V.png",
    v: "public/files/letters/v.png",
    QMark: "public/files/letters/q-mark.png",
    ExMark: "public/files/letters/ex-mark.png",
  }

  const imagesKeys = {};

  const preloadImages = (images, target) => {
    const sources = Object.values(images);
    const keys = Object.keys(images);
    return Promise.allSettled(
      sources.map(
        (source, index) =>
          new Promise((resolve, reject) => {
            const img = new Image(100, 120);
            img.src = source;
            Object.assign(target, { [keys[index]]: img });
            img.onload = () => resolve(img);
            img.onerror = (event) => reject(event);
          }),
      ),
    ).catch((error) => {
      console.log(error.message); // сделать единый блок демонстрации ошибок?
    });
  }

  const [isImgLoaded, setImgLoaded] = React.useState(false);
  const [isListenerSet, setListenerSet] = React.useState(false);

  const coords = {
    x: 10,
    y: 0,
  };

  const canvasRef = React.useRef(null);
  const ctx = document.querySelector('canvas').getContext('2d');
  
  const makeLetters = (e) => {
    console.log('letter presssed', e.key);
    switch(e.key) {
      case 'F': {
        console.log(imagesKeys.Fcap, coords);
        ctx.drawImage(imagesKeys.Fcap, coords.x, coords.y, 100, 120);
        coords.x += 100;
        break;
      }
      case 'f':{
        console.log(imagesKeys);
        ctx.drawImage(imagesKeys.f, coords.x, coords.y + 60, 100, 60);
        coords.x += 100;
        break;
      }
      case 'B':{
        ctx.drawImage(imagesKeys.Bcap, coords.x, coords.y, 100, 120);
        coords.x += 100;
        break;}
      case 'b':{
        ctx.drawImage(imagesKeys.b, coords.x, coords.y + 60, 100, 60);
        coords.x += 100;
        break;}
      case 'L':{
        ctx.drawImage(imagesKeys.Lcap, coords.x, coords.y, 100, 120);
        coords.x += 100;
        break;}
      case 'l':{
        ctx.drawImage(imagesKeys.l, coords.x, coords.y + 60, 100, 60);
        coords.x += 100;
        break;}
      case 'V':{
        ctx.drawImage(imagesKeys.Vcap, coords.x, coords.y, 100, 120);
        coords.x += 100;
        break;}
      case 'v':{
        ctx.drawImage(imagesKeys.v, coords.x, coords.y + 60, 100, 60);
        coords.x += 100;
        break;}
      case 'Backspace': {
        ctx.clearRect(coords.x - 100, 0, 100, 700);
        coords.x -= 100;
        break;
      }
      case '!': {
        ctx.drawImage(imagesKeys.ExMark, coords.x, coords.y + 60, 100, 60);
        coords.x += 100;
        break;
      }
      case '?': {
        ctx.drawImage(imagesKeys.QMark, coords.x, coords.y + 60, 100, 60);
        coords.x += 100;
        break;
      }
                                                        
    }
  }

  React.useEffect(() => {
    if (!isListenerSet) {
      document.addEventListener('keydown', makeLetters);
      setListenerSet(true);
    } else {
      console.log('листенер включен');
    }

    if (!isImgLoaded) {
      console.log('loading images');
      preloadImages(imagesLetters, imagesKeys).then(() => setImgLoaded(true));
    } else {
      console.log('loaded');
    }
  }, [isListenerSet, setListenerSet, isImgLoaded, setImgLoaded]);


  // return (
  //   <main className='writer-main'>
  //   <canvas ref={canvasRef} className="writer-canvas" width="100%" height="100%" ></canvas>
  // </main>
  // )
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
