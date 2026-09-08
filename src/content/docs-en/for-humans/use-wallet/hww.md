---
title: Hardware Wallet
description: A hardware wallet (cold wallet) is really a signing device — why it technically can send your private keys out, and the bottom-line rules to follow when using one.
---

## A hardware wallet = a signing device

### Call it a "signing device", not a "hardware wallet"

In 2016, Trezor gave its website a major redesign and changed the narrative from "wallet" to "signing device". Few people know that Trezor could act as a signer for SSH, GPG, U2F, and FIDO2 almost from day one. The rename hurt Trezor's sales badly — people still search with keywords like "hardware wallet". But **we should at least rename "Bitcoin hardware wallet" to "Bitcoin signing device" in our own heads**.

### A hardware wallet is capable of transmitting your private keys

<figure class="tweet">
  <img src="/pictures/ledger1.png" alt="Nov 2022: A firmware update cannot extract the private keys from the Secure Element — Ledger" />
  <figcaption>Nov 2022 · Ledger Support replied: "Hi — your private keys never leave the Secure Element chip, which has never been hacked… a firmware update cannot extract the private keys from the Secure Element."</figcaption>
</figure>

<figure class="tweet">
  <img src="/pictures/ledger2.png" alt="May 2023: Technically speaking it is and always has been possible to write firmware that facilitates key extraction — Ledger" />
  <figcaption>May 2023 · Ledger Support: "Technically speaking, it is and always has been possible to write firmware that facilitates key extraction. You have always trusted Ledger not to deploy such firmware, whether you knew it or not." (The tweet was later deleted.)</figcaption>
</figure>

Assume that every hardware wallet is capable of uploading the master private key to a server with a single firmware update. Based on that assumption, this article sets out a few bottom-line rules for using one — rules that depend not on a manufacturer's promises, but on what you can actually stick to yourself.

### Rules for using a hardware wallet

1. **Signing device only** — never generate seed words on the hardware wallet.
2. **Never use a passphrase-less wallet** — that way, even if the seed words leak, nobody can be sure whether a hidden wallet sits behind them. Many people keep a small amount in a passphrase-less wallet as a "decoy", but now that BIP39 is everywhere, the decoy only tells an attacker: there are more coins hidden behind a passphrase on this seed — go ahead and spend resources cracking it.
3. **Once the seed words are imported, never connect the official app again** — pair the device with third-party open-source wallet software such as Electrum or Sparrow instead.
4. **Never type the passphrase into the official app to reach the hidden wallet** — with a Trezor-style hardware wallet paired with Electrum or Sparrow, using a passphrase is smooth and completely problem-free.

The 2026 Coldcard incident made many people question hardware wallets. **But as long as you stick to the rules above, a hardware wallet remains very safe as a signing device.**
