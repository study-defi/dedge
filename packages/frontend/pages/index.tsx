import { BaseStyles, theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";

import EthersContainer from "../containers/Ethers";
import ContractsContainer from "../containers/Contracts";
import ProxiesContainer from "../containers/Proxies";

import Connect from "../components/Connect";
import Proxies from "../components/Proxies";
import Vaults from "../components/Vaults";
import CompoundPosition from "../components/CompoundPosition";

const App = () => (
  <EthersContainer.Provider>
    <ContractsContainer.Provider>
      <ProxiesContainer.Provider>
        <Connect />
        <Proxies />
        <Vaults />
        <CompoundPosition />
      </ProxiesContainer.Provider>
    </ContractsContainer.Provider>
  </EthersContainer.Provider>
);

const customTheme = { ...theme };

const Home = () => (
  <ThemeProvider theme={customTheme}>
    <BaseStyles>
      <App />
    </BaseStyles>
  </ThemeProvider>
);

export default Home;
