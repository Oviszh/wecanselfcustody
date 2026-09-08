---
title: 硬件钱包
description: 硬件钱包（冷钱包）的本质是「签名设备」：为什么它有能力把你的私钥传出去，以及使用硬件钱包应守住的几条底线纪律。
---

## 硬件钱包 = 签名设备

### 请叫它「签名设备」，而不是「硬件钱包」

2016 年，Trezor 网站进行了重大改版，将叙述从「钱包」改为「签名设备」。很少有人知道，Trezor 从第一天起几乎就能作为 SSH、GPG、U2F 和 FIDO2 的签名器。改名导致 Trezor 销量大减——人们搜索时用的仍然是「硬件钱包」这样的关键字。但**我们至少应该在心里把「比特币硬件钱包」改名为「比特币签名设备」**。

### 硬件钱包有能力把私钥传出去

<figure class="tweet">
  <img src="/pictures/ledger1.png" alt="Nov 2022: A firmware update cannot extract the private keys from the Secure Element — Ledger" />
  <figcaption>2022 年 11 月 · Ledger 客服回复：「你好——你的私钥永远不会离开 Secure Element 芯片，它从未被攻破……固件更新无法从 Secure Element 中提取私钥。」</figcaption>
</figure>

<figure class="tweet">
  <img src="/pictures/ledger2.png" alt="May 2023: Technically speaking it is and always has been possible to write firmware that facilitates key extraction — Ledger" />
  <figcaption>2023 年 5 月 · Ledger 客服：「从技术上讲，编写能提取私钥的固件，过去是、现在也一直是可能的。无论你是否知情，你其实一直都在信任 Ledger 不会部署这样的固件。」（该推文随后被官方删除）</figcaption>
</figure>

必须假设所有的硬件钱包都有能力在一次固件升级后把我们的主私钥上传到服务器，基于这一假设,本文给出使用硬件钱包时应守住的几条底线纪律——不依赖厂商的承诺,只依赖你自己守得住的规则。

### 使用硬件钱包的纪律

1. **只当签名设备用**：不用硬件钱包生成助记词。
2. **不使用无 passphrase 的钱包**：这样即使助记词泄露，别人也不确定这套助记词背后有没有隐藏钱包。很多人在无 passphrase 的钱包里存少量币作为「诱饵钱包」，但随着 BIP39 的普及，这个诱饵只会告诉别人：这套助记词背后用 passphrase 藏着更多的币，请投入资源破解吧。
3. **导入助记词后不再连接官方 App**：改搭配第三方开源钱包软件使用，如 Electrum、Sparrow。
4. **访问隐藏钱包不通过官方 App 输入 passphrase**：Trezor 这类硬件钱包搭配 Electrum、Sparrow 使用 passphrase 的体感很顺畅，没有任何问题。

2026 年的 Coldcard 事件让不少人对硬件钱包产生质疑。**但只要坚持以上纪律，硬件钱包作为一个签名设备还是很安全的。**
