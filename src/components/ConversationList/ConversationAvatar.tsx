import styled from 'styled-components';
import { AvatarColor } from '@/types';

const AvatarContainer = styled.div<{ $color: AvatarColor }>`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;
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

interface ConversationAvatarProps {
  initials: string;
  color: AvatarColor;
}

export default function ConversationAvatar({ initials, color }: ConversationAvatarProps) {
  return <AvatarContainer $color={color}>{initials}</AvatarContainer>;
}
