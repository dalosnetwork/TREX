// @ts-check
import { useState } from "react";
import logo from "./design/assets/logo.png";
import Button1 from "./components/button1";
import React from "react";

function App() {
  const [fromToken, setFromToken] = useState({name:""});
  const [toToken, setToToken] = useState({name:""});
  const [amount, setAmount] = useState();
  const tokens = [{ name: "ETH", address: "qweqwe", img: "idk" }];

  return (
    <>
      <section id="main">
        <nav>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img className="logo" src={logo} alt="" />
                <span>T-Rex</span>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <Button1 onClick={undefined} label={"Connect Wallet"} className={undefined} iconName={undefined} img={undefined} imgClass={undefined} style={undefined} id={undefined} />
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">Swap</div>
            <div className="col-12 justify-content-center">
              <div className="swapperWrapper">
                <div className="row">
                  <div className="col-6">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {fromToken.name}
                      </button>
                      <ul className="dropdown-menu">
                        {tokens.map((token, index) => (
                          <li key={index} onClick={() => setFromToken(token)}>
                            <a className="dropdown-item" href="#">
                              {token.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-end">0.01</div>
                  <div className="col-6">Balance:--</div>
                  <div className="col-6 d-flex justify-content-end">$$$</div>
                  <div className="col-12">
                    <div className="percetage">yüzdeler</div>
                  </div>
                  <div className="col-6">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {toToken.name}
                      </button>
                      <ul className="dropdown-menu">
                        {tokens.map((token, index) => (
                          <li key={index} onClick={() => setToToken(token)}>
                            <a className="dropdown-item" href="#">
                              {token.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-end">20.000</div>
                  <div className="col-6">Balance:--</div>
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
