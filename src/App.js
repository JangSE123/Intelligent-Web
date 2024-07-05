import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
<<<<<<< HEAD
<<<<<<< HEAD
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';
=======
import MobileApp from './mobile/MobileApp';
>>>>>>> e8c3b60 (고병현)
=======
import MobileApp from './mobile/MobileApp';
=======
import MobileMain from './mobile/MobileMain';

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
<<<<<<< HEAD
        <Header/>
=======
=======
>>>>>>> 4688eb9 (Header 추가)
<<<<<<< HEAD
        <Header />
=======
        <Header/>
>>>>>>> c20677a (feat(main))
<<<<<<< HEAD
>>>>>>> 78896dc (feat(main))
=======
=======
        <Header/>
=======
        <Header />
>>>>>>> 09b5dc5 (Header 추가)
>>>>>>> 8ab0aa7 (Header 추가)
>>>>>>> 4688eb9 (Header 추가)
=======
        <Header/>
>>>>>>> 4b32d48 (메인페이지 fix)
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
    </>
  );
}

export default App;