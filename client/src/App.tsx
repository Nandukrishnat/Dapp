import { Component, createSignal, onCleanup, onMount, Show } from 'solid-js';
import { Drizzle } from "@drizzle/store"

const App: Component<{ drizzle: Drizzle }> = ({ drizzle }) => {


  const [state, setState] = createSignal({})
  const [loaded, setLoaded] = createSignal(false);

  const [count, setCount] = createSignal(0)
  const [data, setData] = createSignal(0)

  onMount(() => {

    setState(drizzle.store.getState())

    if (state().drizzleStatus.initialized) {
      setLoaded(true)
    }

    console.log(state().drizzleStatus.initialized)

  })

  function retrieve() {
    const dataKey =
      drizzle
        .contracts
        .SupplyChain
        .methods
        .retrieve
        .cacheCall()

    setCount(
      drizzle
        .store
        .getState()
        .contracts
        .SupplyChain
        .retrieve[dataKey]
        .value
    );
  }

  function store() {

    const stackId = drizzle.contracts.SupplyChain.methods.store.cacheSend(data(), { from: '0xad772a97E1d41C24B88c46B462D2970F438b02ee' })

    // Use the stackId to display the transaction status.
    if (state().transactionStack[stackId]) {
      const txHash = state().transactionStack[stackId]

      console.log(state().transactions[txHash].status)
    }

  }

  return (
    <Show when={loaded()} fallback={<div>Loading</div>}>

      <div>
        <div>The data retived is {count()}</div>
        <button onClick={retrieve}>
          Retrieve Data
        </button>
      </div>

      <div>
        <input type='number' onKeyUp={(e) => setData(data => Number(data + e.key))} />
        <button onClick={store}>
          Write
        </button>
      </div>

    </Show >
  )
};

export default App;
