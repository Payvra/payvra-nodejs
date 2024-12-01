import axios from "axios";
import type {
  CreateExchangeParams,
  CreateExchangeResponse,
  CreateInvoiceParams,
  CreateInvoiceResponse,
  CreatePayoutParams,
  CreatePayoutResponse,
  CreateWhitelabelParams,
  CreateWhitelabelResponse,
  FetchCurrenciesResponse,
  FetchExchangePairsResponse,
  FetchInvoiceParams,
  FetchInvoiceResponse,
  FetchPayoutParams,
  FetchPayoutResponse,
} from "./payvra.types";

interface PayvraConfig {
  apiKey: string;
  baseUrl?: string;
}

export class PayvraClient {
  private readonly baseUrl: string;
  private readonly headers: {
    Authorization: string;
    "Content-Type": string;
  };

  constructor(config: PayvraConfig) {
    this.baseUrl = config.baseUrl ?? "https://payvra.com/api/v1";
    this.headers = {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  public async fetchCurrencies() {
    try {
      const response = await axios.post<FetchCurrenciesResponse>(
        `${this.baseUrl}/currencies`,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch currencies");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error creating invoice: ${error}`);
    }
  }

  public async createInvoice(params: CreateInvoiceParams) {
    try {
      const response = await axios.post<CreateInvoiceResponse>(
        `${this.baseUrl}/merchants/invoice/create`,
        params,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to create invoice");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error creating invoice: ${error}`);
    }
  }

  public async fetchInvoice(
    params: FetchInvoiceParams
  ): Promise<FetchInvoiceResponse> {
    try {
      const response = await axios.post<FetchInvoiceResponse>(
        `${this.baseUrl}/merchants/invoice/fetch`,
        params,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch invoice");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching invoice: ${error}`);
    }
  }

  public async createWhitelabel(
    params: CreateWhitelabelParams
  ): Promise<CreateWhitelabelResponse> {
    try {
      const response = await axios.post<CreateWhitelabelResponse>(
        `${this.baseUrl}/merchants/whitelabel/create`,
        params,
        { headers: this.headers }
      );

      if (!response.data) {
        throw new Error("Failed to create whitelabel invoice");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error creating whitelabel invoice: ${error}`);
    }
  }

  public async createPayout(
    params: CreatePayoutParams
  ): Promise<CreatePayoutResponse> {
    try {
      const response = await axios.post<CreatePayoutResponse>(
        `${this.baseUrl}/merchants/payout/create`,
        params,
        { headers: this.headers }
      );

      if (!response.data) {
        throw new Error("Failed to create payout");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error creating payout: ${error}`);
    }
  }

  public async fetchPayout(
    params: FetchPayoutParams
  ): Promise<FetchPayoutResponse> {
    try {
      const response = await axios.post<FetchPayoutResponse>(
        `${this.baseUrl}/merchants/payout/fetch`,
        params,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch payout");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching payout: ${error}`);
    }
  }

  public async fetchExchangePairs() {
    try {
      const response = await axios.get<FetchExchangePairsResponse>(
        `${this.baseUrl}/exchange/pairs`,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch exchange pairs");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching exchange pairs: ${error}`);
    }
  }

  public async createExchange(params: CreateExchangeParams) {
    try {
      const response = await axios.post<CreateExchangeResponse>(
        `${this.baseUrl}/merchants/exchange/create`,
        params,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to create exchange");
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error creating exchange: ${error}`);
    }
  }
}

// Export a factory function instead of a singleton instance
export function createPayvraClient(config: PayvraConfig): PayvraClient {
  return new PayvraClient(config);
}
