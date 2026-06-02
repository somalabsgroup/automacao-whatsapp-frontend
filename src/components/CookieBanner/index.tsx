'use client';

import { useState, useEffect } from 'react';
import { X, Shield, Cookie } from 'lucide-react';
import * as S from './styles';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Sempre true, não pode desabilitar
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Verifica se já aceitou cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const rejectOptional = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <S.IconWrapper>
            <Cookie />
          </S.IconWrapper>
          <S.Title>Cookies e Privacidade</S.Title>
        </S.Header>

        <S.Content>
          <S.Description>
            Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego do site. 
            Ao clicar em "Aceitar Todos", você concorda com o uso de todos os cookies. 
            Você pode gerenciar suas preferências a qualquer momento.
          </S.Description>

          {showDetails && (
            <S.DetailsSection>
              <S.CookieType>
                <S.CookieHeader>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    id="necessary"
                  />
                  <label htmlFor="necessary">
                    <strong>Cookies Necessários</strong> (Obrigatórios)
                  </label>
                </S.CookieHeader>
                <S.CookieDescription>
                  Essenciais para o funcionamento básico do site, incluindo autenticação e segurança.
                </S.CookieDescription>
              </S.CookieType>

              <S.CookieType>
                <S.CookieHeader>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    id="analytics"
                  />
                  <label htmlFor="analytics">
                    <strong>Cookies Analíticos</strong>
                  </label>
                </S.CookieHeader>
                <S.CookieDescription>
                  Ajudam a entender como os visitantes interagem com o site, coletando informações de forma anônima.
                </S.CookieDescription>
              </S.CookieType>

              <S.CookieType>
                <S.CookieHeader>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    id="marketing"
                  />
                  <label htmlFor="marketing">
                    <strong>Cookies de Marketing</strong>
                  </label>
                </S.CookieHeader>
                <S.CookieDescription>
                  Utilizados para exibir anúncios relevantes e medir a eficácia de campanhas publicitárias.
                </S.CookieDescription>
              </S.CookieType>
            </S.DetailsSection>
          )}
        </S.Content>

        <S.Footer>
          <S.Links>
            <S.Link href="/politica-privacidade" target="_blank">
              <Shield size={14} />
              Política de Privacidade
            </S.Link>
            <S.ToggleButton onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
            </S.ToggleButton>
          </S.Links>

          <S.Actions>
            <S.SecondaryButton onClick={rejectOptional}>
              Rejeitar Opcionais
            </S.SecondaryButton>
            
            {showDetails && (
              <S.SecondaryButton onClick={saveCustomPreferences}>
                Salvar Preferências
              </S.SecondaryButton>
            )}
            
            <S.PrimaryButton onClick={acceptAll}>
              Aceitar Todos
            </S.PrimaryButton>
          </S.Actions>
        </S.Footer>
      </S.Container>
    </S.Overlay>
  );
}
