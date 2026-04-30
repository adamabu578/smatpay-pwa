import { APIConstants } from "./api-constants";

const CACHE_KEY = "cached_profile_data";
const TIMEOUT_MS = 15_000;

let memoryCache: Record<string, unknown> | null = null;

function getAuthToken(): string {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) throw new Error("Authentication required. Please login again.");
  return token;
}

function buildHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

function handleResponse(data: Record<string, unknown>): Record<string, unknown> {
  if (data.status?.toString().toLowerCase() !== "success") {
    throw new Error((data.msg as string) ?? "Request failed");
  }
  return (data.data as Record<string, unknown>) ?? {};
}

export async function fetchProfileDetails(
  forceRefresh = false
): Promise<Record<string, unknown>> {
  if (forceRefresh) clearProfileCache();

  // 1. Memory cache
  if (memoryCache && !forceRefresh) {
    console.log("💾 Returning memory-cached profile data");
    return memoryCache;
  }

  // 2. Persistent cache (localStorage)
  if (!forceRefresh && typeof window !== "undefined") {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      console.log("📦 Returning persistent-cached profile data");
      memoryCache = JSON.parse(cached);
      return memoryCache!;
    }
  }

  // 3. Network fetch
  console.log("🌐 Fetching fresh profile data from API...");
  const token = getAuthToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(APIConstants.profileEndpoint, {
      headers: buildHeaders(token),
      signal: controller.signal,
    });

    if (!res.ok)
      throw new Error(`Server responded with status ${res.status}`);

    const json = await res.json();
    const data = handleResponse(json);

    memoryCache = data;
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    }
    console.log("✅ Profile data cached");
    return data;
  } catch (err: unknown) {
    if ((err as { name?: string }).name === "AbortError")
      throw new Error("Request timeout. Please check your connection.");
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export function clearProfileCache(): void {
  console.log("🧹 Clearing profile data cache");
  if (typeof window !== "undefined") localStorage.removeItem(CACHE_KEY);
  memoryCache = null;
}

export async function hasCachedData(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CACHE_KEY) !== null;
}

// Function to connect to Payscribe endpoint (Generate Virtual Account)
export async function generateVirtualAccount(provider = "payscribe"): Promise<Record<string, unknown>> {
  const token = getAuthToken();
  const res = await fetch(APIConstants.virtualAccountEndpoint, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify({ nubanProvider: provider })
  });

  if (!res.ok) {
    throw new Error(`Server responded with status ${res.status}`);
  }

  const json = await res.json();
  const data = handleResponse(json);
  
  // Clear cache so the next profile fetch gets the new virtual account
  clearProfileCache();
  
  return data;
}

export async function fetchWalletBalance(): Promise<number> {
  console.log("🌐 Fetching fresh wallet balance from API...");
  const token = getAuthToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(APIConstants.balanceEndpoint, {
      headers: buildHeaders(token),
      signal: controller.signal,
    });

    if (!res.ok)
      throw new Error(`Server responded with status ${res.status}`);

    const json = await res.json();
    const data = handleResponse(json);

    return Number(data.wallet) || 0;
  } catch (err: unknown) {
    if ((err as { name?: string }).name === "AbortError")
      throw new Error("Request timeout. Please check your connection.");
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchTransactionHistory(): Promise<any[]> {
  console.log("🌐 Fetching transaction history from API...");
  const token = getAuthToken();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(APIConstants.transactionsEndpoint, {
      headers: buildHeaders(token),
      signal: controller.signal,
    });

    if (!res.ok)
      throw new Error(`Server responded with status ${res.status}`);

    const json = await res.json();
    
    // Some endpoints wrap the array in 'data', others in 'msg', some just return the array if successful
    if (json.status?.toString().toLowerCase() !== "success") {
      throw new Error((json.msg as string) ?? "Request failed");
    }
    
    const history = Array.isArray(json.data) ? json.data : Array.isArray(json.msg) ? json.msg : (Array.isArray(json) ? json : []);
    return history;
  } catch (err: unknown) {
    if ((err as { name?: string }).name === "AbortError")
      throw new Error("Request timeout. Please check your connection.");
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
