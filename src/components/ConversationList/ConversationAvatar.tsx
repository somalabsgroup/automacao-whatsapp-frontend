import styled from 'styled-components';
import { AvatarColor } from '@/types';

const AvatarContainer = styled.div<{ $color: AvatarColor }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  background: ${({ $color }) => {
    switch ($color) {
      case 'green':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
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

  &:hover {
    transform: scale(1.05);
  }
`;

interface ConversationAvatarProps {
  initials: string;
  color: AvatarColor;
}

export default function ConversationAvatar({ initials, color }: ConversationAvatarProps) {
  return <AvatarContainer $color={color}>{initials}</AvatarContainer>;
}
