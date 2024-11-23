"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { encryptMessage, signMessage, generateCertificate } from "@/lib/axios";
import { LockIcon } from "lucide-react";
import { SignatureIcon, CertificateIcon } from "@/components/ui/icons";

interface CertificateForm {
  common_name: string;
  country: string;
  state: string;
  locality: string;
  organization: string;
  organizational_unit: string;
  email: string;
}

export default function EncryptPage() {
  const [algorithm, setAlgorithm] = useState("rsa");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificateForm, setCertificateForm] = useState<CertificateForm>({
    common_name: "",
    country: "",
    state: "",
    locality: "",
    organization: "",
    organizational_unit: "",
    email: "",
  });
  const [certificate, setCertificate] = useState("");

  const handleEncrypt = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message to encrypt");
      return;
    }

    setIsLoading(true);
    try {
      const { encryptedMessage: result } = await encryptMessage(
        algorithm,
        message
      );
      setEncryptedMessage(result);
      toast.success("Message encrypted successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || "An error occurred during encryption"
      );
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
      toast.error(
        error.response?.data?.detail || "An error occurred during signing"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificateFormChange = (
    field: keyof CertificateForm,
    value: string
  ) => {
    if (field === "country" && value.length > 2) {
      toast.error("Country code must be exactly 2 letters (e.g., 'MA')");
      return;
    }

    setCertificateForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateCertificate = async () => {
    const emptyFields = Object.entries(certificateForm)
      .filter(([_, value]) => !value.trim())
      .map(([key, _]) => key);

    if (emptyFields.length > 0) {
      toast.error(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    setIsLoading(true);
    try {
      const { certificate: result } = await generateCertificate(
        certificateForm
      );
      setCertificate(result);
      toast.success("Certificate generated successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ||
          "An error occurred during certificate generation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Secure Message Processing
        </h1>
        <p className="text-muted-foreground">
          Encrypt, sign, and manage certificates for your messages.
        </p>
      </div>

      <Tabs defaultValue="encrypt" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="encrypt" className="space-x-2">
            <LockIcon className="h-4 w-4" />
            <span>Encrypt</span>
          </TabsTrigger>
          <TabsTrigger value="sign" className="space-x-2">
            <SignatureIcon className="h-4 w-4" />
            <span>Sign</span>
          </TabsTrigger>
          <TabsTrigger value="certificate" className="space-x-2">
            <CertificateIcon className="h-4 w-4" />
            <span>Certificate</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encrypt">
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
                <Label htmlFor="encrypted">Encrypted Message (Base64)</Label>
                <Textarea
                  id="encrypted"
                  value={encryptedMessage}
                  readOnly
                  rows={4}
                />
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="sign">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="algorithm">Signing Algorithm</Label>
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
              <Label htmlFor="message-to-sign">Message to Sign</Label>
              <Textarea
                id="message-to-sign"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              onClick={handleSign}
              disabled={isLoading || !message.trim()}
              className="w-full"
            >
              {isLoading ? "Signing..." : "Sign Message"}
            </Button>

            {signature && (
              <div className="space-y-2">
                <Label htmlFor="signature">Digital Signature</Label>
                <Textarea id="signature" value={signature} readOnly rows={4} />
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="certificate">
          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="common-name">Common Name (CN)</Label>
                <Input
                  id="common-name"
                  placeholder="e.g., John Doe"
                  value={certificateForm.common_name}
                  onChange={(e) =>
                    handleCertificateFormChange("common_name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="e.g., US"
                  value={certificateForm.country}
                  onChange={(e) =>
                    handleCertificateFormChange("country", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  placeholder="e.g., California"
                  value={certificateForm.state}
                  onChange={(e) =>
                    handleCertificateFormChange("state", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locality">Locality</Label>
                <Input
                  id="locality"
                  placeholder="e.g., San Francisco"
                  value={certificateForm.locality}
                  onChange={(e) =>
                    handleCertificateFormChange("locality", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="e.g., Company Inc."
                  value={certificateForm.organization}
                  onChange={(e) =>
                    handleCertificateFormChange("organization", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizational-unit">Organizational Unit</Label>
                <Input
                  id="organizational-unit"
                  placeholder="e.g., IT Department"
                  value={certificateForm.organizational_unit}
                  onChange={(e) =>
                    handleCertificateFormChange(
                      "organizational_unit",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g., john@example.com"
                  value={certificateForm.email}
                  onChange={(e) =>
                    handleCertificateFormChange("email", e.target.value)
                  }
                />
              </div>
            </div>

            <Button
              onClick={handleGenerateCertificate}
              disabled={
                isLoading ||
                Object.values(certificateForm).some((v) => !v.trim())
              }
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Certificate"}
            </Button>

            {certificate && (
              <div className="space-y-2">
                <Label htmlFor="certificate">X.509 Certificate</Label>
                <Textarea
                  id="certificate"
                  value={certificate}
                  readOnly
                  rows={8}
                />
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    const blob = new Blob([certificate], {
                      type: "text/plain",
                    });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "certificate.pem";
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  Download Certificate
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
