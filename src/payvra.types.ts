export enum PayvraInvoiceStatus {
  PENDING = "PENDING",
  CONFIRMING = "CONFIRMING",
  UNDER_PAID = "UNDER_PAID",
  PAID = "PAID",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
}

export enum PayvraPayoutStatus {
  PROCESSING = "PROCESSING",
  CONFIRMING = "CONFIRMING",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

export interface PayvraNetwork {
  network: string;
  name: string;
  minConfirm: number | null;
  withdrawFee: number | null;
  withdrawMin: number | null;
  depositMin: number | null;
  staticFixedFee: number | null;
}

export interface PayvraCurrency {
  symbol: string;
  name: string;
  networks: PayvraNetwork[];
}

export interface ExchangePair {
  minAmount: number;
  rate: number;
  fromCurrency: {
    symbol: string;
  };
  toCurrency: {
    symbol: string;
  };
}

// Routes

export interface FetchCurrenciesParams {}

export interface FetchCurrenciesResponse {
  currencies: PayvraCurrency[];
}

export interface CreateInvoiceParams {
  amount: number;
  amountCurrency?: string;
  acceptedCoins?: string[];
  underPaidCover?: number;
  feePaidByPayer?: boolean;
  lifeTime?: number;
  returnUrl?: string;
}

export interface CreateInvoiceResponse {
  id: string;
  merchantId: string;
  paymentUrl: string;
  status: string;
  address: string;
  txHash: string;
  amount: number;
  amountCurrency: string;
  rate: number;
  payAmount: number;
  paidAmount?: number;
  paidAt?: string;
  cryptoCurrency: {
    symbol: string;
  };
  network: {
    network: string;
  };
  feePaidByPayer: boolean;
  underPaidCover: number;
  isWhiteLabel: boolean;
  returnUrl: string;
  expiresAt: string;
  createdAt: string;
}

export interface FetchInvoiceParams {
  invoiceId: string;
}

export interface FetchInvoiceResponse {
  id: string;
  merchantId: string;
  paymentUrl: string;
  status: string;
  address: string;
  txHash: string;
  amount: number;
  amountCurrency: string;
  rate: number;
  payAmount: number;
  paidAmount?: number;
  paidAt?: string;
  cryptoCurrency: {
    symbol: string;
  };
  network: {
    network: string;
  };
  feePaidByPayer: boolean;
  underPaidCover: number;
  isWhiteLabel: boolean;
  returnUrl: string;
  expiresAt: string;
  createdAt: string;
}

export interface CreateWhitelabelParams {
  amount: number;
  amountCurrency?: string;
  underPaidCover?: number;
  feePaidByPayer?: boolean;
  lifeTime?: number;
  payCurrency: string;
  network?: string;
}

export interface CreateWhitelabelResponse {
  id: string;
  merchantId: string;
  paymentUrl: string;
  status: PayvraInvoiceStatus;
  address: string;
  txHash: string;
  amount: number;
  amountCurrency: string;
  rate: number;
  payAmount: number;
  paidAmount?: number;
  paidAt?: string;
  cryptoCurrency: {
    symbol: string;
  };
  network: {
    network: string;
  };
  feePaidByPayer: boolean;
  underPaidCover: number;
  isWhiteLabel: boolean;
  returnUrl: string;
  expiresAt: string;
  createdAt: string;
}

export interface CreatePayoutParams {
  currency: string;
  network: string;
  amount: number;
  address: string;
}

export interface CreatePayoutResponse {
  wallet: {
    currency: string;
  };
  network: {
    network: string;
  };
  status: PayvraPayoutStatus;
  address: string;
  txHash: string;
  amount: number;
  createdAt: string;
}

export interface FetchPayoutParams {
  payoutId: string;
}

export interface FetchPayoutResponse {
  payout: CreatePayoutResponse;
}

export interface FetchExchangePairsResponse {
  pairs: ExchangePair[];
}

export interface CreateExchangeParams {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface CreateExchangeResponse {
  id: string;
  status: "SUCCESS" | "FAILED";
  fromWallet: {
    currency: {
      symbol: string;
    };
  };
  toWallet: {
    currency: {
      symbol: string;
    };
  };
  amount: number;
  rate: number;
  toAmount: number;
  createdAt: string;
}

// Webhooks

export const PayvraWebhookEventType = {
  PAYMENT_CREATED: "PAYMENT_CREATED",
  PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
  PAYMENT_EXPIRED: "PAYMENT_EXPIRED",
  PAYMENT_FAILED: "PAYMENT_FAILED",
} as const;

export type PayvraWebhookEventType =
  (typeof PayvraWebhookEventType)[keyof typeof PayvraWebhookEventType];

interface BasePayvraWebhookEvent {
  eventType: PayvraWebhookEventType;
  id: string;
  merchantId: string;
  paymentUrl: string;
  status: PayvraInvoiceStatus;
  address: string;
  amount: number;
  amountCurrency: string;
  rate: number;
  payAmount: number;
  paidAmount?: number;
  paidAt?: string;
  cryptoCurrency: {
    symbol: string;
  };
  network: {
    network: string;
  };
  feePaidByPayer: boolean;
  underPaidCover: number;
  isWhiteLabel: boolean;
  returnUrl: string;
  expiresAt: string;
  createdAt: string;
}

interface PayvraWebhookEventWithTxHash extends BasePayvraWebhookEvent {
  txHash: string;
}

export type PayvraWebhookEvent =
  | (BasePayvraWebhookEvent & {
      eventType:
        | typeof PayvraWebhookEventType.PAYMENT_CREATED
        | typeof PayvraWebhookEventType.PAYMENT_EXPIRED
        | typeof PayvraWebhookEventType.PAYMENT_FAILED;
    })
  | (PayvraWebhookEventWithTxHash & {
      eventType: typeof PayvraWebhookEventType.PAYMENT_COMPLETED;
    });

export const PayvraPayoutWebhookEventType = {
  PAYOUT_CREATED: "PAYOUT_CREATED",
  PAYOUT_CONFIRMING: "PAYOUT_CONFIRMING",
  PAYOUT_COMPLETED: "PAYOUT_COMPLETED",
  PAYOUT_REJECTED: "PAYOUT_REJECTED",
} as const;

export type PayvraPayoutWebhookEventType =
  (typeof PayvraPayoutWebhookEventType)[keyof typeof PayvraPayoutWebhookEventType];

interface BasePayvraPayoutWebhookEvent {
  eventType: PayvraPayoutWebhookEventType;
  id: string;
  wallet: {
    merchantId: string;
    currency: {
      symbol: string;
    };
  };
  network: {
    network: string;
  };
  status: PayvraPayoutStatus;
  address: string;
  amount: number;
  createdAt: string;
  txHash: string | null;
}

export type PayvraPayoutWebhookEvent =
  | (BasePayvraPayoutWebhookEvent & {
      eventType:
        | typeof PayvraPayoutWebhookEventType.PAYOUT_CREATED
        | typeof PayvraPayoutWebhookEventType.PAYOUT_REJECTED;
      txHash: null;
    })
  | (BasePayvraPayoutWebhookEvent & {
      eventType:
        | typeof PayvraPayoutWebhookEventType.PAYOUT_CONFIRMING
        | typeof PayvraPayoutWebhookEventType.PAYOUT_COMPLETED;
      txHash: string;
    });
