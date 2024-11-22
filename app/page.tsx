import { LockIcon, UnlockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Encryption & Decryption App</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure your messages using industry-standard encryption algorithms like RSA and ElGamal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockIcon className="h-5 w-5" />
              Encrypt
            </CardTitle>
            <CardDescription>
              Transform your messages into secure, encrypted data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/encrypt" passHref>
              <Button className="w-full">
                Go to Encryption
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UnlockIcon className="h-5 w-5" />
              Decrypt
            </CardTitle>
            <CardDescription>
              Decode encrypted messages back to their original form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/decrypt" passHref>
              <Button className="w-full" variant="secondary">
                Go to Decryption
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}