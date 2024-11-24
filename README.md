# Encryption/Decryption Application Documentation

## Overview

The Encryption/Decryption Application is a modern web application built with Next.js for the client side and the backend for the business logic that provides secure message encryption, digital signatures, and X.509 certificate management. It supports multiple encryption algorithms including RSA and ElGamal.

![Home Page](https://cloudkul.com/blog/wp-content/uploads/2024/04/symmetric-cryptography.png)

---

### Supervised by:
**Pr. Abderrahim GHADI**

### Created by:
**Anas ZENAGUI**

---

## Table of Contents
1. [Features Overview](#features-overview)
    - [Home Page](#1-home-page)
    - [Encryption Page](#2-encryption-page)
    - [Decryption Page](#3-decryption-page)
2. [API Integration](#api-integration)
    - [Encryption API](#encryption-api)
3. [Security Features](#security-features)
    - [RSA Implementation](#1-rsa-implementation)
    - [ElGamal Implementation](#2-elgamal-implementation)
    - [Digital Signatures](#3-digital-signatures)
4. [Usage Guide](#usage-guide)
    - [Encrypting a Message](#1-encrypting-a-message)
    - [Creating a Digital Signature](#2-creating-a-digital-signature)
    - [Generating a Certificate](#3-generating-a-certificate)
    - [Decrypting a Message](#4-decrypting-a-message)
    - [Verifying a Signature](#5-verifying-a-signature)
5. [Conclusion](#conclusion)

---

## Features Overview

### 1. Home Page
The home page serves as the starting point for users, providing an overview of the application's purpose and functionalities.

![screencapture-localhost-3000-2024-11-24-14_39_36](https://github.com/user-attachments/assets/74297dba-5dd4-43df-8f9d-a48e011be82b)


**Main Content:**
- **Encrypt Section**
  - **Title:** "Encrypt"
  - **Description:** "Transform your messages into secure, encrypted data"
  - **Button:** "Go to Encryption"
- **Decrypt Section**
  - **Title:** "Decrypt"
  - **Description:** "Decode encrypted messages back to their original form"
  - **Button:** "Go to Decryption"

---

### 2. Encryption Page
This page facilitates message encryption using algorithms such as RSA and ElGamal.

![screencapture-localhost-3000-encrypt-2024-11-24-14_38_55](https://github.com/user-attachments/assets/6e7fcb95-aeac-4ace-ac5c-1e0a720cd4fe)


**User Interface:**
- A seamless experience for selecting encryption algorithms, inputting messages, and generating encrypted outputs.

---

### 3. Decryption Page
This page handles message decryption and signature verification.

![screencapture-localhost-3000-decrypt-2024-11-24-14_40_11](https://github.com/user-attachments/assets/6d72e880-7107-471b-8ad5-068290735f3d)


**User Interface:**
- Allows users to decrypt messages and verify digital signatures effectively.

---

## API Integration

### Encryption API
Details regarding the implementation and integration of the encryption API.

---

## Security Features

### 1. RSA Implementation
- **Key size:** 2048 bits
- **Padding:** PKCS#1 v1.5
- **Random Number Generation:** Secure and cryptographically strong

### 2. ElGamal Implementation
- **Prime field arithmetic**
- **Secure parameter generation**
- **Key exchange protocol**

### 3. Digital Signatures
- Implementation details for creating and verifying digital signatures.

---

## Usage Guide

### 1. Encrypting a Message

![screencapture-localhost-3000-encrypt-2024-11-24-15_11_14](https://github.com/user-attachments/assets/012bec39-9726-4c81-91bc-57f4b6556838)

- Select the encryption algorithm (RSA/ElGamal).
- Enter the message.
- Click "Encrypt Message."
- Copy the Base64 encoded output.

### 2. Creating a Digital Signature

![screencapture-localhost-3000-encrypt-2024-11-24-15_12_01](https://github.com/user-attachments/assets/f39601ae-976f-47a5-8751-48f987836741)

- Enter the message to sign.
- Click "Sign Message."
- Save the generated signature.

### 3. Generating a Certificate

![screencapture-localhost-3000-encrypt-2024-11-24-15_13_16](https://github.com/user-attachments/assets/d09787b4-a919-4c98-8401-830ce9104fb1)

- Fill in the certificate details.
- Click "Generate Certificate."
- Download the X.509 certificate.

### 4. Decrypting a Message

![screencapture-localhost-3000-decrypt-2024-11-24-15_16_34](https://github.com/user-attachments/assets/e41248b2-9020-41cb-bea8-dc71251cafc9)

- Select the encryption algorithm (RSA/ElGamal).
- Enter the encrypted message.
- Click "Decrypt Message."

### 5. Verifying a Signature

![screencapture-localhost-3000-decrypt-2024-11-24-15_19_06](https://github.com/user-attachments/assets/7036822a-7992-468f-8e5c-a836c4cb8e53)

- Select the encryption algorithm (RSA/ElGamal).
- Enter the original message.
- Enter the digital signature.

---

## Conclusion
This application simplifies and secures the encryption and decryption of messages using robust algorithms. It is user-friendly, reliable, and provides a solid foundation for enhancing data security solutions.

---
