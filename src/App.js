import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileMain from './mobile/MobileMain';

function App() {
  return (
    <>
      <BrowserView>
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
    </>
  );
}

export default App;
