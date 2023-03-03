/* @refresh reload */
import { Drizzle, generateStore } from "@drizzle/store";
import { render } from 'solid-js/web';
import SupplyChain from "./contracts/SupplyChain.json";

import App from './App';
import './index.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

const options = {
  contracts: [
    SupplyChain
  ]
}

const drizzleStore = generateStore(options)
const drizzle = new Drizzle(options, drizzleStore)

render(() => <App drizzle={drizzle} />, root!);
