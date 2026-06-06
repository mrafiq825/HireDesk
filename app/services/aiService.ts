import axios from "axios";
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { AI_API } from "@utils/api";
import type {
  HireDeskAnalyzeResponse,
  BatchAnalysisResponse,
  ComparisonCandidate,
  ExtendedAxiosRequestConfig as AxiosRequestConfig,
} from "@app-types";

type ExtendedAxiosRequestConfig = AxiosRequestConfig &
  InternalAxiosRequestConfig;

// Create axios instance for AI API
const aiApi = axios.create({
  baseURL: AI_API,
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
aiApi.interceptors.request.use(
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
aiApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

// Interface for AI API error responses
interface AIErrorResponse {
  success: false;
  message: string;
  error: string;
  detail?: any;
  current_count?: number;
  limit?: number;
  remaining?: number;
}

// Service methods for AI API
export const aiService = {
  /**
   * Analyze a single resume for a specific job role
   * @param file - Resume file (PDF, DOC, DOCX)
   * @param targetRole - Target job role
   * @param jobDescription - Job description
   * @returns HireDeskAnalyzeResponse with analysis results
   */
  async hireDeskAnalyze(
    file: File,
    targetRole: string,
    jobDescription: string,
  ): Promise<HireDeskAnalyzeResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target_role", targetRole);
      formData.append("job_description", jobDescription);

      const response = await aiApi.post<HireDeskAnalyzeResponse>(
        "/hiredesk-analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to analyze resume",
      );

      // Create structured error response
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
   * Batch analyze multiple resumes
   * @param files - Array of resume files (2-5 files)
   * @param targetRole - Optional target job role
   * @param jobDescription - Optional job description
   * @returns BatchAnalysisResponse with results for each file
   */
  async batchAnalyze(
    files: File[],
    targetRole?: string,
    jobDescription?: string,
  ): Promise<BatchAnalysisResponse> {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      if (targetRole) {
        formData.append("target_role", targetRole);
      }

      if (jobDescription) {
        formData.append("job_description", jobDescription);
      }

      const response = await aiApi.post<BatchAnalysisResponse>(
        "/batch-analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error, "Batch analysis failed");

      // Create structured error response
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
   * Compare multiple resumes side-by-side
   * @param files - Array of resume files (2-5 files)
   * @returns Response with ranked candidates and comparison
   */
  async compareResumes(files: File[]): Promise<{
    success: boolean;
    message: string;
    comparison_summary: {
      total_submitted: number;
      successful: number;
      failed: number;
      highest_score: number;
      average_score: number;
    };
    ranked_candidates: ComparisonCandidate[];
    recommendations: string[];
  }> {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await aiApi.post("/compare-resumes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Resume comparison failed",
      );

      // Create structured error response
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
   * Select candidates based on job title and keywords
   * Evaluates resumes and returns FIT/REJECT decisions
   * @param files - Array of resume files (1-5 files)
   * @param jobTitle - Job position title
   * @param keywords - Comma-separated keywords/requirements
   * @returns Selection results with FIT/REJECT status for each candidate
   */
  async selectCandidates(
    files: File[],
    jobTitle: string,
    keywords: string,
  ): Promise<{
    job_title: string;
    keywords: string[];
    total_candidates: number;
    fit_count: number;
    reject_count: number;
    results: Array<{
      candidate: string;
      status: "FIT" | "REJECT";
      message: string;
    }>;
  }> {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("job_title", jobTitle);
      formData.append("keywords", keywords);

      const response = await aiApi.post("/selection-candidate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = extractErrorMessage(
        error,
        "Candidate selection failed",
      );

      // Create structured error response
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
