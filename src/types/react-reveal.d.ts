// Type declarations for react-reveal
declare module 'react-reveal/Fade' {
  interface FadeProps {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
    delay?: number
    children: React.ReactNode
  }
  
  export default function Fade(props: FadeProps): JSX.Element
}
