import type { Customer } from "../types/Customer";
import { request } from "./api";

export function getCustomers(): Promise<Customer[]> {
  return request<Customer[]>("/customers", { method: "GET" });
}

export function getCustomerById(id: number): Promise<Customer> {
  return request<Customer>(`/customers/${id}`, { method: "GET" });
}

export function createCustomer(payload: Omit<Customer, "id">): Promise<Customer> {
  return request<Customer>("/customers", {
    method: "POST",
    body: payload
  });
}
