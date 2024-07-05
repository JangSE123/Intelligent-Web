import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import Header from './browser/BrowserHeader';
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';


function App() {
  return (
    <>
      <BrowserView>
<<<<<<< HEAD
<<<<<<< HEAD
        <Header />
=======
        <Header/>
>>>>>>> c20677a (feat(main))
=======
        <Header/>
=======
        <Header />
>>>>>>> 09b5dc5 (Header 추가)
>>>>>>> 8ab0aa7 (Header 추가)
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;
