import { useState } from "react";
function App() {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState();

  return (
    <>
      <nav>
        <div className="container">
          <div className="row">
            <div className="col-6">trex</div>
            <div className="col-6 d-flex justify-content-end">
              Connect Wallet
            </div>
          </div>
        </div>
      </nav>
      <section id="main">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">Swap</div>
            <div className="col-12 justify-content-center">
              <div className="swapperWrapper">
                <div className="row">
                  <div className="col-6">ETH</div>
                  <div className="col-6 d-flex justify-content-end">0.01</div>
                  <div className="col-6">Balance</div>
                  <div className="col-6 d-flex justify-content-end">$$$</div>
                  <div className="col-12">
                    <div className="percetage">yüzdeler</div>
                  </div>
                  <div className="col-6">USDC</div>
                  <div className="col-6 d-flex justify-content-end">20.000</div>
                  <div className="col-6">Balance</div>
                  <div className="col-6 d-flex justify-content-end">$$$</div>
                  <div className="col-6">
                    1ETH = 2.091.5949 USDC ≈ $2.094.77
                  </div>
                  <div className="col-6 d-flex justify-content-end">~$0.01</div>
                </div>
              </div>
            </div>
            <div className="col-12 text-center">Button1</div>
          </div>
        </div>
        <footer>
          <div className="row">
            <div className="col-12 text-center d-flex justify-content-center">
              poweredby
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default App;
