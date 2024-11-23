import base64
import random
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from Crypto.Util.number import inverse, GCD
from Crypto.Util import number
import hashlib
import subprocess
from pathlib import Path
import tempfile

# Create FastAPI instance
app = FastAPI()

# Allow CORS from all origins (for development purposes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# === Models for Data Validation ===
class Message(BaseModel):
    message: str

class CipherText(BaseModel):
    cipherText: str

class Signature(BaseModel):
    signature: str
    message: str

class CertificateRequest(BaseModel):
    common_name: str
    country: str
    state: str
    locality: str
    organization: str
    organizational_unit: str
    email: str

# === RSA Implementation with Block Encryption ===
class RSA:
    def __init__(self):
        self.p = number.getPrime(512)  # Large prime number
        self.q = number.getPrime(512)  # Large prime number
        self.n = self.p * self.q  # Modulus
        self.phi = (self.p - 1) * (self.q - 1)
        self.e = self._generate_e()
        self.d = inverse(self.e, self.phi)
        self.block_size = (self.n.bit_length() // 8) - 1  # Block size in bytes

    def _generate_e(self):
        e = random.randint(2, self.phi - 1)
        while GCD(e, self.phi) != 1:
            e = random.randint(2, self.phi - 1)
        return e

    def encrypt(self, message):
        message_bytes = message.encode('utf-8')  # Convert string to bytes
        encrypted_blocks = []
        for i in range(0, len(message_bytes), self.block_size):
            block = message_bytes[i:i + self.block_size]  # Split message into blocks
            block_int = int.from_bytes(block, byteorder='big')  # Convert block to integer
            cipher_int = pow(block_int, self.e, self.n)  # Encrypt the block
            encrypted_blocks.append(cipher_int.to_bytes((cipher_int.bit_length() + 7) // 8, byteorder='big'))
        encrypted_message = base64.b64encode(b''.join(encrypted_blocks)).decode('utf-8')  # Combine and encode
        return encrypted_message

    def decrypt(self, cipher_base64):
        cipher_bytes = base64.b64decode(cipher_base64)  # Decode Base64
        decrypted_blocks = []
        for i in range(0, len(cipher_bytes), self.block_size + 1):
            block = cipher_bytes[i:i + self.block_size + 1]  # Extract encrypted block
            block_int = int.from_bytes(block, byteorder='big')  # Convert block to integer
            decrypted_int = pow(block_int, self.d, self.n)  # Decrypt the block
            decrypted_blocks.append(decrypted_int.to_bytes((decrypted_int.bit_length() + 7) // 8, byteorder='big'))
        decrypted_message = b''.join(decrypted_blocks).decode('utf-8')  # Combine and decode
        return decrypted_message
      
    
    def sign(self, message):
        hash_value = int(hashlib.sha256(message.encode()).hexdigest(), 16)  # Hash the message
        signature = pow(hash_value, self.d, self.n)  # Sign using the private key
        return base64.b64encode(signature.to_bytes((signature.bit_length() + 7) // 8, 'big')).decode('utf-8')

    def verify_signature(self, message, signature_base64):
        signature = int.from_bytes(base64.b64decode(signature_base64), 'big')
        hash_from_signature = pow(signature, self.e, self.n)  # Decrypt the signature
        hash_value = int(hashlib.sha256(message.encode()).hexdigest(), 16)
        return hash_from_signature == hash_value

# === ElGamal Implementation ===
class ElGamal:
    def __init__(self):
        self.p = number.getPrime(512)
        self.g = random.randint(2, self.p - 1)
        self.x = random.randint(2, self.p - 2)
        self.y = pow(self.g, self.x, self.p)

    def encrypt(self, message):
        m = int.from_bytes(message.encode('utf-8'), 'big')  # Convert string to big integer
        k = random.randint(2, self.p - 2)
        c1 = pow(self.g, k, self.p)  # First part of ciphertext
        c2 = (m * pow(self.y, k, self.p)) % self.p  # Second part of ciphertext
        cipher = base64.b64encode(c1.to_bytes((c1.bit_length() + 7) // 8, 'big') + c2.to_bytes((c2.bit_length() + 7) // 8, 'big')).decode('utf-8')
        return cipher

    def decrypt(self, cipher_base64):
        cipher = base64.b64decode(cipher_base64)  # Decode from base64
        c1 = int.from_bytes(cipher[:len(cipher)//2], 'big')  # Extract first part of ciphertext
        c2 = int.from_bytes(cipher[len(cipher)//2:], 'big')  # Extract second part of ciphertext
        s = pow(c1, self.x, self.p)
        m = (c2 * inverse(s, self.p)) % self.p
        message_bytes = m.to_bytes((m.bit_length() + 7) // 8, 'big')
        message = message_bytes.decode('utf-8')
        return message
      
    def sign(self, message):
        hash_value = int(hashlib.sha256(message.encode()).hexdigest(), 16) % self.p
        k = random.randint(2, self.p - 2)
        while GCD(k, self.p - 1) != 1:
            k = random.randint(2, self.p - 2)
        r = pow(self.g, k, self.p)
        s = (inverse(k, self.p - 1) * (hash_value - self.x * r)) % (self.p - 1)
        return base64.b64encode(r.to_bytes((r.bit_length() + 7) // 8, 'big') + s.to_bytes((s.bit_length() + 7) // 8, 'big')).decode('utf-8')

    def verify_signature(self, message, signature_base64):
        signature = base64.b64decode(signature_base64)
        r = int.from_bytes(signature[:len(signature)//2], 'big')
        s = int.from_bytes(signature[len(signature)//2:], 'big')
        if r <= 0 or r >= self.p:
            return False
        hash_value = int(hashlib.sha256(message.encode()).hexdigest(), 16) % self.p
        v1 = pow(self.g, hash_value, self.p)
        v2 = (pow(self.y, r, self.p) * pow(r, s, self.p)) % self.p
        return v1 == v2
      
# === Certificate Generation ===
def generate_certificate(request: CertificateRequest):
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            key_path = Path(temp_dir) / "private.key"
            csr_path = Path(temp_dir) / "request.csr"
            cert_path = Path(temp_dir) / "certificate.crt"

            # Generate a private key
            subprocess.run(["openssl", "genrsa", "-out", str(key_path), "2048"], check=True)

            # Generate a CSR
            subprocess.run([
                "openssl", "req", "-new", "-key", str(key_path), "-out", str(csr_path),
                "-subj",
                f"/C={request.country}/ST={request.state}/L={request.locality}/O={request.organization}/OU={request.organizational_unit}/CN={request.common_name}/emailAddress={request.email}"
            ], check=True)

            # Generate a self-signed certificate
            subprocess.run([
                "openssl", "x509", "-req", "-days", "365", "-in", str(csr_path),
                "-signkey", str(key_path), "-out", str(cert_path)
            ], check=True)

            # Read and return the certificate
            with open(cert_path, "r") as cert_file:
                certificate = cert_file.read()

            return certificate
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Certificate generation failed: {str(e)}")

# === Instances for Encryption Systems ===
rsa = RSA()
elgamal = ElGamal()

# === FastAPI Endpoints ===

@app.post("/{algorithm}/encrypt")
def encrypt_message(algorithm: str, data: Message):
    try:
        if algorithm == "rsa":
            encrypted = rsa.encrypt(data.message)
        elif algorithm == "elgamal":
            encrypted = elgamal.encrypt(data.message)
        else:
            raise HTTPException(status_code=400, detail="Invalid algorithm")
        return {"encryptedMessage": encrypted}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/{algorithm}/decrypt")
def decrypt_message(algorithm: str, data: CipherText):
    try:
        if algorithm == "rsa":
            decrypted = rsa.decrypt(data.cipherText)
        elif algorithm == "elgamal":
            decrypted = elgamal.decrypt(data.cipherText)
        else:
            raise HTTPException(status_code=400, detail="Invalid algorithm")
        return {"decryptedMessage": decrypted}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/{algorithm}/sign")
def sign_message(algorithm: str, data: Message):
    try:
        if algorithm == "rsa":
            signature = rsa.sign(data.message)
        elif algorithm == "elgamal":
            signature = elgamal.sign(data.message)
        else:
            raise HTTPException(status_code=400, detail="Invalid algorithm")
        return {"signature": signature}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/{algorithm}/verify_signature")
def verify_signature(algorithm: str, data: Signature):
    try:
        if algorithm == "rsa":
            is_valid = rsa.verify_signature(data.message, data.signature)
        elif algorithm == "elgamal":
            is_valid = elgamal.verify_signature(data.message, data.signature)
        else:
            raise HTTPException(status_code=400, detail="Invalid algorithm")
        return {"isValid": is_valid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-certificate")
def create_certificate(request: CertificateRequest):
    try:
        certificate = generate_certificate(request)
        return {"certificate": certificate}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))