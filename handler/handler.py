from web3 import Web3
import pancakeswap.handler
import uniswap, pancakeswap

class TREXHandler:
    def __init__(self):
        self.Uniswap = uniswap.handler.UniswapHandler()
        self.Pancakeswap = pancakeswap.handler.PancakeswapHandler()
        self.DEXList = [self.Uniswap, self.Pancakeswap]

    @staticmethod
    def get_token_decimals(rpc_url, token_address):
        abi = [{"constant": True, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8"}], "type": "function"}]
        web3 = Web3(Web3.HTTPProvider(rpc_url))
        token = web3.eth.contract(address=Web3.to_checksum_address(token_address), abi=abi)
        return token.functions.decimals().call()

    def get_price_list(self, token1Address, token2Address):
        price_list = []

        token1_decimals = self.get_token_decimals(token1Address)
        token2_decimals = self.get_token_decimals(token2Address)

        for dex in self.DEXList:
            pool_address = dex.findPool(token1Address, token2Address)
            if pool_address:
                price = dex.get_price(pool_address, token1_decimals, token2_decimals)
                if price is not None:
                    price_list.append((dex, price))

        sorted_price_list = sorted(price_list, key=lambda x: x[1], reverse=True)

        sorted_dex_list = [dex for dex, _ in sorted_price_list]

        return sorted_dex_list


    def aggregate(self, token1Address, token1Amount, token2Address):
        DEXList = self.get_price_list

        data = {}

        amount_left = token1Amount

        for dex in DEXList:
            pool_address = dex.findPool(token1Address, token2Address)

            max_amount = dex.get_max_amount_of_pool(pool_address)

            if amount_left - max_amount < 0:
                data[pool_address] += max_amount
                
                return data
            else:
                data[pool_address] += max_amount
                amount_left -= max_amount

        if amount_left > 0:
            data[list(data.keys())[0]] += amount_left

        return data