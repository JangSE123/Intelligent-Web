import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileMain from './mobile/MobileMain';
import MakePlan from './mobile/MakePlan';
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
      {/* <MakePlan /> */}
    </>
  );
}

export default App;
