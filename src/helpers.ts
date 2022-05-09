/* eslint-disable prefer-const */
import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { ERC20 } from '../generated/Contract/ERC20'
import { ERC20SymbolBytes } from '../generated/Contract/ERC20SymbolBytes'
import { ERC20NameBytes } from '../generated/Contract/ERC20NameBytes'
import { ChainLink } from '../generated/Contract/ChainLink'
import { AggregatorV3Interface } from '../generated/Contract/AggregatorV3Interface'
import { StaticTokenDefinition } from './staticTokenDefinition'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const OWNER_ADDRESS = '0xbddE35780e3986a47e54a580017d8213f0D2bB84'
export const REGISTRY_ADDRESS = "0x123"
export const CHAINLINK_FEED_REGISTRY_ADDRESS:Address = Address.fromString("0x449d117117838fFA61263B61dA6301AA2a88B13A")
//export const CHAINLINK_FEED_REGISTRY_ADDRESS:Address = Address.fromString("0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf")
export const CHAIN_LINK_USD_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000348")
export const CHAIN_LINK_CHF_ADDRESS = new Address(756)
export const XCHF_ADDRESS = Address.fromString("0xB4272071eCAdd69d933AdcD19cA99fe80664fc08")


export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

// rebass tokens, dont count in tracked volume
export let UNTRACKED_PAIRS: string[] = ['0x9ea3b5b4ec044b70375236a281986106457b20ef']

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000')
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  return eth.toBigDecimal().div(exponentToBigDecimal(18))
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString())
  const zero = parseFloat(ZERO_BD.toString())
  if (zero == formattedVal) {
    return true
  }
  return false
}

export function isNullEthValue(value: string): boolean {
  return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress)

  // try types string and bytes32 for symbol
  let symbolValue = 'unknown'
  let symbolResult = contract.try_symbol()
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol()
    if (!symbolResultBytes.reverted) {
      // for broken pairs that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString()
      } else {
        // try with the static definition
        let staticTokenDefinition = StaticTokenDefinition.fromAddress(tokenAddress)
        if(staticTokenDefinition != null) {
          symbolValue = staticTokenDefinition.symbol
        }
      }
    }
  } else {
    symbolValue = symbolResult.value
  }

  return symbolValue
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress)
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress)

  // try types string and bytes32 for name
  let nameValue = 'unknown'
  let nameResult = contract.try_name()
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name()
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString()
      } else {
        // try with the static definition
        let staticTokenDefinition = StaticTokenDefinition.fromAddress(tokenAddress)
        if(staticTokenDefinition != null) {
          nameValue = staticTokenDefinition.name
        }
      }
    }
  } else {
    nameValue = nameResult.value
  }

  return nameValue
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress)
  let totalSupplyValue = BigInt.fromI32(0)
  let totalSupplyResult = contract.try_totalSupply()
  if (!totalSupplyResult.reverted) {
    totalSupplyValue = totalSupplyResult.value
  }
  return totalSupplyValue
}

export function fetchTokenBalance(tokenAddress: Address, account: Address): BigInt {
  let contract = ERC20.bind(tokenAddress)
  let balanceValue = BigInt.fromI32(0)
  let balanceResult = contract.try_balanceOf(account)
  if (!balanceResult.reverted) {
    balanceValue = balanceResult.value
  }
  return balanceValue
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress)
  // try types uint8 for decimals
  let decimalValue = 0
  let decimalResult = contract.try_decimals()
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value
  } else {
    // try with the static definition
    let staticTokenDefinition = StaticTokenDefinition.fromAddress(tokenAddress)
    if(staticTokenDefinition != null) {
      return staticTokenDefinition.decimals
    }
  }

  return BigInt.fromI32(decimalValue as i32)
}

export function convertToUsd(tokenAddress: Address, value: BigDecimal): BigDecimal {
  let priceFeedRegitryContract = AggregatorV3Interface.bind(CHAINLINK_FEED_REGISTRY_ADDRESS)
  if (tokenAddress.toHexString() == XCHF_ADDRESS.toHexString()) {
   // tokenAddress = CHAIN_LINK_CHF_ADDRESS
  }
  // Returns the latest price of chf/usd pair from chainlink with 8 decimals
  let result = priceFeedRegitryContract.try_latestRoundData()
  if (!result.reverted) {
    let resultInDecimals = new BigDecimal(result.value.value1).div(BigDecimal.fromString("100000000"))
    return value.div(resultInDecimals)
  }
  log.warning('got reverted {} address: {}', [result.reverted.toString(), tokenAddress.toString()])
  return value
}

