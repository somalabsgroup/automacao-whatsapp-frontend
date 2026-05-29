import styled from 'styled-components';
import { AvatarColor, MessageSender, MessageStatus } from '@/types';

// ============= ChatContainer =============
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.chat.areaBg};
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.placeholder};
  gap: 1.5rem;
  padding: 2rem;
`;

export const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.brand.primary};
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

export const EmptyStateText = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.text.muted};
  font-weight: 500;
  text-align: center;
  max-width: 280px;
  line-height: 1.5;
`;

// ============= ChatHeader =============
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.chat.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.875rem 1.125rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PatientAvatar = styled.div<{ $color: AvatarColor }>`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  background: ${({ $color }) => {
    switch ($color) {
      case 'green':
        return 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)';
      case 'orange':
        return 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
      case 'red':
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      case 'purple':
        return 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)';
      case 'blue':
        return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
      default:
        return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  }};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`;

export const PatientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const PatientName = styled.h2`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  letter-spacing: -0.01em;
`;

export const PatientPhone = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.muted};
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const StatusIndicator = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    opacity: 0.3;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text.muted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.bg.tertiary};
    color: ${({ theme }) => theme.brand.primary};
    transform: scale(1.05);
  }

  &:active {
    background-color: ${({ theme }) => theme.border.default};
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 52px;
  right: 8px;
  background: ${({ theme }) => theme.dropdown.bg};
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: ${({ theme }) => theme.dropdown.bg};
  color: ${({ $danger, theme }) => ($danger ? '#ef4444' : theme.dropdown.text)};
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.dangerHoverBg : theme.dropdown.hoverBg};
    transform: translateX(2px);
  }

  &:active {
    background-color: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.dangerActiveBg : theme.dropdown.activeBg};
    transform: translateX(0);
  }

  svg {
    flex-shrink: 0;
  }
`;

// ============= MessagesArea =============
export const MessagesArea = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.chat.areaBg};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      ${({ theme }) => theme.chat.dotColor} 1px,
      transparent 1px
    );
    background-size: 20px 20px;
    opacity: 0.4;
    pointer-events: none;
  }
`;

export const MessagesScroll = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LoadMoreIndicator = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme.text.muted};
  font-size: 0.8125rem;
  font-weight: 500;
  gap: 0.5rem;
  align-items: center;
  
  &::before,
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.5;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  &::before {
    animation-delay: 0s;
  }
  
  &::after {
    animation-delay: 0.75s;
  }
`;

export const DateDivider = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.75rem 0;
`;

export const DateLabel = styled.span`
  background-color: ${({ theme }) => theme.chat.dateLabelBg};
  color: ${({ theme }) => theme.chat.dateLabelText};
  padding: 0.375rem 0.875rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

// ============= MessageBubble =============

export const MessageMenuTrigger = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s, background 0.15s;
  z-index: 5;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.28);
  }
`;

export const MessageMenuDropdown = styled.div`
  position: absolute;
  bottom: 32px;
  top: auto;
  right: 6px;
  background: ${({ theme }) => theme.dropdown.bg};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  z-index: 100;
  overflow: hidden;
  min-width: 140px;
  animation: slideUp 0.15s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MessageMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  background: ${({ theme }) => theme.dropdown.bg};
  color: ${({ $danger, theme }) => ($danger ? '#ef4444' : theme.dropdown.text)};
  font-size: 0.8125rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.dangerHoverBg : theme.dropdown.hoverBg};
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(0);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const MessageContainer = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    padding: 0 0.375rem;
  }
`;

