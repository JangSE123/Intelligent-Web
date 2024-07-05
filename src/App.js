import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
<<<<<<< HEAD
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';
=======
import MobileApp from './mobile/MobileApp';
>>>>>>> e8c3b60 (고병현)

<<<<<<< HEAD

=======
>>>>>>> 8c1841e (고병현 app.js  moblieMain 2개인거 수정#2)
function App() {
  return (
    <>
      <BrowserView>
        <Header/>
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
    </>
  );
}

export default App;