from web3 import Web3

from decimal import Decimal, getcontext
getcontext().prec = 50

from config import UniswapConfig

class UniswapHandler:
    def __init__(self):
        self.uniswap_config = UniswapConfig()
        self.web3 = Web3(Web3.HTTPProvider(self.uniswap_config.rpc_url))

    def findPool(self, token1Address, token2Address):
        contract = self.web3.eth.contract(
            address=Web3.to_checksum_address(self.uniswap_config.factory_contract),
            abi=self.uniswap_config.uniswap_factory_abi
        )

        for fee in self.uniswap_config.fee_tiers:
            try:
                pool_address = contract.functions.getPool(
                    token1Address,
                    token2Address,
                    fee
                ).call()

                if int(pool_address, 16) != 0:
                    return pool_address

            except Exception as e:
                print(f"{e}")

        print("There is no pool")
        return None
    
    def get_price(self, pool_address, token1_decimals, token2_decimals):
        pool = self.web3.eth.contract(
            address=Web3.to_checksum_address(pool_address),
            abi=self.uniswap_config.pool_abi
        )

        try:
            slot0 = pool.functions.slot0().call()
            sqrt_price_x96 = slot0[0]

            sqrtP = Decimal(sqrt_price_x96) / (2 ** 96)

            price = sqrtP ** 2

            adjusted_price = price * Decimal(10 ** token1_decimals) / Decimal(10 ** token2_decimals)

            return float(adjusted_price)

        except Exception as e:
            return None

    def get_max_amount_of_pool(self, pool_address, token1_decimals, price_change_bps=50):
        pool = self.web3.eth.contract(address=Web3.to_checksum_address(pool_address), abi=self.uniswap_config.pool_abi)

        try:
            liquidity = pool.functions.liquidity().call()
            slot0 = pool.functions.slot0().call()
            sqrt_price_x96 = slot0[0]
            tick_current = slot0[1]

            tick_spacing = pool.functions.tickSpacing().call()

            tick_lower = tick_current - (tick_current % tick_spacing)
            tick_upper = tick_lower + tick_spacing

            tick_data_lower = pool.functions.ticks(tick_lower).call()
            tick_data_upper = pool.functions.ticks(tick_upper).call()

            liquidity_decimal = Decimal(liquidity)
            sqrtP = Decimal(sqrt_price_x96) / (2 ** 96)
            delta = sqrtP * Decimal(price_change_bps) / Decimal(10000)
            sqrtP_next = sqrtP + delta
            max_token1_raw = liquidity_decimal * (sqrtP_next - sqrtP)

            max_token1_human = max_token1_raw / Decimal(10 ** token1_decimals)

            return float(max_token1_human)

        except Exception as e:
            print(f"❌ Hata oluştu: {e}")