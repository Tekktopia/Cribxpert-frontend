import { useState, useCallback } from 'react';

type TitleType = 'success' | 'error' | 'info' | 'warning';

interface TitleState {
  isOpen: boolean;
  type: TitleType;
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const initialState: TitleState = {
  isOpen: false,
  type: 'info',
  title: '',
  message: '',
};

export const useTitle = () => {
  const [titleState, setTitleState] = useState<TitleState>(initialState);

  const showTitle = useCallback((
    type: TitleType,
    title: string,
    message: string,
    primaryAction?: TitleState['primaryAction'],
    secondaryAction?: TitleState['secondaryAction']
  ) => {
    setTitleState({
      isOpen: true,
      type,
      title,
      message,
      primaryAction,
      secondaryAction,
    });
  }, []);

  const hideTitle = useCallback(() => {
    setTitleState(initialState);
  }, []);

  // Quick shortcuts for common modals
  const showSuccess = useCallback((title: string, message: string, onDone?: () => void) => {
    showTitle('success', title, message, {
      label: 'Done',
      onClick: () => {
        hideTitle();
        onDone?.();
      },
    });
  }, [showTitle, hideTitle]);

  const showError = useCallback((title: string, message: string, onRetry?: () => void) => {
    showTitle('error', title, message, {
      label: 'Try Again',
      onClick: () => {
        hideTitle();
        onRetry?.();
      },
    });
  }, [showTitle, hideTitle]);

  const showConfirm = useCallback((
    title: string, 
    message: string, 
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showTitle(
      'warning',
      title,
      message,
      {
        label: 'Confirm',
        onClick: () => {
          hideTitle();
          onConfirm();
        },
      },
      {
        label: 'Cancel',
        onClick: () => {
          hideTitle();
          onCancel?.();
        },
      }
    );
  }, [showTitle, hideTitle]);

  return {
    titleState,
    showTitle,
    hideTitle,
    showSuccess,
    showError,
    showConfirm,
  };
};