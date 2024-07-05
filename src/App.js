import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';


function App() {
  return (
    <>
      <BrowserView>
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
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;