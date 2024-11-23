"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { decryptMessage, verifySignature } from "@/lib/axios";
import { UnlockIcon, CheckCircleIcon } from "lucide-react";

export default function DecryptPage() {
  const [algorithm, setAlgorithm] = useState("rsa");
  const [cipherText, setCipherText] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrypt = async () => {
    if (!cipherText.trim()) {
      toast.error("Please enter a cipher text to decrypt");
      return;
    }

    setIsLoading(true);
    try {
      const { decryptedMessage: result } = await decryptMessage(algorithm, cipherText);
      setDecryptedMessage(result);
      toast.success("Message decrypted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred during decryption");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!message.trim() || !signature.trim()) {
      toast.error("Please enter both message and signature");
      return;
    }

    setIsLoading(true);
    try {
      const { isValid } = await verifySignature(algorithm, message, signature);
      setVerificationResult(isValid);
      toast.success(isValid ? "Signature verified successfully!" : "Invalid signature!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "An error occurred during verification");
      setVerificationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Message Verification</h1>
        <p className="text-muted-foreground">
          Decrypt messages and verify digital signatures.
        </p>
      </div>

      <Tabs defaultValue="decrypt" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decrypt" className="space-x-2">
            <UnlockIcon className="h-4 w-4" />
            <span>Decrypt</span>
          </TabsTrigger>
          <TabsTrigger value="verify" className="space-x-2">
            <CheckCircleIcon className="h-4 w-4" />
            <span>Verify Signature</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="decrypt">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="algorithm">Decryption Algorithm</Label>
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
              <Label htmlFor="cipherText">Encrypted Message</Label>
              <Textarea
                id="cipherText"
                placeholder="Enter the encrypted message here..."
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              onClick={handleDecrypt} 
              disabled={isLoading || !cipherText.trim()}
              className="w-full"
            >
              {isLoading ? "Decrypting..." : "Decrypt Message"}
            </Button>

            {decryptedMessage && (
              <div className="space-y-2">
                <Label htmlFor="decrypted">Decrypted Message</Label>
                <Textarea
                  id="decrypted"
                  value={decryptedMessage}
                  readOnly
                  rows={4}
                />
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="algorithm">Verification Algorithm</Label>
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
              <Label htmlFor="message-to-verify">Original Message</Label>
              <Textarea
                id="message-to-verify"
                placeholder="Enter the original message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature-to-verify">Digital Signature</Label>
              <Textarea
                id="signature-to-verify"
                placeholder="Enter the signature..."
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              onClick={handleVerify} 
              disabled={isLoading || !message.trim() || !signature.trim()}
              className="w-full"
            >
              {isLoading ? "Verifying..." : "Verify Signature"}
            </Button>

            {verificationResult !== null && (
              <div className={`p-4 rounded-lg ${verificationResult ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <p className="text-center font-medium">
                  {verificationResult ? 'Valid signature ✓' : 'Invalid signature ✗'}
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}