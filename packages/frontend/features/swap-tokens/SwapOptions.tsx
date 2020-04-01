import { Box, Text, Field, Input, Button, Tooltip } from "rimble-ui";
import styled from "styled-components";

import Select from "../../components/Select";
import SwapConfirm from "./SwapConfirm";

import DACProxyContainer from "../../containers/DACProxy";
import { useState } from "react";
import CoinsContainer from "../../containers/Coins";
import useIsAmountAvailable from "./useIsAmountAvailable";

const Container = styled(Box)`
  box-shadow: 2px 2px rgba(255, 0, 0, 0.5), 1px -2px rgba(0, 0, 255, 0.5),
    -1px 0px rgba(250, 180, 40, 0.5);
`;

const SwapOptions = () => {
  const { proxy } = DACProxyContainer.useContainer();
  const { stableCoins, volatileCoins } = CoinsContainer.useContainer();

  const [thingToSwap, setThingToSwap] = useState("debt");
  const [fromTokenStr, setFromTokenStr] = useState("dai");
  const [toTokenStr, setToTokenStr] = useState("eth");
  const [amountToSwap, setAmountToSwap] = useState("");

  const { isAmountAvailable } = useIsAmountAvailable(
    amountToSwap,
    fromTokenStr,
    thingToSwap,
  );

  const disableConfirm =
    !proxy || // not connected or no smart wallet
    fromTokenStr === toTokenStr || // same token
    amountToSwap === "" || // no amount specified
    !isAmountAvailable; // amount not available

  return (
    <Container p="3">
      <Box>
        <Field label="I would like to swap" width="100%">
          <Select
            required
            onChange={e => setThingToSwap(e.target.value)}
            value={thingToSwap}
          >
            <option value="debt">Debt</option>
            <option value="collateral">Collateral</option>
          </Select>
        </Field>
      </Box>

      <Box>
        <Field label="From" width="100%">
          <Select
            required
            value={fromTokenStr}
            onChange={e => setFromTokenStr(e.target.value)}
          >
            <optgroup label="Volatile Crypto">
              {volatileCoins.map(coin => {
                const { key, name } = coin;
                return (
                  <option key={key} value={key}>
                    {name}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Stablecoin">
              {stableCoins.map(coin => {
                const { key, name } = coin;
                return (
                  <option key={key} value={key}>
                    {name}
                  </option>
                );
              })}
            </optgroup>
          </Select>
        </Field>
      </Box>

      <Box>
        <Field label="To" width="100%">
          <Select
            required
            value={toTokenStr}
            onChange={e => setToTokenStr(e.target.value)}
          >
            <optgroup label="Volatile Crypto">
              {volatileCoins.map(coin => {
                const { key, name } = coin;
                return (
                  <option key={key} value={key} disabled={key === fromTokenStr}>
                    {name}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Stablecoin">
              {stableCoins.map(coin => {
                const { key, name } = coin;
                return (
                  <option key={key} value={key} disabled={key === fromTokenStr}>
                    {name}
                  </option>
                );
              })}
            </optgroup>
          </Select>
        </Field>
      </Box>

      <Box>
        <Field label={`Amount of ${fromTokenStr.toLocaleUpperCase()} to swap`}>
          <Input
            type="number"
            required={true}
            placeholder="1337"
            value={amountToSwap}
            onChange={e => setAmountToSwap(e.target.value.toString())}
          />
        </Field>
      </Box>

      <SwapConfirm
        thingToSwap={thingToSwap}
        fromTokenStr={fromTokenStr}
        toTokenStr={toTokenStr}
        amountToSwap={amountToSwap}
        disabled={disableConfirm}
        outline={!proxy}
      />
    </Container>
  );
};
export default SwapOptions;
