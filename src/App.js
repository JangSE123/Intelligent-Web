import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';

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
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;