// packages
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Icon } from '@iconify/react';

// types
interface IconifyProps {
    icon: string;
    width?: number | string;
    sx?: Record<string, unknown>;
}

const Iconify: ForwardRefRenderFunction<HTMLSpanElement, IconifyProps> = (
    { icon, width = 20, sx, ...other },
    ref
) => (
    <span
        ref={ref}
        style={{ width, height: width, ...sx }}
        {...other}
    >
        <Icon icon={icon} width={width} height={width} className='iconify-icon' />
    </span>
);

export default forwardRef(Iconify);