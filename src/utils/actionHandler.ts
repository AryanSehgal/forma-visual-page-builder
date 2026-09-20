import { ButtonAction } from '../types';

export interface ActionModalState {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText: string;
}

export interface ActionToastState {
  id: number;
  message: string;
}

export function handleButtonAction(
  action: ButtonAction | undefined,
  fallbackUrl: string = '#',
  showModal: (modal: ActionModalState) => void,
  showToast: (message: string) => void
) {
  if (!action) {
    if (fallbackUrl && fallbackUrl !== '#') {
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
    return;
  }

  switch (action.type) {
    case 'url': {
      const url = getSafeUrl(action.url || fallbackUrl || '#');
      if (!url) {
        showToast('Please enter a valid website URL or page anchor.');
        return;
      }
      if (url.startsWith('#')) {
        const elem = document.querySelector(url);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        const target = action.target || '_blank';
        if (target === '_blank') {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = url;
        }
      }
      break;
    }

    case 'scroll': {
      const blockId = action.targetBlockId;
      if (blockId) {
        // Try block ID element or section
        const target =
          document.getElementById(`block-${blockId}`) ||
          document.querySelector(`[data-block-id="${blockId}"]`) ||
          document.querySelector(`.f-block-${blockId}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      showToast('Scrolling to section...');
      break;
    }

    case 'modal': {
      showModal({
        isOpen: true,
        title: action.modalTitle || 'Action Triggered',
        message:
          action.modalMessage ||
          'You clicked an interactive button configured with a custom modal action.',
        buttonText: action.modalButtonText || 'Got it',
      });
      break;
    }

    case 'toast': {
      showToast(action.toastMessage || 'Button clicked successfully!');
      break;
    }

    case 'email': {
      const email = action.url || 'contact@example.com';
      const subject = encodeURIComponent(action.emailSubject || 'Inquiry');
      window.location.href = `mailto:${email}?subject=${subject}`;
      break;
    }

    case 'download': {
      const downloadUrl = getSafeUrl(action.downloadUrl || '');
      const fileName = action.downloadFileName || 'download';
      if (!downloadUrl) {
        showToast('Please add a valid file URL before downloading.');
        return;
      }
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading ${fileName}...`);
      break;
    }
  }
}

function getSafeUrl(value: string): string | null {
  const url = value.trim();
  if (!url) return null;

  // Support page anchors and relative asset paths as well as normal web URLs.
  if (url.startsWith('#') || url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return url;
  }

  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}
