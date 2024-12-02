# Payvra SDK for Node.js and TypeScript

Payvra is a modern cryptocurrency payment processor that enables businesses to accept various cryptocurrencies including Bitcoin, Ethereum, USDT, and more.

## Installation

Install the Payvra SDK using npm:

```
npm install payvra-sdk
```

## Usage

Import and initialize the Payvra client:

```
import { createPayvraClient } from 'payvra-sdk';

const client = createPayvraClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://payvra.com/api/v1' // Optional, defaults to production URL
});
```

### Fetch Available Currencies

Get a list of supported cryptocurrencies and their networks:

```
const { currencies } = await client.fetchCurrencies();
```

Success response:
```
{
  "currencies": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "networks": [
        {
          "network": "BTC",
          "name": "Bitcoin",
          "minConfirm": 2,
          "withdrawFee": 0.00001,
          "withdrawMin": 0.0001,
          "depositMin": 0.0001
        }
      ]
    }
  ]
}
```

### Create Invoice

Generate a new payment invoice:

```
const invoice = await client.createInvoice({
  amount: 100,
  amountCurrency: 'USD',
  acceptedCoins: ['BTC', 'ETH'], // Optional: Defaults to merchant's settings
  underPaidCover: 0.1, // Optional: Accept payments up to 10% under
  feePaidByPayer: true, // Optional: All fees paid by customer
  lifeTime: 60, // Optional: Invoice expires in 60 minutes
  returnUrl: 'https://your-site.com/payment/callback' // Optional: Return URL after payment
});
```

Success response:
```
{
   "id":"cm47930od4b9i11dknivo92u1",
   "merchantId":"cm3lww0bm000vdmukkkbrxdzu",
   "paymentUrl":"https://payvra.com/payment/cm47930od4b9i11dknivo92u1",
   "status":"PENDING",
   "address":null,
   "txHash":null,
   "amount":100,
   "amountCurrency":"USD",
   "rate":null,
   "payAmount":null,
   "paidAmount":null,
   "cryptoCurrency":null,
   "network":null,
   "feePaidByPayer":true,
   "underPaidCover":0,
   "isWhiteLabel":false,
   "returnUrl":"https://your-site.com/payment/callback",
   "paidAt":null,
   "expiresAt":"2024-12-02T17:34:20.076Z",
   "createdAt":"2024-12-02T16:34:20.078Z"
}
```

### Fetch Invoice Details

Retrieve details of an existing invoice:

```
const invoice = await client.fetchInvoice({
  invoiceId: 'cm47930od4b9i11dknivo92u1'
});
```

### Create Payout

Initiate a cryptocurrency withdrawal:

```
const payout = await client.createPayout({
  currency: 'LTC',
  network: 'Litecoin',
  amount: 0.1,
  address: 'ltc1g67g48wvxa7fawlgvcy7u8ahrnc8w6spmsf6amhrl2ckue247v3dskceapx'
});
```

### Fetch Exchange Rates

Get current exchange rates between supported pairs:

```
const { pairs } = await client.fetchExchangePairs();
```

## Webhook Events

The SDK includes TypeScript types for webhook events. Handle incoming webhooks:

```
import type { WebhookEvent } from 'payvra-sdk';

function handleWebhook(event: WebhookEvent) {
  switch (event.eventType) {
    case 'PAYMENT_COMPLETED':
      console.log(`Payment completed: ${event.amount} ${event.cryptoCurrency.symbol}`);
      break;
    case 'PAYMENT_EXPIRED':
      console.log(`Payment expired: ${event.id}`);
      break;
    case 'PAYOUT_COMPLETED':
      console.log(`Payout completed: ${event.amount} ${event.currency.symbol}`);
      break;
  }
}
```

For detailed API documentation, visit [Payvra's API Documentation](https://docs.payvra.com).