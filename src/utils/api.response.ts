import { Response } from "express";

export type PaginationData = {
  request: {
    skip: number;
    limit: number;
  };
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

type SuccessOptions<T> = {
  res: Response;
  data?: T;
  message?: string;
  status?: number;
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

// export class ApiError extends Error {
//   status: number;

//   constructor(obj: { status: number; message: string }) {
//     super(obj.message);
//     this.status = obj.status;
//   }
// }

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };

  constructor(
    data?: T,
    message?: string,
    pagination?: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    }
  ) {
    this.success = true;
    this.data = data;
    this.message = message;
    this.pagination = pagination;
  }

  static success<T>(obj: {
    response: Response;
    status?: number;
    data?: T;
    message: string;
    pagination?: any;
  }) {
    const status = obj.status ?? 200;
    const responseData = new ApiResponse<T>(
      obj.data,
      obj.message ?? "Request is successful",
      obj.pagination
    );

    return obj.response.status(status).json(responseData);
  }
}

export function sendSuccess<T>(options: SuccessOptions<T>) {
  return ApiResponse.success({
    response: options.res,
    data: options.data,
    message: options.message ?? "Success",
    pagination: options.pagination,
    status: options.status,
  });
}
