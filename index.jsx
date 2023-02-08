"use strict";

const Page = () => {
  const imagesLetters = {
    F: "public/files/letters/F.png",
    f: "public/files/letters/f.png",
    B: "public/files/letters/B.png",
    b: "public/files/letters/b.png",
    L: "public/files/letters/L.png",
    l: "public/files/letters/l.png",
    V: "public/files/letters/V.png",
    v: "public/files/letters/v.png",
    '{': "public/files/letters/{.png",
    '[': "public/files/letters/[.png",
    1: "public/files/letters/1.png",
    W: "public/files/letters/W.png",
    w: "public/files/letters/w.png",
    X: "public/files/letters/X.png",
    x: "public/files/letters/x.png",
    I: "public/files/letters/x.png",
    QMark: "public/files/letters/q-mark.png",
    ExMark: "public/files/letters/ex-mark.png",
  }

  const imagesKeys = {};
  const lWidth = 50;
  const lHeight = 75*(lWidth/50);

  const preloadImages = async (images, target) => {
    const sources = Object.values(images);
    const keys = Object.keys(images);
    return await Promise.allSettled(
      sources.map(
        (source, index) =>
          new Promise((resolve, reject) => {
            const img = new Image(lWidth, lHeight);
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
    x: 0,
    y: 0,
  };


  // const canvasRef = React.useRef(null);
  const ctx = document.querySelector('canvas').getContext('2d');
  
  const makeLetters = (e) => {
    console.log('letter presssed', e.key, 'code', e.code);
    // TODO переделать под key
    if (coords.x > 1200) {
      coords.x = 0;
      coords.y += lHeight;
    }

    if (coords.x < 0 && coords.y < 0) {
      coords.x = 0;
      coords.y = 0;
    }

    if (e.code == 'Space') {
      e.preventDefault();
     ctx.drawImage(imagesKeys.space, coords.x, coords.y, lWidth, lHeight);
      coords.x += lWidth;
      return;
    }


    switch(e.key) {
      case 'Shift': {
        break;
      }

      case '!': {
        ctx.drawImage(imagesKeys.ExMark, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '?': {
        console.log(imagesKeys.QMark);
        ctx.drawImage(imagesKeys.QMark, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case ':': { // Ж
        ctx.drawImage(imagesKeys.JJ, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case ';': { // ж
        ctx.drawImage(imagesKeys.jj, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      // case '.': {
      //   ctx.drawImage(imagesKeys.dot, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case ',': {
      //   ctx.drawImage(imagesKeys.comma, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case ':': {
      //   ctx.drawImage(imagesKeys.double, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case ';': {
      //   ctx.drawImage(imagesKeys.dotcomma, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case '=': {
      //   ctx.drawImage(imagesKeys.eq, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case '-': {
      //   ctx.drawImage(imagesKeys.minus, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }      
      // case '+': {
      //   ctx.drawImage(imagesKeys.plus, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case '_': {
      //   ctx.drawImage(imagesKeys.dash, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case '\"': {
      //   ctx.drawImage(imagesKeys.quote, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }

      case "Enter": {
        coords.y += lHeight;
        coords.x = 0;
        break;
      }
      case 'Backspace': {
        if (coords.y > 0 && coords.x == 0) {
          coords.y -= lHeight;
          coords.x = 1200;  
        } 
        ctx.clearRect(coords.x - lWidth, coords.y, lWidth, lHeight);
        coords.x -= lWidth;
        break;
      }

      default: {
        console.log(imagesKeys);
        console.log(imagesKeys[e.key]);
        // ctx.drawImage(imagesKeys[e.key], coords.x, coords.y, lWidth, lHeight);
        ctx.drawImage(imagesKeys[e.key], coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
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
