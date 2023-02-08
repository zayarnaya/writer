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
    Q: "public/files/letters/Q.png",
    q: "public/files/letters/q.png",
    E: "public/files/letters/E.png",
    e: "public/files/letters/e.png",
    R: "public/files/letters/R.png",
    r: "public/files/letters/r.png",
    T: "public/files/letters/T.png",
    t: "public/files/letters/t.png",
    Y: "public/files/letters/Y.png",
    y: "public/files/letters/y.png",
    U: "public/files/letters/U.png",
    u: "public/files/letters/u.png",
    I: "public/files/letters/I.png",
    i: "public/files/letters/i.png",
    O: "public/files/letters/O.png",
    o: "public/files/letters/o.png",
    P: "public/files/letters/P.png",
    p: "public/files/letters/p.png",
    ']': "public/files/letters/].png",
    A: "public/files/letters/A.png",
    a: "public/files/letters/a.png",
    S: "public/files/letters/S.png",
    s: "public/files/letters/s.png",
    D: "public/files/letters/D.png",
    d: "public/files/letters/d.png",
    G: "public/files/letters/G.png",
    g: "public/files/letters/g.png",
    H: "public/files/letters/H.png",
    h: "public/files/letters/h.png",
    J: "public/files/letters/J.png",
    j: "public/files/letters/j.png",
    K: "public/files/letters/K.png",
    k: "public/files/letters/k.png",
    L: "public/files/letters/L.png",
    l: "public/files/letters/l.png",
    Z: "public/files/letters/Z.png",
    z: "public/files/letters/z.png",
    C: "public/files/letters/C.png",
    c: "public/files/letters/c.png",
    N: "public/files/letters/N.png",
    n: "public/files/letters/n.png",
    m: "public/files/letters/m.png",
    yy: "public/files/letters/yy.png",
    '\>': "public/files/letters/>.png",
    '\,': "public/files/letters/,.png",
    '\<': "public/files/letters/<.png",
    '\~': "public/files/letters/~.png",
    '\`': "public/files/letters/`.png",


    1: "public/files/letters/1.png",
    2: "public/files/letters/2.png",
    3: "public/files/letters/3.png",
    4: "public/files/letters/4.png",
    5: "public/files/letters/5.png",
    6: "public/files/letters/6.png",
    7: "public/files/letters/7.png",
    8: "public/files/letters/8.png",
    9: "public/files/letters/9.png",
    W: "public/files/letters/W.png",
    w: "public/files/letters/w.png",
    X: "public/files/letters/X.png",
    x: "public/files/letters/x.png",
    I: "public/files/letters/I.png",
    i: "public/files/letters/i.png",
    QMark: "public/files/letters/q-mark.png",
    ExMark: "public/files/letters/ex-mark.png",
    eq: "public/files/letters/eq.png",
    space: "public/files/letters/space.png",
    comma: "public/files/letters/comma.png",
    dot: "public/files/letters/dot.png",
    dotcomma: "public/files/letters/dotcomma.png",
    dash: "public/files/letters/dash.png",
    // plus: "public/files/letters/plus.png",
    // minus: "public/files/letters/minus.png",
    double: "public/files/letters/double.png",
    // quote: "public/files/letters/quote.png",
    JJ: "public/files/letters/JJ.png",
    jj: "public/files/letters/jj.png",
    EE: "public/files/letters/EE.png",
    ee: "public/files/letters/ee.png",
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
    e.preventDefault();
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
      case 'Shift':
      case 'Control': {
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
      case '\"': { // Ж
        ctx.drawImage(imagesKeys.EE, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '\'': { // ж
        ctx.drawImage(imagesKeys.ee, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      // case '.': {
      //   ctx.drawImage(imagesKeys.dot, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      case '<': { // Б
        ctx.drawImage(imagesKeys['\<'], coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '\,': { // б

        ctx.drawImage(imagesKeys['\,'], coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '\>': { // Ю
        ctx.drawImage(imagesKeys['\>'], coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '\.': { // ю
        ctx.drawImage(imagesKeys.yy, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '\~': { // Ё
        ctx.drawImage(imagesKeys['\~'], coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '\`': { // ё
        ctx.drawImage(imagesKeys['\`'], coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      // case ',': { // shift 6
      //   ctx.drawImage(imagesKeys.comma, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case ':': { // shift 5
      //   ctx.drawImage(imagesKeys.double, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      // case ';': { // shift 4
      //   ctx.drawImage(imagesKeys.dotcomma, coords.x, coords.y, lWidth, lHeight);
      //   coords.x += lWidth;
      //   break;
      // }
      case '=': {
        ctx.drawImage(imagesKeys.eq, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '-': {
        ctx.drawImage(imagesKeys.minus, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }      
      case '+': {
        ctx.drawImage(imagesKeys.plus, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      case '_': {
        ctx.drawImage(imagesKeys.dash, coords.x, coords.y, lWidth, lHeight);
        coords.x += lWidth;
        break;
      }
      // case '\"': { // shift 2
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
