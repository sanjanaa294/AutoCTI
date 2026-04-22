import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LogOut, Shield, User, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, role } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const getRoleIcon = (userRole: string) => {
    switch (userRole) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'analyst':
        return <Activity className="w-4 h-4" />;
      case 'viewer':
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (userRole: string) => {
    switch (userRole) {
      case 'admin':
        return 'bg-destructive/20 text-destructive border-destructive/20';
      case 'analyst':
        return 'bg-primary/20 text-primary border-primary/20';
      case 'viewer':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">AutoCTI</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/dashboard">
                <Button 
                  variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'} 
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
              {role === 'admin' && (
  <>
    <Link to="/admin">
      <Button
        variant={location.pathname === '/admin' ? 'secondary' : 'ghost'}
        size="sm"
      >
        Admin
      </Button>
    </Link>

    <Link to="/admin/users">
      <Button
        variant={location.pathname === '/admin/users' ? 'secondary' : 'ghost'}
        size="sm"
      >
        Users
      </Button>
    </Link>

    <Link to="/admin/models">
      <Button
        variant={location.pathname === '/admin/models' ? 'secondary' : 'ghost'}
        size="sm"
      >
        Models
      </Button>
    </Link>
  </>
)}

            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {user && (
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(role || '')}`}>
                  {getRoleIcon(role || '')}
                  <span className="capitalize">{role}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {user.username}
                </span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;