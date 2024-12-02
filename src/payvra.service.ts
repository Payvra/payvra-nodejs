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

class PayvraApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "PayvraApiError";
  }
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

  private handleError(error: unknown, operation: string): never {
    if (axios.isAxiosError(error)) {
      throw new PayvraApiError(
        `${operation} failed: ${
          error.response?.data?.message || error.message
        }`,
        error.response?.status,
        error.response?.data
      );
    }
    throw new PayvraApiError(
      `${operation} failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

  public async fetchCurrencies() {
    try {
      const response = await axios.post<FetchCurrenciesResponse>(
        `${this.baseUrl}/currencies`,
        {},
        { headers: this.headers }
      );

      if (!response.data) {
        throw new PayvraApiError("No data received when fetching currencies");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Fetch currencies");
    }
  }

  public async createInvoice(params: CreateInvoiceParams) {
    try {
      const response = await axios.post<CreateInvoiceResponse>(
        `${this.baseUrl}/merchants/invoice/create`,
        params,
        { headers: this.headers }
      );

      if (!response.data) {
        throw new PayvraApiError("No data received when creating invoice");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Create invoice");
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
        throw new PayvraApiError("No data received when fetching invoice");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Fetch invoice");
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
        throw new PayvraApiError(
          "No data received when creating whitelabel invoice"
        );
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Create whitelabel invoice");
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
        throw new PayvraApiError("No data received when creating payout");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Create payout");
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
        throw new PayvraApiError("No data received when fetching payout");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Fetch payout");
    }
  }

  public async fetchExchangePairs() {
    try {
      const response = await axios.post<FetchExchangePairsResponse>(
        `${this.baseUrl}/exchange/pairs`,
        {
          headers: this.headers,
        }
      );

      if (!response.data) {
        throw new PayvraApiError(
          "No data received when fetching exchange pairs"
        );
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Fetch exchange pairs");
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
        throw new PayvraApiError("No data received when creating exchange");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Create exchange");
    }
  }
}

// Export a factory function instead of a singleton instance
export function createPayvraClient(config: PayvraConfig): PayvraClient {
  return new PayvraClient(config);
}
