"use client"
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { encryptMessage, signMessage, verifyMessage } from "@/lib/axios"; // Import new functions

export default function EncryptPage() {
  const [algorithm, setAlgorithm] = useState("rsa");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [signature, setSignature] = useState<string | null>(null); // To hold the signature
  const [verificationResult, setVerificationResult] = useState<string | null>(null); // For verification result
  const [isLoading, setIsLoading] = useState(false);

  const handleEncrypt = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message to encrypt");
      return;
    }

    setIsLoading(true);
    try {
      const { encryptedMessage: result } = await encryptMessage(algorithm, message);
      setEncryptedMessage(result);
      toast.success("Message encrypted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred during encryption");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message to sign");
      return;
    }

    setIsLoading(true);
    try {
      const { signature: result } = await signMessage(algorithm, message);
      setSignature(result);
      toast.success("Message signed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred during signing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!signature || !message.trim()) {
      toast.error("Please enter a valid message and signature to verify");
      return;
    }

    setIsLoading(true);
    try {
      const { isValid } = await verifyMessage(algorithm, message, signature);
      setVerificationResult(isValid ? "Signature is valid" : "Signature is invalid");
      toast.success("Verification result received!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Encrypt, Sign, and Verify Message</h1>
        <p className="text-muted-foreground">
          Enter your message and choose an encryption algorithm.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="algorithm">Encryption Algorithm</Label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rsa">RSA</SelectItem>
              <SelectItem value="elgamal">ElGamal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <Button
          onClick={handleEncrypt}
          disabled={isLoading || !message.trim()}
          className="w-full"
        >
          {isLoading ? "Encrypting..." : "Encrypt Message"}
        </Button>

        {encryptedMessage && (
          <div className="space-y-2">
            <Label htmlFor="encrypted">Encrypted Message</Label>
            <Textarea
              id="encrypted"
              value={encryptedMessage}
              readOnly
              rows={4}
            />
          </div>
        )}

        <Button
          onClick={handleSign}
          disabled={isLoading || !message.trim()}
          className="w-full"
        >
          {isLoading ? "Signing..." : "Sign Message"}
        </Button>

        {signature && (
          <div className="space-y-2">
            <Label htmlFor="signature">Signature</Label>
            <Textarea
              id="signature"
              value={signature}
              readOnly
              rows={4}
            />
          </div>
        )}

        <Button
          onClick={handleVerify}
          disabled={isLoading || !message.trim() || !signature}
          className="w-full"
        >
          {isLoading ? "Verifying..." : "Verify Signature"}
        </Button>

        {verificationResult && (
          <div className="space-y-2">
            <Label htmlFor="verificationResult">Verification Result</Label>
            <Textarea
              id="verificationResult"
              value={verificationResult}
              readOnly
              rows={4}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
