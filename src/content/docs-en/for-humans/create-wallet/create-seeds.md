---
title: Generate a Seed Phrase with Dice
description: "How to generate a BIP39 seed phrase with dice: 11 dice, 10 minutes, zero trust in any wallet's random number generator — a trust-minimized way to create a universe-grade 12/24-word mnemonic, using a binary-indexed BIP39 word list."
date: 2026-08-19
draft: false
---

## Why generate seed words with dice

1. **Seed generation is the highest-risk step.** It is the most important — and least controllable — step in the whole flow. The 2026 Coldcard incident warns us: stop outsourcing this most important step to any software or hardware wallet.
2. **Simple and trust-minimized.** Ten minutes and you've generated a seed phrase yourself. Never again worry that your seed words might be compromised — so why not?

> **Spend ten minutes and generate a seed phrase with universe-grade security.**
> Why keep agonizing over whether a wallet really has a "true random number generator"? Or whether it really "draws on multiple entropy sources"?

## The trust-minimized method

### What you'll need

1. **Eleven six-sided dice** (no "casino grade" needed — toy-grade dice are fine). Eleven dice rolled at once produce exactly one word; if you only have one or two dice, that also works — you'll just roll more times.
2. **Pen and paper.**
3. **A BIP39 word list with binary indexes** (the version where each entry is numbered in 11-bit binary), downloaded and opened offline.
   - Open this site's [BIP39 words list](https://selfcustodyforhumans.com/tools/bip39-words-list/) — right-click, "Save As", keep the file locally, and use it with the network disconnected.
   - A BIP39 word list with 11-bit binary indexes:

     ![BIP39 word list](/pictures/bip39-list0.png)

     ![BIP39 word list with binary indexes](/pictures/bip39-list1.png)

### Generating the first 11 (or 23) words

1. Roll all 11 dice at once. Suppose the result is `45211635542`.

   ![Rolling 11 dice at once](/pictures/dice-1roll.jpg)

2. Convert to binary by hand: `10100100011`. The rule:

   | Die roll | Binary bit |
   |---|---|
   | 1, 3, 5 (odd) | 0 |
   | 2, 4, 6 (even) | 1 |

3. Look up `10100100011` in the [BIP39 word list](https://selfcustodyforhumans.com/tools/bip39-words-list) and find the corresponding word: `piece`.

   ![Finding the word in the list](/pictures/findword.png)

4. Repeat the rolls until you have the first 11 words (12-word seed) or 23 words (24-word seed).

> **A word of caution:** do all 11 (or 23) rolls in one continuous session. Never discard a roll because the word seems "unlucky" or you don't like it — throwing results away breaks the randomness with your own hands.

### Generating the last word

Once you have the first 11 (or 23) words, here's how the last word is derived:

1. **12-word seed:** the final roll needs only 7 dice, giving 7 bits. Those join the 128 bits you've already rolled; take the first 4 bits of the SHA-256 hash and append them to the 7, making 11 bits — which give you the last word exactly as in the steps above.
2. **24-word seed:** the final roll needs only 3 dice, giving 3 bits. Those join the 256 bits you've rolled; take the first 8 bits of the SHA-256 hash and append them, making 11 bits — again the last word.

> Computing SHA-256 by hand is theoretically possible but extremely tedious and error-prone. The safest approach is to use wallet software that can list the valid last words, or a lightweight offline tool. There are many such tools — search around.

You can also use this site's [last-word-calculator.html](https://selfcustodyforhumans.com/tools/last-word-calculator/) — right-click, "Save As", save it locally, and run it offline. Enter your first 11 (or 23) words and it automatically lists every valid last word; pick any one. Delete the file when you're done.

<video autoplay loop muted playsinline preload="metadata">
  <source src="/videos/last-word.webm" type="video/webm" />
</video>

**Verify:** open the offline wallet software or hardware signer you plan to use day to day, choose "import / restore seed words", and type in the complete phrase from your paper. As long as the wallet accepts it and raises no validation error (such as Invalid Checksum or an invalid mnemonic), the last word we calculated is confirmed correct.

## Generating seed words with roll-seeds.html

If the method above feels too slow or too fiddly, there's a one-stop tool: [roll-seeds.html](https://selfcustodyforhumans.com/tools/roll-seeds/) — right-click, "Save As", save it locally, and run it with the network disconnected.

Roll your 11 dice and each roll instantly generates a word:

<video autoplay loop muted playsinline preload="metadata">
  <source src="/videos/1roll-1word.webm" type="video/webm" />
</video>

[Full tutorial video](https://youtu.be/0ldzW-uFV5Y):

<iframe
  src="https://www.youtube.com/embed/0ldzW-uFV5Y"
  title="Generate Your BIP39 Seeds with Dice"
  allowfullscreen>
</iframe>

> **Assume every software tool has a back door or a bug** — including this site's roll-seeds.html. Keep to these two rules and the HTML tool has no room to cheat:
> 1. Check every word yourself and confirm each one came from your own dice (roll-seeds.html is designed so every step is easy to verify).
> 2. Run it 100% offline, and delete the file when you're done.

## Other dice schemes

You may have seen other dice-based schemes elsewhere:

| Scheme | How it works |
|---|---|
| **Coldcard** | Roll ordinary six-sided dice repeatedly, run SHA-256 over all the results, then convert to a seed phrase. Each roll contributes roughly 2.6 bits of entropy, so you roll fewer times — but a hash you can't do in your head now sits between your dice and your words. |
| **Blockstream Jade** | Two 16-sided dice plus one 8-sided die — efficient, one BIP39 word per roll. But polyhedral dice are less common than six-sided ones, and the more faces a die has, the harder it is to manufacture and calibrate; subtle geometric or weight biases become harder to notice. |

I recommend 11 six-sided dice:

1. **Minimal trust.** Every step is easy to verify, so a backdoored tool has nowhere to hide.
2. **High fault tolerance.** No "casino grade" dice needed — the easiest-to-find six-sided dice work. Even if a few of the 11 are rough or off-center, the whole ensemble still provides extremely high-quality entropy.
3. **Easy and fast.** Once you actually start rolling, 11 dice are easy to handle and easy to shuffle thoroughly — and no slower than other methods.

## Seed generation is the highest-risk step

There has been a long trail of such incidents:

| When | Incident |
|---|---|
| August 2013 | Android SecureRandom vulnerability |
| November 2013 | BitAddress.org entropy concerns |
| April 2023 | Trust Wallet browser-extension 32-bit entropy flaw |
| February 2024 | Trust Wallet iOS timestamp-entropy flaw |

**The 2026 Coldcard randomness crisis** was catastrophic: for years they touted their hardware TRNG, dual Secure Elements, and multiple entropy sources — and it turned out that for five years the firmware had been bypassing all of those hardware RNGs.

There will be more news like this in the future.

> **Roll the dice — and never worry about randomness again!**
