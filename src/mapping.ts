import { Address, BigDecimal, log} from "@graphprotocol/graph-ts"
import {
  Contract,
  OwnershipTransferred,
  Trade
} from "../generated/Contract/Contract"
import {   
  Registry,
  Market,
  Token,
  Transaction,
  Swap as SwapEvent 
} from "../generated/schema"
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchTokenTotalSupply,
  fetchTokenBalance,
  ZERO_BD,
  ZERO_BI,
  ONE_BI,
  convertTokenToDecimal,
  convertToUsd,
  REGISTRY_ADDRESS,
  OWNER_ADDRESS,
  ONE_BD
} from './helpers'
/*
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
  //  entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.base(...)
  // - contract.buyingEnabled(...)
  // - contract.copyright(...)
  // - contract.driftIncrement(...)
  // - contract.driftStart(...)
  // - contract.getBuyPrice(...)
  // - contract.getLicenseFee(...)
  // - contract.getPrice(...)
  // - contract.getPriceAtTime(...)
  // - contract.getSellPrice(...)
  // - contract.getShares(...)
  // - contract.hasDrift(...)
  // - contract.increment(...)
  // - contract.onTokenTransfer(...)
  // - contract.owner(...)
  // - contract.paymenthub(...)
  // - contract.sellingEnabled(...)
  // - contract.settings(...)
  // - contract.timeToDrift(...)
  // - contract.token(...)
}
*/
export function handleTrade(event: Trade): void {
  let registry = Registry.load(REGISTRY_ADDRESS)
  if (registry === null) {
    registry = new Registry(REGISTRY_ADDRESS)
    registry.owner = OWNER_ADDRESS
    registry.marketCount = ZERO_BI
    registry.txCount = ZERO_BI
    registry.totalValueLockedUSD = ZERO_BD
    registry.totalValueLockedXCHF = ZERO_BD
    registry.totalVolumeUSD = ZERO_BD
    registry.totalVolumeXCHF = ZERO_BD
  }
  const MARKET_ADDRESS = event.address.toHexString()
  log.warning("market address: {} ", [MARKET_ADDRESS])
  let market = Market.load(MARKET_ADDRESS)
  if (market === null) {
    market = new Market(MARKET_ADDRESS)
    market.base = event.params.base.toHexString()
    market.token = event.params.token.toHexString()
    registry.marketCount = registry.marketCount.plus(ONE_BI)

  }
  //create the tokens
  let base = Token.load(market.base)
  let token = Token.load(market.token)

  //fetch info if null
  if (base === null) {
    base = new Token(event.params.base.toHexString())
    base.symbol = fetchTokenSymbol(event.params.base)
    base.name = fetchTokenName(event.params.base)
    base.totalSupply = fetchTokenTotalSupply(event.params.base)
    base.decimals = fetchTokenDecimals(event.params.base)

    base.derivedETH = ZERO_BD
    base.tradeVolume = ZERO_BD
    base.tradeVolumeUSD = ZERO_BD
    base.totalValueLocked = ZERO_BD
    base.txCount = ZERO_BI
  }

  //fetch info if null
  if (token === null) {
    token = new Token(event.params.token.toHexString())
    token.symbol = fetchTokenSymbol(event.params.token)
    token.name = fetchTokenName(event.params.token)
    token.totalSupply = fetchTokenTotalSupply(event.params.token)
    token.decimals = fetchTokenDecimals(event.params.token)

    token.derivedETH = ZERO_BD
    token.tradeVolume = ZERO_BD
    token.tradeVolumeUSD = ZERO_BD
    token.totalValueLocked = ZERO_BD
    token.txCount = ZERO_BI
  }
  
  let amountBase = convertTokenToDecimal(event.params.totPrice, base.decimals)
  let amountToken = convertTokenToDecimal(event.params.amount.abs(), token.decimals)
  let amountUSD = convertToUsd(event.params.base, amountBase)

  // reset total liquidity amounts
  base.totalValueLocked = base.totalValueLocked.minus(market.reserveBase)
  token.totalValueLocked = token.totalValueLocked.minus(market.reserveToken)
  registry.totalValueLockedXCHF = registry.totalValueLockedXCHF.minus(market.totalValueLockedXCHF)

  // get current market balance
  let marketBaseBalance  = convertTokenToDecimal(fetchTokenBalance(event.params.base, Address.fromString(MARKET_ADDRESS)), base.decimals)
  let marketTokenBalance = convertTokenToDecimal(fetchTokenBalance(event.params.token, Address.fromString(MARKET_ADDRESS)), token.decimals)

  // update base global volume and token liquidity stats
  base.tradeVolume = base.tradeVolume.plus(amountBase)
  base.tradeVolumeUSD = base.tradeVolumeUSD.plus(amountUSD)
  base.totalValueLocked = base.totalValueLocked.plus(marketBaseBalance)
  base.totalValueLockedUSD = convertToUsd(event.params.base, base.totalValueLocked)

  // update token global volume and token liquidity stats
  token.tradeVolume = token.tradeVolume.plus(amountToken)
  token.tradeVolumeUSD = base.tradeVolumeUSD.plus(amountUSD)
  token.totalValueLocked = token.totalValueLocked.plus(marketTokenBalance)
  token.totalValueLockedUSD = convertToUsd(event.params.token, amountToken)

  // update txn counts
  base.txCount = base.txCount.plus(ONE_BI)
  token.txCount = token.txCount.plus(ONE_BI)

  
  // update market data
  market.volumeBase = market.volumeBase.plus(amountBase)
  market.volumeToken = market.volumeToken.plus(amountToken)
  market.volumeUSD = market.volumeUSD.plus(amountUSD)
  market.txCount = market.txCount.plus(ONE_BI)
  market.reserveBase = marketBaseBalance
  market.reserveToken = marketTokenBalance
  market.basePrice = convertTokenToDecimal(event.params.newprice, base.decimals)
  market.tokenPrice = ONE_BD.div(market.basePrice)
  market.totalValueLockedXCHF = marketBaseBalance.plus(marketTokenBalance.times(market.basePrice))
  market.totalValueLockedUSD = convertToUsd(event.params.base, market.totalValueLockedXCHF)
  
  // update data of registry
  registry.txCount = registry.txCount.plus(ONE_BI)
  registry.totalVolumeXCHF = registry.totalVolumeXCHF.plus(amountBase)
  registry.totalVolumeUSD = convertToUsd(event.params.base, registry.totalVolumeXCHF)
  registry.totalValueLockedXCHF = registry.totalValueLockedXCHF.plus(market.totalValueLockedXCHF)
  registry.totalValueLockedUSD = convertToUsd(event.params.base, registry.totalValueLockedXCHF)

  // save entities
  registry.save()
  market.save()
  base.save()
  token.save()

  let transaction = Transaction.load(event.transaction.hash.toHexString())
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString())
    transaction.blockNumber = event.block.number
    transaction.timestamp = event.block.timestamp
  }
  let swap = new SwapEvent(
    event.transaction.hash
      .toHexString()
  )

  // update swap event
  swap.transaction = transaction.id
  swap.market = market.id
  swap.timestamp = transaction.timestamp
  swap.transaction = transaction.id
  swap.sender = event.params.who
  swap.amountBase = amountBase
  swap.amountToken = amountToken
  swap.amountUSD = amountUSD
  swap.newPriceBase = convertTokenToDecimal(event.params.newprice, base.decimals)
  swap.avgPriceBase = convertTokenToDecimal(event.params.totPrice.div(event.params.amount.abs()), base.decimals)
  swap.newPriceUSD = convertToUsd(event.params.base, swap.newPriceBase)
  swap.avgPriceUSD = convertToUsd(event.params.base, swap.avgPriceBase)
  swap.logIndex = event.logIndex
  // use the tracked amount if we have it
  //swap.amountUSD = trackedAmountUSD === ZERO_BD ? derivedAmountUSD : trackedAmountUSD
  swap.save()

  // update the transaction

  // TODO: Consider using .concat() for handling array updates to protect
  // against unintended side effects for other code paths.
  //swaps.push(swap.id)
  transaction.swap = swap.id
  transaction.save()

}
