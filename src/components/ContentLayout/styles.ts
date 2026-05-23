import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const ConversationPanel = styled.div.attrs<{ $width: number }>(props => ({
  style: {
    width: `${props.$width}px`,
    minWidth: `${props.$width}px`,
    maxWidth: `${props.$width}px`,
  },
}))<{ $width: number }>`
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 300px !important;
    min-width: 300px !important;
    max-width: 300px !important;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Resizer = styled.div<{ $isResizing: boolean }>`
  width: 4px;
  height: 100%;
  background-color: ${({ $isResizing }) => ($isResizing ? '#14b8a6' : 'transparent')};
  cursor: col-resize;
  flex-shrink: 0;
  transition: background-color 0.2s;
  position: relative;

  &:hover {
    background-color: #14b8a6;
  }

  &::after {
    content: '';
    position: absolute;
    left: -2px;
    right: -2px;
    top: 0;
    bottom: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  background-color: #f9fafb;
`;
