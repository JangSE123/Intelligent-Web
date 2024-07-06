import { BrowserView, MobileView } from 'react-device-detect'
import MobileApp from './mobile/MobileApp';
import DesktopApp from './browser/DesktopApp';


function App() {
  return (
    <>
      <BrowserView>
        <DesktopApp />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
      {/* <MakePlan /> */}
    </>
  );
}

export default App;
