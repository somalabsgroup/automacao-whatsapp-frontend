'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, Eye, EyeOff } from 'lucide-react';
import { LoginBackground } from './LoginBackground';
import * as S from './styles';

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'somaclini.com.br';

function isSafeRedirect(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === BASE_DOMAIN ||
      parsed.hostname.endsWith(`.${BASE_DOMAIN}`) ||
      parsed.hostname === 'localhost' ||
      parsed.hostname.endsWith('.localhost')
    );
  } catch {
    return false;
  }
}

export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Redireciona — window.location garante reload completo para o middleware ler a sessão
    if (redirect && isSafeRedirect(redirect)) {
      window.location.href = redirect;
    } else {
      // Redireciona para raiz, middleware fará rewrite para /app/[tenant]/...
      window.location.href = '/dashboard';
    }
  };

  return (
    <>
      <LoginBackground />
      <S.Container>
        <S.Card>
          <S.Header>
            <S.Logo>
              <S.LogoIcon>
                <MessageSquare />
              </S.LogoIcon>
              <S.LogoText>SomaClini</S.LogoText>
            </S.Logo>
            <S.Subtitle>Atendimento Inteligente via WhatsApp</S.Subtitle>
          </S.Header>

          <S.Form onSubmit={handleLogin}>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.FormGroup>
              <S.Label htmlFor="email">Email</S.Label>
              <S.Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={loading}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="password">Senha</S.Label>
              <S.InputWrapper>
                <S.Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  $hasIcon
                  required
                />
                <S.TogglePasswordButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </S.TogglePasswordButton>
              </S.InputWrapper>
            </S.FormGroup>

            <S.Button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </S.Button>
          </S.Form>
        </S.Card>

        <S.Footer>
          <S.FooterText>
            © 2026 SomaClini | Atendimento Inteligente
          </S.FooterText>
        </S.Footer>
      </S.Container>
    </>
  );
}
