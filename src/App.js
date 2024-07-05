import { BrowserView, MobileView } from 'react-device-detect'
import DesktopMain from './browser/DesktopMain';
import MobileMain from './mobile/MobileMain';
import MakePlan from './mobile/MakePlan';

function App() {
  return (
    <>
      <BrowserView>
        <DesktopMain />
      </BrowserView>
      <MobileView>
        <MobileMain />
      </MobileView>
      {/* <MakePlan /> */}
    </>
  );
}

export default App;
