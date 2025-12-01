import React from 'react';

const Card = ({
    children,
    variant = 'default',
    hover = true,
    className = '',
    onClick,
    ...props
}) => {
    const baseClasses = 'card';

    const variantClasses = {
        default: '',
        glass: 'glass',
        'glass-dark': 'glass-dark',
    };

    const hoverClasses = hover ? 'hover-lift cursor-pointer' : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

    return (
        <div
            className={classes}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
