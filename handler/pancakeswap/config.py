import json

class PancakeswapConfig:
    def __init__(self):
        self.rpc_url = "https://base.llamarpc.com"
        self.factory_contract = "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865"
        self.fee_tiers = [100, 500, 3000, 10000]
        self.pancakeswap_factory_abi = self.get_pancakeswap_factory_abi()
        self.pancakeswap_pool_abi = self.get_pancakeswap_pool_abi()

    def get_pancakeswap_factory_abi(self):
        with open("./json/pancakeswap_factory_abi.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        return data
    
    def get_pancakeswap_pool_abi(self):
        with open("./json/pancakeswap_pool_abi.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        return data