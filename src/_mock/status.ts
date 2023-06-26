// types
type StatusColor = {
    [key: string] : string,
};

// static status colors
export const statusColor: StatusColor = {
    error: '#ff2f2fe0',
    information: '#9095f7',
    warning: '#FF8D4F',
    success: '#00C851',
    pending: '#FFA500',
};

// static status types
const statusType: string[] = [
    'error',
    'information',
    'pending',
    'success',
    'warning'
];

export default statusType;