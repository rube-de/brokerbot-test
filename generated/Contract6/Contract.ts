// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Trade extends ethereum.Event {
  get params(): Trade__Params {
    return new Trade__Params(this);
  }
}

export class Trade__Params {
  _event: Trade;

  constructor(event: Trade) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get who(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get ref(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get base(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get totPrice(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get fee(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get newprice(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  base(): Address {
    let result = super.call("base", "base():(address)", []);

    return result[0].toAddress();
  }

  try_base(): ethereum.CallResult<Address> {
    let result = super.tryCall("base", "base():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  buyingEnabled(): boolean {
    let result = super.call("buyingEnabled", "buyingEnabled():(bool)", []);

    return result[0].toBoolean();
  }

  try_buyingEnabled(): ethereum.CallResult<boolean> {
    let result = super.tryCall("buyingEnabled", "buyingEnabled():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  copyright(): Address {
    let result = super.call("copyright", "copyright():(address)", []);

    return result[0].toAddress();
  }

  try_copyright(): ethereum.CallResult<Address> {
    let result = super.tryCall("copyright", "copyright():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  driftIncrement(): BigInt {
    let result = super.call("driftIncrement", "driftIncrement():(int256)", []);

    return result[0].toBigInt();
  }

  try_driftIncrement(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "driftIncrement",
      "driftIncrement():(int256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  driftStart(): BigInt {
    let result = super.call("driftStart", "driftStart():(uint256)", []);

    return result[0].toBigInt();
  }

  try_driftStart(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("driftStart", "driftStart():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBuyPrice(shares: BigInt): BigInt {
    let result = super.call("getBuyPrice", "getBuyPrice(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(shares)
    ]);

    return result[0].toBigInt();
  }

  try_getBuyPrice(shares: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getBuyPrice",
      "getBuyPrice(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(shares)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getLicenseFee(totPrice: BigInt): BigInt {
    let result = super.call(
      "getLicenseFee",
      "getLicenseFee(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(totPrice)]
    );

    return result[0].toBigInt();
  }

  try_getLicenseFee(totPrice: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getLicenseFee",
      "getLicenseFee(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(totPrice)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPrice(): BigInt {
    let result = super.call("getPrice", "getPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getPrice", "getPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPriceAtTime(timestamp: BigInt): BigInt {
    let result = super.call(
      "getPriceAtTime",
      "getPriceAtTime(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(timestamp)]
    );

    return result[0].toBigInt();
  }

  try_getPriceAtTime(timestamp: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPriceAtTime",
      "getPriceAtTime(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(timestamp)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getSellPrice(shares: BigInt): BigInt {
    let result = super.call("getSellPrice", "getSellPrice(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(shares)
    ]);

    return result[0].toBigInt();
  }

  try_getSellPrice(shares: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getSellPrice",
      "getSellPrice(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(shares)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getShares(money: BigInt): BigInt {
    let result = super.call("getShares", "getShares(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(money)
    ]);

    return result[0].toBigInt();
  }

  try_getShares(money: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getShares", "getShares(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(money)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hasDrift(): boolean {
    let result = super.call("hasDrift", "hasDrift():(bool)", []);

    return result[0].toBoolean();
  }

  try_hasDrift(): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasDrift", "hasDrift():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  increment(): BigInt {
    let result = super.call("increment", "increment():(uint256)", []);

    return result[0].toBigInt();
  }

  try_increment(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("increment", "increment():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  onTokenTransfer(from: Address, amount: BigInt, ref: Bytes): boolean {
    let result = super.call(
      "onTokenTransfer",
      "onTokenTransfer(address,uint256,bytes):(bool)",
      [
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromBytes(ref)
      ]
    );

    return result[0].toBoolean();
  }

  try_onTokenTransfer(
    from: Address,
    amount: BigInt,
    ref: Bytes
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "onTokenTransfer",
      "onTokenTransfer(address,uint256,bytes):(bool)",
      [
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromBytes(ref)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paymenthub(): Address {
    let result = super.call("paymenthub", "paymenthub():(address)", []);

    return result[0].toAddress();
  }

  try_paymenthub(): ethereum.CallResult<Address> {
    let result = super.tryCall("paymenthub", "paymenthub():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  sellingEnabled(): boolean {
    let result = super.call("sellingEnabled", "sellingEnabled():(bool)", []);

    return result[0].toBoolean();
  }

  try_sellingEnabled(): ethereum.CallResult<boolean> {
    let result = super.tryCall("sellingEnabled", "sellingEnabled():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  settings(): BigInt {
    let result = super.call("settings", "settings():(uint256)", []);

    return result[0].toBigInt();
  }

  try_settings(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("settings", "settings():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  timeToDrift(): BigInt {
    let result = super.call("timeToDrift", "timeToDrift():(uint256)", []);

    return result[0].toBigInt();
  }

  try_timeToDrift(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("timeToDrift", "timeToDrift():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get shareToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get price_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get increment_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get baseCurrency(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get owner(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get erc20(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get who(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class NotifyTradeCall extends ethereum.Call {
  get inputs(): NotifyTradeCall__Inputs {
    return new NotifyTradeCall__Inputs(this);
  }

  get outputs(): NotifyTradeCall__Outputs {
    return new NotifyTradeCall__Outputs(this);
  }
}

export class NotifyTradeCall__Inputs {
  _call: NotifyTradeCall;

  constructor(call: NotifyTradeCall) {
    this._call = call;
  }

  get buyer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get shares(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get ref(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class NotifyTradeCall__Outputs {
  _call: NotifyTradeCall;

  constructor(call: NotifyTradeCall) {
    this._call = call;
  }
}

export class NotifyTradeAndTransferCall extends ethereum.Call {
  get inputs(): NotifyTradeAndTransferCall__Inputs {
    return new NotifyTradeAndTransferCall__Inputs(this);
  }

  get outputs(): NotifyTradeAndTransferCall__Outputs {
    return new NotifyTradeAndTransferCall__Outputs(this);
  }
}

export class NotifyTradeAndTransferCall__Inputs {
  _call: NotifyTradeAndTransferCall;

  constructor(call: NotifyTradeAndTransferCall) {
    this._call = call;
  }

  get buyer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get shares(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get ref(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class NotifyTradeAndTransferCall__Outputs {
  _call: NotifyTradeAndTransferCall;

  constructor(call: NotifyTradeAndTransferCall) {
    this._call = call;
  }
}

export class NotifyTradesCall extends ethereum.Call {
  get inputs(): NotifyTradesCall__Inputs {
    return new NotifyTradesCall__Inputs(this);
  }

  get outputs(): NotifyTradesCall__Outputs {
    return new NotifyTradesCall__Outputs(this);
  }
}

export class NotifyTradesCall__Inputs {
  _call: NotifyTradesCall;

  constructor(call: NotifyTradesCall) {
    this._call = call;
  }

  get buyers(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get shares(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get ref(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }
}

export class NotifyTradesCall__Outputs {
  _call: NotifyTradesCall;

  constructor(call: NotifyTradesCall) {
    this._call = call;
  }
}

export class NotifyTradesAndTransferCall extends ethereum.Call {
  get inputs(): NotifyTradesAndTransferCall__Inputs {
    return new NotifyTradesAndTransferCall__Inputs(this);
  }

  get outputs(): NotifyTradesAndTransferCall__Outputs {
    return new NotifyTradesAndTransferCall__Outputs(this);
  }
}

export class NotifyTradesAndTransferCall__Inputs {
  _call: NotifyTradesAndTransferCall;

  constructor(call: NotifyTradesAndTransferCall) {
    this._call = call;
  }

  get buyers(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get shares(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get ref(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }
}

export class NotifyTradesAndTransferCall__Outputs {
  _call: NotifyTradesAndTransferCall;

  constructor(call: NotifyTradesAndTransferCall) {
    this._call = call;
  }
}

export class OnTokenTransferCall extends ethereum.Call {
  get inputs(): OnTokenTransferCall__Inputs {
    return new OnTokenTransferCall__Inputs(this);
  }

  get outputs(): OnTokenTransferCall__Outputs {
    return new OnTokenTransferCall__Outputs(this);
  }
}

export class OnTokenTransferCall__Inputs {
  _call: OnTokenTransferCall;

  constructor(call: OnTokenTransferCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get ref(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class OnTokenTransferCall__Outputs {
  _call: OnTokenTransferCall;

  constructor(call: OnTokenTransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class OnTokenTransfer1Call extends ethereum.Call {
  get inputs(): OnTokenTransfer1Call__Inputs {
    return new OnTokenTransfer1Call__Inputs(this);
  }

  get outputs(): OnTokenTransfer1Call__Outputs {
    return new OnTokenTransfer1Call__Outputs(this);
  }
}

export class OnTokenTransfer1Call__Inputs {
  _call: OnTokenTransfer1Call;

  constructor(call: OnTokenTransfer1Call) {
    this._call = call;
  }

  get token_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get ref(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class OnTokenTransfer1Call__Outputs {
  _call: OnTokenTransfer1Call;

  constructor(call: OnTokenTransfer1Call) {
    this._call = call;
  }
}

export class ProcessIncomingCall extends ethereum.Call {
  get inputs(): ProcessIncomingCall__Inputs {
    return new ProcessIncomingCall__Inputs(this);
  }

  get outputs(): ProcessIncomingCall__Outputs {
    return new ProcessIncomingCall__Outputs(this);
  }
}

export class ProcessIncomingCall__Inputs {
  _call: ProcessIncomingCall;

  constructor(call: ProcessIncomingCall) {
    this._call = call;
  }

  get token_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get ref(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ProcessIncomingCall__Outputs {
  _call: ProcessIncomingCall;

  constructor(call: ProcessIncomingCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetDriftCall extends ethereum.Call {
  get inputs(): SetDriftCall__Inputs {
    return new SetDriftCall__Inputs(this);
  }

  get outputs(): SetDriftCall__Outputs {
    return new SetDriftCall__Outputs(this);
  }
}

export class SetDriftCall__Inputs {
  _call: SetDriftCall;

  constructor(call: SetDriftCall) {
    this._call = call;
  }

  get secondsPerStep(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get newDriftIncrement(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetDriftCall__Outputs {
  _call: SetDriftCall;

  constructor(call: SetDriftCall) {
    this._call = call;
  }
}

export class SetEnabledCall extends ethereum.Call {
  get inputs(): SetEnabledCall__Inputs {
    return new SetEnabledCall__Inputs(this);
  }

  get outputs(): SetEnabledCall__Outputs {
    return new SetEnabledCall__Outputs(this);
  }
}

export class SetEnabledCall__Inputs {
  _call: SetEnabledCall;

  constructor(call: SetEnabledCall) {
    this._call = call;
  }

  get newBuyingEnabled(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get newSellingEnabled(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetEnabledCall__Outputs {
  _call: SetEnabledCall;

  constructor(call: SetEnabledCall) {
    this._call = call;
  }
}

export class SetPaymentHubCall extends ethereum.Call {
  get inputs(): SetPaymentHubCall__Inputs {
    return new SetPaymentHubCall__Inputs(this);
  }

  get outputs(): SetPaymentHubCall__Outputs {
    return new SetPaymentHubCall__Outputs(this);
  }
}

export class SetPaymentHubCall__Inputs {
  _call: SetPaymentHubCall;

  constructor(call: SetPaymentHubCall) {
    this._call = call;
  }

  get hub(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPaymentHubCall__Outputs {
  _call: SetPaymentHubCall;

  constructor(call: SetPaymentHubCall) {
    this._call = call;
  }
}

export class SetPriceCall extends ethereum.Call {
  get inputs(): SetPriceCall__Inputs {
    return new SetPriceCall__Inputs(this);
  }

  get outputs(): SetPriceCall__Outputs {
    return new SetPriceCall__Outputs(this);
  }
}

export class SetPriceCall__Inputs {
  _call: SetPriceCall;

  constructor(call: SetPriceCall) {
    this._call = call;
  }

  get newPrice(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get newIncrement(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetPriceCall__Outputs {
  _call: SetPriceCall;

  constructor(call: SetPriceCall) {
    this._call = call;
  }
}

export class SetSettingsCall extends ethereum.Call {
  get inputs(): SetSettingsCall__Inputs {
    return new SetSettingsCall__Inputs(this);
  }

  get outputs(): SetSettingsCall__Outputs {
    return new SetSettingsCall__Outputs(this);
  }
}

export class SetSettingsCall__Inputs {
  _call: SetSettingsCall;

  constructor(call: SetSettingsCall) {
    this._call = call;
  }

  get settings_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetSettingsCall__Outputs {
  _call: SetSettingsCall;

  constructor(call: SetSettingsCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get ercAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawEtherCall extends ethereum.Call {
  get inputs(): WithdrawEtherCall__Inputs {
    return new WithdrawEtherCall__Inputs(this);
  }

  get outputs(): WithdrawEtherCall__Outputs {
    return new WithdrawEtherCall__Outputs(this);
  }
}

export class WithdrawEtherCall__Inputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawEtherCall__Outputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }
}