export const RetryButton = styled.button`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

export const MessageBubble = styled.div<{
  $sender: MessageSender;
  $hasError?: boolean;
  $isDeleted?: boolean;
}>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: ${({ $sender }) => 
    $sender === 'human' || $sender === 'ai' 
      ? '1rem 1rem 0.25rem 1rem' 
      : '1rem 1rem 1rem 0.25rem'
  };
  position: relative;
  background: ${({ $sender, $isDeleted, theme }) => {
    if ($isDeleted)
      return $sender === 'human' || $sender === 'ai' ? 'rgba(20, 184, 166, 0.5)' : theme.chat.inboundBg;
    if ($sender === 'human' || $sender === 'ai') 
      return 'linear-gradient(135deg, #14b8a6 0%, #0891B2 100%)';
    return theme.chat.inboundBg;
  }};
  color: ${({ $sender, $isDeleted, theme }) => {
    if ($isDeleted)
      return $sender === 'human' || $sender === 'ai'
        ? 'rgba(255,255,255,0.55)'
        : theme.text.muted;
    if ($sender === 'human' || $sender === 'ai') return '#ffffff';
    return theme.chat.inboundText;
  }};
  opacity: ${({ $isDeleted }) => ($isDeleted ? 0.7 : 1)};
  box-shadow: ${({ $sender }) => 
    $sender === 'human' || $sender === 'ai'
      ? '0 2px 8px rgba(20, 184, 166, 0.25)'
      : '0 1px 3px rgba(0, 0, 0, 0.08)'
  };
  border: ${({ $hasError, $isDeleted, $sender, theme }) =>
    $isDeleted
      ? '1px dashed rgba(0,0,0,0.15)'
      : $hasError
      ? '1px solid #ef4444'
      : $sender === 'patient' 
      ? `1px solid ${theme.border.default}`
      : 'none'};
  word-wrap: break-word;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ $sender }) => 
      $sender === 'human' || $sender === 'ai'
        ? '0 4px 12px rgba(20, 184, 166, 0.3)'
        : '0 2px 6px rgba(0, 0, 0, 0.12)'
    };
  }

  &:hover ${MessageMenuTrigger} {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MessageText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MessageAttachmentContainer = styled.div`
  margin-top: 0.25rem;
`;

export const MessageImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const MessageDocument = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background-color: rgba(0, 0, 0, 0.08);\n  border-radius: 0.625rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
    transform: translateX(2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateX(0);
  }
`;

export const DocumentIcon = styled.div`
  color: currentColor;
  opacity: 0.7;
`;

export const DocumentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const DocumentName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DocumentSize = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 0.125rem;
`;

export const MessageFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

export const MessageTime = styled.span`
  font-size: 0.6875rem;
  opacity: 0.7;
`;

export const EditedLabel = styled.span`
  font-size: 0.625rem;
  opacity: 0.6;
  font-style: italic;
`;

export const DeletedLabel = styled.span`
  font-size: 0.625rem;
  font-style: italic;
  opacity: 0.75;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const MessageStatusIcon = styled.span<{ $status: MessageStatus }>`
  display: flex;
  align-items: center;
  opacity: 0.7;

  color: ${({ $status }) => {
    if ($status === 'read') return '#10b981';
    if ($status === 'failed') return '#ef4444';
    return 'currentColor';
  }};
`;

// ============= MessageInput =============
export const InputContainer = styled.div`
  background-color: ${({ theme }) => theme.chat.headerBg};
  border-top: 1px solid ${({ theme }) => theme.border.default};
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.25rem;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
  }
`;

export const InputField = styled.textarea`
  flex: 1;
  min-height: 44px;
  max-height: 120px;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.border.default};
  border-radius: 1.5rem;
  font-size: 0.9375rem;
  font-family: inherit;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.chat.inputBg};
  resize: none;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.brand.primary};
    background-color: ${({ theme }) => theme.chat.inputFocusBg};
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.95);
    box-shadow: 0 1px 4px rgba(20, 184, 166, 0.3);
  }

  &:disabled {
    background: ${({ theme }) => theme.border.strong};
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 1rem;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border.default};
  animation: slideUp 0.2s ease;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AttachmentPreview = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background-color: ${({ theme }) => theme.chat.inputBg};
  border-top: 1px solid ${({ theme }) => theme.border.default};
  overflow-x: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bg.tertiary};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.brand.primary};
    border-radius: 3px;
    
    &:hover {
      background: ${({ theme }) => theme.brand.hover};
    }
  }
`;

export const AttachmentItem = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const AttachmentImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.brand.primary};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const AttachmentDocument = styled.div`
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  background-color: ${({ theme }) => theme.chat.attachmentDocBg};
  border: 2px solid ${({ theme }) => theme.brand.primary};
  border-radius: 0.5rem;
  padding: 0.625rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const AttachmentName = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.muted};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

export const RemoveAttachmentButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 9px rgba(239, 68, 68, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

// ============= Inline Edit =============

export const EditTextarea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  resize: none;
  font-family: inherit;
  min-height: 64px;
  box-sizing: border-box;
  transition: all 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.375rem;
  justify-content: flex-end;
  margin-top: 0.375rem;
`;

export const EditButton = styled.button<{ $primary?: boolean }>`
  padding: 0.375rem 0.875rem;
  font-size: 0.8125rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-weight: 500;
  border: none;

  ${({ $primary }) =>
    $primary
      ? `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:hover { 
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%);
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }
    &:active {
      transform: translateY(0);
    }
  `
      : `
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.25);
    &:hover { 
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.95);
    }
  `}
`;
