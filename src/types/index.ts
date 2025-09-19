import type { ComponentType } from "react";

export type { ILogin, ISendOtp, IVerifyOtp } from "./auth.type";
export type { ITourPackage } from "./tour.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    Component: ComponentType;
    url: string;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";
