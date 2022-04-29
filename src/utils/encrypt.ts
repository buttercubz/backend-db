import { crypto } from "https://deno.land/std@0.137.0/crypto/mod.ts";

const toHexString = (bytes: ArrayBuffer): string =>
  new Uint8Array(bytes).reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    ""
  );

export async function Encript(password: string) {
  const buffer = await crypto.subtle.digest(
    "SHA3-512",
    new TextEncoder().encode(password)
  );

  return toHexString(buffer);
}
