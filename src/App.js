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
<<<<<<< HEAD
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
=======
=======
>>>>>>> acdd4b8 (feat(main))
        <Header/>
=======
        <Header />
>>>>>>> 8874dd3 (Header 추가)
<<<<<<< HEAD
>>>>>>> 1586e8b (Header 추가)
=======
=======
        <Header />
=======
        <Header/>
>>>>>>> c20677a (feat(main))
>>>>>>> 33ac7f4 (feat(main))
>>>>>>> acdd4b8 (feat(main))
=======
        <Header/>
>>>>>>> 9041ac6 (메인페이지 수정)
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;