import { useEffect } from 'react';

const MSG = 'Você tem alterações não salvas. Deseja sair sem salvar?';

function getTargetPath(href: string): string {
  try {
    return href.startsWith('http')
      ? new URL(href).pathname
      : href.split('?')[0].split('#')[0];
  } catch {
    return href;
  }
}

export function useUnsavedWarning(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return;

    const original = window.history.pushState.bind(window.history);

    const removeAll = () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onNavClick, true);
      if (window.history.pushState === onPushState) {
        window.history.pushState = original;
      }
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const onPopState = () => {
      if (window.confirm(MSG)) {
        removeAll();
        window.history.back();
      } else {
        original(null, '', window.location.href);
      }
    };

    // Fase de captura: dispara antes do onClick da sidebar chamar router.push
    const onNavClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const targetPath = getTargetPath(href);
      if (!targetPath || targetPath === window.location.pathname) return;

      if (!window.confirm(MSG)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      } else {
        removeAll(); // evita dupla confirmação no override de pushState abaixo
      }
    };

    function onPushState(
      this: History,
      state: unknown,
      title: string,
      url?: string | URL | null,
    ): void {
      const target = url?.toString() ?? '';
      const targetPath = getTargetPath(target);
      const isSamePage = !target || targetPath === window.location.pathname;

      if (!isSamePage) {
        if (!window.confirm(MSG)) return;
        removeAll();
      }

      original.call(this, state, title, url);
    }

    window.addEventListener('beforeunload', onBeforeUnload);
    original(null, '', window.location.href); // estado sentinela para o popstate funcionar
    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onNavClick, true);
    window.history.pushState = onPushState;

    return removeAll;
  }, [isDirty]);
}
