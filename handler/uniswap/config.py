import json

class UniswapConfig:
    def __init__(self):
        self.rpc_url = "https://base.llamarpc.com"
        self.factory_contract = "0x33128a8fC17869897dcE68Ed026d694621f6FDfD"
        self.fee_tiers = [100, 500, 3000, 10000]
        self.uniswap_factory_abi = self.get_uniswap_factory_abi()
        self.uniswap_pool_abi = self.get_uniswap_pool_abi()

    def get_uniswap_factory_abi(self):
        with open("./json/uniswap_factory_abi.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        return data
    
    def get_uniswap_pool_abi(self):
        with open("./json/uniswap_pool_abi.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        return data