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
        <Header/>
=======
        <Header />
>>>>>>> 8874dd3 (Header 추가)
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
    </>
  );
}

export default App;