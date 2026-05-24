import styled from 'styled-components';
import { AvatarColor, MessageSender, MessageStatus } from '@/types';

// ============= ChatContainer =============
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9fafb;
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  gap: 1rem;
`;

export const EmptyStateIcon = styled.div`
  color: #d1d5db;
`;

export const EmptyStateText = styled.p`
  font-size: 1rem;
  color: #6b7280;
`;

// ============= ChatHeader =============
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;

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
  color: #111827;
`;

export const PatientPhone = styled.span`
  font-size: 0.8125rem;
  color: #6b7280;
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
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  &:active {
    background-color: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ============= MessagesArea =============
export const MessagesArea = styled.div`
  flex: 1;
  overflow: hidden;
  background: linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
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

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

export const DateDivider = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.75rem 0;
`;

export const DateLabel = styled.span`
  background-color: #e5e7eb;
  color: #6b7280;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 500;
`;

// ============= MessageBubble =============
export const MessageContainer = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.375rem;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    padding: 0 0.375rem;
  }
`;

export const MessageBubble = styled.div<{ $sender: MessageSender }>`
  max-width: 70%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ $sender }) => {
    if ($sender === 'human' || $sender === 'ai') return '#14b8a6';
    return '#ffffff';
  }};
  color: ${({ $sender }) => {
    if ($sender === 'human' || $sender === 'ai') return '#ffffff';
    return '#111827';
  }};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

export const SenderLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.9;
`;

export const BotLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.95;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::before {
    content: '🤖';
    font-size: 0.875rem;
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
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  position: relative;
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
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  font-size: 0.9375rem;
  font-family: inherit;
  color: #111827;
  background-color: #f9fafb;
  resize: none;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #14b8a6;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
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
  background-color: #14b8a6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: #0f9688;
  }

  &:active:not(:disabled) {
    background-color: #0d7a6f;
  }

  &:disabled {
    background-color: #d1d5db;
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
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
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
  border-radius: 0.375rem;
  border: 2px solid #e5e7eb;
`;

export const AttachmentDocument = styled.div`
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem;
`;

export const AttachmentName = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
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

// ============= Alerts & Notices =============
export const KeywordAlert = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  margin: 1rem 0;
  background-color: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 0.5rem;
  color: #92400e;
`;

export const KeywordAlertIcon = styled.div`
  flex-shrink: 0;
  color: #f59e0b;
`;

export const KeywordAlertText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
`;

export const KeywordList = styled.p`
  font-size: 0.8125rem;
  margin: 0;
  opacity: 0.8;
`;

export const TransferredNotice = styled.div`
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  background-color: #ccfbf1;
  border: 1px solid #14b8a6;
  border-radius: 0.5rem;
  color: #0f766e;
  font-size: 0.875rem;
  text-align: center;
`;
