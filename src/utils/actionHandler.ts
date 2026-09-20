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
      const url = action.url || fallbackUrl || '#';
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
      const downloadUrl = action.downloadUrl || '#';
      const fileName = action.downloadFileName || 'download';
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
