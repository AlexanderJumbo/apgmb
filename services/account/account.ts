import { AccountForm } from "@/components/shared/Modal";
import { BASE_URL } from "@/config";
import { AccountRequest } from "@/models/account/accountRequest";

export const saveAccount = async (account: AccountRequest, jwt: string) => {
  //console.log("🚀 ~ saveAccount ~ account:", account);
  console.log("JSON enviado:", JSON.stringify(account));
  const res = await fetch(`${BASE_URL}account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(account),
  });
  console.log("res", res);
  if (!res.ok) throw new Error("Ocurrió un error");
  const data = await res.json();
  return data;
};

export const getAllAccounts = async (jwt: string) => {
  const res = await fetch(`${BASE_URL}account/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) throw new Error("Ocurrió un error");
  const data = await res.json();
  console.log("getAllAccounts", data);
  return data;
}

export const updateAccount = async (account: AccountForm, jwt: string) => {
  //console.log("🚀 ~ saveAccount ~ account:", account);
  console.log("JSON enviado:", JSON.stringify(account));
  const res = await fetch(`${BASE_URL}account/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(account),
  });
  console.log("res", res);
  if (!res.ok) throw new Error("Ocurrió un error");
  const data = await res.json();
  return data;
};