import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';
=======
import MobileApp from './mobile/MobileApp';
>>>>>>> e8c3b60 (고병현)
=======
=======
>>>>>>> 8874dd3 (Header 추가)
import MobileApp from './mobile/MobileApp';
=======
=======
import Header from './browser/BrowserHeader';
>>>>>>> 09b5dc5 (Header 추가)
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';

>>>>>>> e99a4de (.)
>>>>>>> cbf3914 (.)

<<<<<<< HEAD

=======
>>>>>>> 8c1841e (고병현 app.js  moblieMain 2개인거 수정#2)
function App() {
  return (
    <>
      <BrowserView>
<<<<<<< HEAD
<<<<<<< HEAD
        <Header/>
=======
        <Header />
>>>>>>> 8874dd3 (Header 추가)
=======
        <Header />
=======
        <Header/>
>>>>>>> c20677a (feat(main))
>>>>>>> 33ac7f4 (feat(main))
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
    </>
  );
}

export default App;