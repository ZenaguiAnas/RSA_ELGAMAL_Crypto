"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { decryptMessage } from "@/lib/axios";

export default function DecryptPage() {
  const [algorithm, setAlgorithm] = useState("rsa");
  const [cipherText, setCipherText] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
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

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Decrypt Message</h1>
        <p className="text-muted-foreground">
          Enter your encrypted message and choose the corresponding algorithm.
        </p>
      </div>

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
    </div>
  );
}