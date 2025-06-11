import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { loginService } from '@/services/authService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginService(username, password);
      login(userData);
      alert(`Login berhasil sebagai ${userData.userType}!`);
      // navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <img src="/assets/image.png" alt="Logo El Ngadu" className="w-20 h-20 mx-auto mb-4" />
          <CardTitle className="text-2xl">Selamat Datang</CardTitle>
          <CardDescription>Masukkan kredensial Anda untuk masuk.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
                Belum punya akun?{' '}
                <Link to="/register" className="underline font-medium hover:text-primary">
                    Daftar di sini
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
