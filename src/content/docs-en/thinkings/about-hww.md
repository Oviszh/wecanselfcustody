---
title: On Hardware Wallets
description: Three ways to think about hardware wallets (cold wallets) — call it a "signing device", private keys can technically leave the device, and the rules for using all hardware wallets.
---

## We should rename "Bitcoin hardware wallets" to "Bitcoin signing devices"

In 2016, Trezor gave its website a major redesign and changed its story from "wallet" to "signing device". Few people know that from day one, Trezors could act as signers for SSH, GPG, U2F, and FIDO2. The rename hurt Trezor's sales badly — people still search with keywords like "hardware wallet" — but **we should at least complete this rename in our own heads**.

## The 2026 Coldcard incident

In 2026, Coldcard — a well-known Bitcoin hardware signer — exposed a security bug that had lain dormant for five years: during a code refactor, a check condition was written wrong, so wallet seeds were generated without ever calling the hardware random number generator. Instead, an extremely weak software pseudo-random number generator was used, and large numbers of users had their coins stolen. All along, those users' coins had been resting on a fragile seed phrase.

The incident began to shake people's faith in hardware wallets. But in my view, a hardware wallet **used purely as a signing device** is still an excellent vehicle.

## Technically, private keys can leave a hardware wallet

Ledger Recover proved that, technically, private keys can leave the device — it just hadn't been switched on before: "Technically speaking, it is and always has been possible to write firmware that facilitates key extraction."

You must assume the possibility exists: a single firmware-update process could upload the private keys inside the device to a server.

## Hardware wallet best practices

1. Once the seed words are imported, never connect the hardware wallet to its vendor's official app again.
2. Pair it with third-party open-source wallet software such as Electrum or Sparrow — and enter the passphrase there too.
