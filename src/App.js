import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import Header from './browser/BrowserHeader';
import MobileMain from './mobile/MobileMain';


function App() {
  return (
    <>
      <BrowserView>
        <Header />
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;
