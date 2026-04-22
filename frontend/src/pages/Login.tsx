import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Loader2, AlertCircle, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, isLoading, isAuthenticated, role, seedAdmin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  useEffect(() => {
    // Seed admin on component mount
    const initializeAdmin = async () => {
      try {
        await seedAdmin();
      } catch (error) {
        console.error('Failed to seed admin:', error);
      }
    };
    initializeAdmin();
  }, [seedAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login({ username, password });
      toast({
        title: 'Login successful',
        description: `Welcome back, ${username}!`,
      });
      
      // Navigate based on role after successful login
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const fillCredentials = (type: 'admin' | 'analyst') => {
    switch (type) {
      case 'admin':
        setUsername('admin');
        setPassword('AutoCTI@123');
        break;
      case 'analyst':
        setUsername('analyst');
        setPassword('analyst123');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow-effect">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">AutoCTI</h1>
            <p className="text-muted-foreground">Cyber Threat Intelligence Platform</p>
          </div>
        </div>

        

        {/* Quick Access Buttons */}
        {/* Quick Access Buttons */}
<div className="w-full flex items-center justify-center">
  <div className="grid grid-cols-2 gap-4 w-2/3">
    <Button
      variant="outline"
      size="sm"
      onClick={() => fillCredentials('admin')}
      className="text-xs"
    >
      Admin
    </Button>

    <Button
      variant="outline"
      size="sm"
      onClick={() => fillCredentials('analyst')}
      className="text-xs"
    >
      Analyst
    </Button>
  </div>
</div>


        {/* Login Form */}
        <Card className="shadow-elevated">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="transition-smooth"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="transition-smooth"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Secure access powered by JWT authentication with RBAC
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;