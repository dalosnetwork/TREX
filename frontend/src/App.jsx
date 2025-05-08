// @ts-check
import { useState } from "react";
import logo from "./design/assets/logo.png";
import Button1 from "./components/button1";
import React from "react";
import Icon from "./components/iconManager";
import dalos from "./design/assets/dalos_logotype_yatay_açıkrenkli 1.svg";
import { aggregate } from "./services/api";
import { useViewport } from "./hooks/useViewport";

function App() {
  const tokens = [
    {
      name: "ETH",
      address: "",
      img: "https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg",
    },
    {
      name: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s",
    },
    {
      name: "USDT",
      address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
      img: "https://images.seeklogo.com/logo-png/32/1/tether-usdt-logo-png_seeklogo-323175.png",
    },
    {
      name: "LINK",
      address: "0x1D9328F2713E8b4EFca304093D53fcC2c068B7Cd",
      img: "https://s2.coinmarketcap.com/static/img/coins/200x200/1975.png",
    },
  ];

  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState("");

  const handleSwap = () => {
    let token1 = fromToken;
    setFromToken(toToken);
    setToToken(token1);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewport = useViewport();

  const handleFinishSwap = async () => {
    try {
      const data = await aggregate(fromToken.address, "1", toToken.address);
      if (data) {
        console.log(data);
      } else {
        console.log("Failed to update transaction status");
      }
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  return (
    <>
      <section id="main">
        <div>
          <nav>
            <div className="container">
              <div className="row">
                <div className="col-auto my-auto ">
                  <img
                    className="logo me-3"
                    style={{ width: "48px" }}
                    src={logo}
                    alt=""
                  />
                  <span className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={viewport != "mobile" ? "160" : "100"}
                      height="31"
                      viewBox="0 0 160 31"
                      fill="none"
                    >
                      <path
                        d="M8.42105 30.5V4.78571H0V0.5H25.2632V4.78571H16.8421V30.5H8.42105Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M33.6842 17.6429V13.3571H58.9474V17.6429H33.6842Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M63.1579 30.5V0.5H88.4211V4.78571H92.6316V17.6429H84.2105V21.9286H88.4211V26.2143H92.6316V30.5H80V26.2143H75.7895V21.9286H71.5789V30.5H63.1579ZM71.5789 17.6429H80V13.3571H84.2105V4.78571H71.5789V17.6429Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M101.053 30.5V26.2143H96.8421V13.3571H101.053V9.07143H122.105V13.3571H126.316V21.9286H105.263V26.2143H122.105V30.5H101.053ZM105.263 17.6429H117.895V13.3571H105.263V17.6429Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M130.526 30.5V26.2143H134.737V21.9286H138.947V17.6429H134.737V13.3571H130.526V9.07143H138.947V13.3571H143.158V17.6429H147.368V13.3571H151.579V9.07143H160V13.3571H155.789V17.6429H151.579V21.9286H155.789V26.2143H160V30.5H151.579V26.2143H147.368V21.9286H143.158V26.2143H138.947V30.5H130.526Z"
                        fill="#FCFCFC"
                      />
                    </svg>
                  </span>
                </div>
                <div className="col my-auto  d-flex justify-content-end">
                  <Button1
                    onClick={undefined}
                    label={`Connect ${viewport != "mobile" ? "Wallet" : ""}`}
                    className={""}
                    iconName={undefined}
                    img={undefined}
                    imgClass={undefined}
                    style={viewport != "mobile" ? {} : { width: "150px" }}
                    id={undefined}
                  />
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div
                className="col-12 text-center title1"
                style={{ marginBottom: "24px" }}
              >
                Swap
              </div>
              <div className="col-12 d-flex justify-content-center">
                <div className="swapWrapper">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="row">
                        <div className="col-auto my-auto  ">
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src={fromToken.img}
                                style={{
                                  borderRadius: "50%",
                                  width: "24px",
                                  marginTop: "2px",
                                  marginRight: "12px",
                                }}
                                className="tokenLogo"
                                alt=""
                              />
                              {fromToken.name}
                            </button>
                            <ul className="dropdown-menu">
                              <li className="dropdown-item search d-flex align-items-center">
                                <Icon name="search" className="me-2" />
                                <input
                                  type="text"
                                  placeholder="Search"
                                  maxLength={10}
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  className="form-control form-control-sm"
                                />
                              </li>

                              <div className="list">
                                <div className="list-inner">
                                  {filteredTokens.map((token, idx) => (
                                    <li
                                      key={idx}
                                      onClick={() => setFromToken(token)}
                                    >
                                      <span className="dropdown-item d-flex align-items-center">
                                        <img
                                          src={token.img}
                                          alt={token.name}
                                          className="tokenLogo"
                                          style={{
                                            borderRadius: "50%",
                                            width: "24px",
                                            marginTop: "-5px",
                                            marginRight: "8px",
                                          }}
                                        />
                                        {token.name}
                                      </span>
                                    </li>
                                  ))}
                                </div>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div className="col my-auto d-flex justify-content-end title2">
                          0.01
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="row">
                        <div className="col-6 my-auto text1">Balance:--</div>
                        <div className="col-6 my-auto d-flex justify-content-end text2">
                          ~$20.95
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3 d-flex justify-content-center">
                      <div className="row w-100">
                        <div className="col p-0">
                          <Button1
                            onClick={() => setAmount("25%")}
                            label={"25%"}
                            className={`percentage first ${
                              amount === "25%" && "active"
                            }`}
                            iconName={undefined}
                            img={undefined}
                            imgClass={undefined}
                            style={undefined}
                            id={undefined}
                          />
                        </div>
                        <div className="col p-0">
                          <Button1
                            onClick={() => setAmount("50%")}
                            label={"50%"}
                            className={`percentage ${
                              amount === "50%" && "active"
                            }`}
                            iconName={undefined}
                            img={undefined}
                            imgClass={undefined}
                            style={undefined}
                            id={undefined}
                          />
                        </div>
                        <div className="col p-0">
                          <Button1
                            onClick={() => setAmount("75%")}
                            label={"75%"}
                            className={`percentage ${
                              amount === "75%" && "active"
                            }`}
                            iconName={undefined}
                            img={undefined}
                            imgClass={undefined}
                            style={undefined}
                            id={undefined}
                          />
                        </div>
                        <div className="col p-0">
                          <Button1
                            onClick={() => setAmount("100%")}
                            label={"100%"}
                            className={`percentage last ${
                              amount === "100%" && "active"
                            }`}
                            iconName={undefined}
                            img={undefined}
                            imgClass={undefined}
                            style={undefined}
                            id={undefined}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3 mb-md-0 d-flex justify-content-center">
                      <Button1
                        onClick={() => handleSwap()}
                        label={""}
                        className={"swap"}
                        iconName={"swap"}
                        img={undefined}
                        imgClass={undefined}
                        style={undefined}
                        id={undefined}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <div className="row">
                        <div className="col-auto my-auto">
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img
                                src={toToken.img}
                                style={{
                                  borderRadius: "50%",
                                  width: "24px",
                                  marginTop: "2px",
                                  marginRight: "8px",
                                }}
                                className="tokenLogo"
                                alt=""
                              />
                              {toToken.name}
                            </button>
                            <ul className="dropdown-menu">
                              <li className="dropdown-item search d-flex align-items-center">
                                <Icon name="search" className="me-2" />
                                <input
                                  type="text"
                                  placeholder="Search"
                                  maxLength={10}
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  className="form-control form-control-sm"
                                />
                              </li>

                              <div className="list">
                                <div className="list-inner">
                                  {filteredTokens.map((token, idx) => (
                                    <li
                                      key={idx}
                                      onClick={() => setToToken(token)}
                                    >
                                      <span className="dropdown-item d-flex align-items-center">
                                        <img
                                          src={token.img}
                                          alt={token.name}
                                          className="tokenLogo"
                                          style={{
                                            borderRadius: "50%",
                                            width: "24px",
                                            marginTop: "-5px",
                                            marginRight: "12px",
                                          }}
                                        />
                                        {token.name}
                                      </span>
                                    </li>
                                  ))}
                                </div>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div className="col my-auto d-flex justify-content-end title2">
                          20.9159
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="row">
                        <div className="col-6 my-auto text1">Balance:--</div>
                        <div className="col-6 my-auto d-flex justify-content-end text2">
                          <span className="textRed me-2">(-.16%)</span> ~$20.95
                        </div>
                      </div>
                    </div>
                    <div className="col text2">
                      1ETH = 2.091.5949 USDC ≈ $2.094.77
                    </div>
                    <div className="col-auto d-flex justify-content-end text2 ">
                      <Icon name={"gas"} /> ~$0.01
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-4">
                <Button1
                  onClick={() => handleFinishSwap()}
                  label={"Swap"}
                  className={""}
                  iconName={undefined}
                  img={undefined}
                  imgClass={undefined}
                  style={undefined}
                  id={undefined}
                />
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="row">
            <div className="col-12 text2 text-center d-flex justify-content-center">
              poweredby
            </div>
            <div className="col-12 d-flex justify-content-center">
              <img src={dalos} alt="" />
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default App;
