import axios from "axios";
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { AI_ASSISTANT_API } from "@utils/api";
import type {
  HireDeskQueryPayload,
  HireDeskQueryResponse,
  HireDeskStatusResponse,
} from "@app-types";

// Create axios instance for AI Assistant API
const assistantApi = axios.create({
  baseURL: AI_ASSISTANT_API,
  withCredentials: true,
});

// Helper function to extract error messages from various error formats
const extractErrorMessage = (error: any, defaultMessage: string): string => {
  if (error.response?.data) {
    const data = error.response.data;

    if (data.message) {
      return data.message;
    }

    if (data.error) {
      return data.error;
    }

    if (data.detail) {
      // If detail is an object with message
      if (typeof data.detail === "object" && data.detail.message) {
        return data.detail.message;
      }
      // If detail is a string
      if (typeof data.detail === "string") {
        return data.detail;
      }
    }

    // Validation errors (array format)
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0].message || data.errors[0];
    }

    // Single validation error
    if (typeof data === "string") {
      return data;
    }
  }

  if (error.message && error.message !== "Network Error") {
    return error.message;
  }

  if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  return defaultMessage;
};

// Request interceptor to add JWT token
assistantApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor to handle errors
assistantApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Preserve the current session so chat and analysis flows can surface the
    // backend error instead of forcefully redirecting the user.
    return Promise.reject(error);
  },
);

// Service methods for AI Assistant API
export const assistantService = {
  /**
   * Send a query to HireDesk AI Assistant
   * @param payload - Query payload with query text, type, and optional context
   * @returns HireDeskQueryResponse with AI-generated answer
   */
  async query(payload: HireDeskQueryPayload): Promise<HireDeskQueryResponse> {
    try {
      const response = await assistantApi.post<HireDeskQueryResponse>(
        "/hiredesk/query",
        payload,
      );

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to process HireDesk query",
      );

      const structuredError = {
        success: false,
        message: errorMessage,
        status: error.response?.status,
        errorData: error.response?.data,
      };

      throw structuredError;
    }
  },

  /**
   * Get HireDesk AI Assistant service status
   * @returns HireDeskStatusResponse with service status and supported query types
   */
  async getStatus(): Promise<HireDeskStatusResponse> {
    try {
      const response =
        await assistantApi.get<HireDeskStatusResponse>("/status");

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to fetch HireDesk status",
      );

      const structuredError = {
        success: false,
        message: errorMessage,
        status: error.response?.status,
        errorData: error.response?.data,
      };

      throw structuredError;
    }
  },
};
