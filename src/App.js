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
        <Header />
=======
        <Header/>
>>>>>>> c20677a (feat(main))
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;
