import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', external: false },
    { path: '/tools', label: 'AI Tools', external: false },
    { path: '/prompts', label: 'Prompts', external: false },
    { path: 'https://ainsiderai.substack.com/', label: 'Blog', external: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <img src="/images/ainsiderlogo.png" alt="Ainsider Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="gradient-text">Ainsider</span>
              <span className="text-foreground"> Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link font-medium ${isActive(link.path) ? 'text-primary' : ''
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://www.youtube.com/@macaistudio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="glow-effect">
                Subscribe
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 font-medium transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 font-medium transition-colors ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="https://www.youtube.com/@macaistudio"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2"
              >
                <Button variant="default" className="w-full">
                  Subscribe
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
