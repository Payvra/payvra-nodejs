import { createPayvraClient } from "../payvra.service";

describe("PayvraClient", () => {
  it("should create client instance", () => {
    const client = createPayvraClient({
      apiKey: "test-key",
    });
    expect(client).toBeDefined();
  });
});
