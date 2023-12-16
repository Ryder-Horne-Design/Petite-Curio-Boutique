"use client";
import { CookiesProvider } from "next-client-cookies";

export const ClientCookiesProvider: typeof CookiesProvider = function(props) {
  return <CookiesProvider {...props} />
};