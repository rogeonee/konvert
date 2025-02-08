import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';

const ForwardedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <Button ref={ref} {...props} />,
);
ForwardedButton.displayName = 'ForwardedButton';

const MotionButton = motion(ForwardedButton);
MotionButton.displayName = 'MotionButton';

export default MotionButton;
