import { config } from '../config/env'

// API service for Counter endpoints
export interface ApiError {
  error: string;
}

export class CounterApiService {
  private baseUrl: string;

  constructor(baseUrl: string = config.apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async increment(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/Counter/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.error || 'Failed to increment counter');
    }
  }

  async decrement(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/Counter/decrement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.error || 'Failed to decrement counter');
    }
  }

  async reset(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/Counter/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.error || 'Failed to reset counter');
    }
  }
}

// Export a default instance
export const counterApi = new CounterApiService();
