const BASE_URL =
  "https://creditsystem-api-dfhadyeze5cee0hu.centralindia-01.azurewebsites.net";
const API_KEY = "abc-api-key-12345";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const api = {
  // Auth
  register: (data) =>
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, apiKey: API_KEY }),
    }).then((r) => r.json()),

  login: (data) =>
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, apiKey: API_KEY }),
    }).then((r) => r.json()),

  // Credits
  getBalance: () =>
    fetch(`${BASE_URL}/api/credits/balance`, {
      headers: headers(),
    }).then((r) => r.json()),

  getPlans: () =>
    fetch(`${BASE_URL}/api/credits/plans`, {
      headers: headers(),
    }).then((r) => r.json()),

  getHistory: () =>
    fetch(`${BASE_URL}/api/credits/history`, {
      headers: headers(),
    }).then((r) => r.json()),

  // Services
  generateImage: (prompt) =>
    fetch(`${BASE_URL}/api/services/generate-image`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ prompt }),
    }).then((r) => r.json()),

  generateQR: (text) =>
    fetch(`${BASE_URL}/api/services/generate-qr`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ text }),
    }).then((r) => r.json()),

  shortenUrl: (longUrl) =>
    fetch(`${BASE_URL}/api/services/shorten-url`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        longUrl,
        baseUrl:
          "https://creditsystem-api-dfhadyeze5cee0hu.centralindia-01.azurewebsites.net",
      }),
    }).then((r) => r.json()),

  getUsage: () =>
    fetch(`${BASE_URL}/api/services/usage`, {
      headers: headers(),
    }).then((r) => r.json()),

  // Payments
  createCheckout: (planId) =>
    fetch(`${BASE_URL}/api/payments/create-checkout`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ planId, baseUrl: "http://localhost:5173" }),
    }).then((r) => r.json()),
};
