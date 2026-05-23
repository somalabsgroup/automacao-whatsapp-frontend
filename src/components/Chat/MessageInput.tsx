'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Smile, Paperclip, Send, X, FileText } from 'lucide-react';
import { AttachmentPreview, AttachmentItem, AttachmentImage, AttachmentDocument, AttachmentName, RemoveAttachmentButton, InputContainer, InputWrapper, ActionButton, HiddenFileInput, InputField, SendButton, EmojiPickerContainer } from './styles';

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Digite sua mensagem...',
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;

    onSendMessage(message.trim(), attachments.length > 0 ? attachments : undefined);
    setMessage('');
    setAttachments([]);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const isImage = (file: File) => file.type.startsWith('image/');

  return (
    <>
      {attachments.length > 0 && (
        <AttachmentPreview>
          {attachments.map((file, index) => (
            <AttachmentItem key={index}>
              {isImage(file) ? (
                <AttachmentImage src={getFilePreview(file)!} alt={file.name} />
              ) : (
                <AttachmentDocument>
                  <FileText size={24} />
                  <AttachmentName>{file.name}</AttachmentName>
                </AttachmentDocument>
              )}
              <RemoveAttachmentButton onClick={() => removeAttachment(index)}>
                <X size={16} />
              </RemoveAttachmentButton>
            </AttachmentItem>
          ))}
        </AttachmentPreview>
      )}

      <InputContainer>
        <InputWrapper>
          <ActionButton
            ref={emojiButtonRef}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji"
            type="button"
            disabled={disabled}
          >
            <Smile size={20} />
          </ActionButton>

          <ActionButton
            onClick={() => fileInputRef.current?.click()}
            title="Anexar arquivo"
            type="button"
            disabled={disabled}
          >
            <Paperclip size={20} />
          </ActionButton>

          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
          />

          <InputField
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
          />

          <SendButton
            onClick={handleSend}
            disabled={disabled || (!message.trim() && attachments.length === 0)}
            type="button"
            title="Enviar"
          >
            <Send size={20} />
          </SendButton>
        </InputWrapper>

        {showEmojiPicker && (
          <EmojiPickerContainer ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width="100%"
              height="350px"
              searchPlaceHolder="Buscar emoji..."
              previewConfig={{ showPreview: false }}
              skinTonesDisabled={true}
            />
          </EmojiPickerContainer>
        )}
      </InputContainer>
    </>
  );
}
