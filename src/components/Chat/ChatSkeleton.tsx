'use client';

import {
  ChatContainer as Container,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  PatientInfo,
  MessagesArea,
  MessagesScroll,
  InputContainer,
  InputWrapper,
  SkeletonCircle,
  SkeletonText,
  SkeletonBubbleRow,
  SkeletonBubbleBlock,
  SkeletonInputField,
} from './styles';

const BUBBLES: { align: 'left' | 'right'; w: string; h?: string }[] = [
  { align: 'left',  w: '45%' },
  { align: 'right', w: '55%' },
  { align: 'left',  w: '65%' },
  { align: 'left',  w: '38%' },
  { align: 'right', w: '32%' },
  { align: 'right', w: '50%' },
  { align: 'left',  w: '52%' },
];

export default function ChatSkeleton() {
  return (
    <Container>
      <HeaderContainer>
        <HeaderLeft>
          <SkeletonCircle $size="44px" />
          <PatientInfo>
            <SkeletonText $w="130px" $h="14px" />
            <SkeletonText $w="90px" $h="11px" />
          </PatientInfo>
        </HeaderLeft>
        <HeaderRight>
          <SkeletonCircle $size="40px" />
          <SkeletonCircle $size="40px" />
        </HeaderRight>
      </HeaderContainer>

      <MessagesArea>
        <MessagesScroll>
          {BUBBLES.map((b, i) => (
            <SkeletonBubbleRow key={i} $align={b.align}>
              <SkeletonBubbleBlock $w={b.w} $h={b.h} />
            </SkeletonBubbleRow>
          ))}
        </MessagesScroll>
      </MessagesArea>

      <InputContainer>
        <InputWrapper>
          <SkeletonCircle />
          <SkeletonInputField />
          <SkeletonCircle />
        </InputWrapper>
      </InputContainer>
    </Container>
  );
}
