import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileMain from './mobile/MobileMain';
import Header from './browser/BrowserHeader';


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