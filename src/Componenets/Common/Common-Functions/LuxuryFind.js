import React from "react";

export const LuxuryFind = (type) =>
  type?.toLowerCase().includes("volvo") ||
  type?.toLowerCase().includes("mercedes benz") ||
  type?.toLowerCase().includes("washroom") ||
  type?.toLowerCase().includes("bharat benz") ||
  type?.toLowerCase().includes("luxury") ||
  type?.toLowerCase().includes("ve") ||
  type?.toLowerCase().includes("scania");
