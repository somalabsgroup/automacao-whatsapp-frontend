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
  gap: 1rem;
`;

export const EmptyStateIcon = styled.div`
  color: ${({ theme }) => theme.border.strong};
`;

export const EmptyStateText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text.muted};
`;

// ============= ChatHeader =============
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.chat.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.625rem 1rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PatientAvatar = styled.div<{ $color: AvatarColor }>`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  background-color: ${({ $color }) => {
    switch ($color) {
      case 'green':
        return '#10b981';
      case 'orange':
        return '#f97316';
      case 'red':
        return '#ef4444';
      case 'purple':
        return '#a855f7';
      case 'blue':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  }};
`;

export const PatientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const PatientName = styled.h2`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
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
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  width: 36px;
  height: 36px;
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
    color: ${({ theme }) => theme.text.primary};
  }

  &:active {
    background-color: ${({ theme }) => theme.border.default};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 48px;
  right: 8px;
  background: ${({ theme }) => theme.dropdown.bg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
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
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.dangerHoverBg : theme.dropdown.hoverBg};
  }

  &:active {
    background-color: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.dangerActiveBg : theme.dropdown.activeBg};
  }

  svg {
    flex-shrink: 0;
  }
`;

// ============= MessagesArea =============
export const MessagesArea = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: ${({ theme }) => theme.chat.areaBg};
  background-image: radial-gradient(
    circle,
    ${({ theme }) => theme.chat.dotColor} 1px,
    transparent 1px
  );
  background-size: 20px 20px;
`;

export const MessagesScroll = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0.75rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DateDivider = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.75rem 0;
`;

export const DateLabel = styled.span`
  background-color: ${({ theme }) => theme.chat.dateLabelBg};
  color: ${({ theme }) => theme.chat.dateLabelText};
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 500;
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
  bottom: 28px;
  top: auto;
  right: 6px;
  background: ${({ theme }) => theme.dropdown.bg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  z-index: 100;
  overflow: hidden;
  min-width: 136px;
`;

export const MessageMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  background: ${({ theme }) => theme.dropdown.bg};
  color: ${({ $danger, theme }) => ($danger ? '#ef4444' : theme.dropdown.text)};
  font-size: 0.8125rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.dangerHoverBg : theme.dropdown.hoverBg};
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
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  border: none;
  background-color: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    background-color: #dc2626;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const MessageBubble = styled.div<{
  $sender: MessageSender;
  $hasError?: boolean;
  $isDeleted?: boolean;
}>`
  max-width: 70%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  position: relative;
  background-color: ${({ $sender, $isDeleted, theme }) => {
    if ($isDeleted)
      return $sender === 'human' || $sender === 'ai' ? '#0d9488' : theme.chat.inboundBg;
    if ($sender === 'human' || $sender === 'ai') return theme.brand.primary;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: ${({ $hasError, $isDeleted }) =>
    $isDeleted
      ? '1px dashed rgba(0,0,0,0.15)'
      : $hasError
      ? '1px solid #ef4444'
      : 'none'};
  word-wrap: break-word;
  transition: opacity 0.2s;

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
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
`;

export const MessageAttachmentContainer = styled.div`
  margin-top: 0.25rem;
`;

export const MessageImage = styled.img`
  max-width: 100%;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const MessageDocument = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
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
  transition: background-color 0.2s ease;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;

  @media (max-width: 768px) {
    padding: 0.625rem 0.75rem;
  }
`;

export const InputField = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 1.25rem;
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.brand.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.hover};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.active};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.border.strong};
    cursor: not-allowed;
  }
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 1rem;
  z-index: 1000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const AttachmentPreview = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.chat.inputBg};
  border-top: 1px solid ${({ theme }) => theme.border.default};
  overflow-x: auto;
`;

export const AttachmentItem = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const AttachmentImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
  border: 2px solid ${({ theme }) => theme.chat.attachmentBorder};
`;

export const AttachmentDocument = styled.div`
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.chat.attachmentDocBg};
  border: 2px solid ${({ theme }) => theme.chat.attachmentBorder};
  border-radius: 0.375rem;
  padding: 0.5rem;
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
  background-color: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dc2626;
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
  border-radius: 0.375rem;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.4;
  padding: 0.375rem 0.5rem;
  resize: none;
  font-family: inherit;
  min-height: 56px;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.375rem;
  justify-content: flex-end;
  margin-top: 0.375rem;
`;

export const EditButton = styled.button<{ $primary?: boolean }>`
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${({ $primary }) =>
    $primary
      ? `
    background: rgba(255, 255, 255, 0.25);
    color: #ffffff;
    &:hover { background: rgba(255, 255, 255, 0.35); }
  `
      : `
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    &:hover { background: rgba(255, 255, 255, 0.1); }
  `}
`;
