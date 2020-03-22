import { Card, Flex, Box, Heading, Button, Text } from "rimble-ui";
import ProxiesContainer from "../containers/Proxies";
import EthersContainer from "../containers/Ethers";

const Proxy = ({ address, makeProxy }) => {
  const EMPTY_ADDR = "0x0000000000000000000000000000000000000000";
  if (address === EMPTY_ADDR) {
    return (
      <div>
        <Text>Proxy not found</Text>
        <Button.Text size="small" onClick={makeProxy}>
          + Create Proxy
        </Button.Text>
      </div>
    );
  }
  return (
    <div>
      <pre>{address}</pre>
    </div>
  );
};

const Proxies = () => {
  const { signer } = EthersContainer.useContainer();
  const {
    makerProxyAddr,
    makeMakerProxy,
    dedgeProxyAddr,
    makeDedgeProxy,
    getProxyAddresses,
  } = ProxiesContainer.useContainer();

  return (
    <Card>
      <Heading as="h2">Proxies{signer && <Button.Text size="small" onClick={getProxyAddresses}>refresh</Button.Text>}</Heading>

      <Heading as="h4">MakerDAO</Heading>
      <Proxy address={makerProxyAddr} makeProxy={makeMakerProxy} />

      <Heading as="h4">Dedge</Heading>
      <Proxy address={dedgeProxyAddr} makeProxy={makeDedgeProxy} />
    </Card>
  );
};

export default Proxies;
