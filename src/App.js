import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileApp from './mobile/MobileApp';

function App() {
  return (
    <>
      <BrowserView>
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
    </>
  );
}

export default App;
