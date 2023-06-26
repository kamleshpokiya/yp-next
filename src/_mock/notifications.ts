// types
type Notification = {
    title: string,
    description: string,
};

// static notifications
const notifications: Notification[] = [
    { title: 'New Message', description: 'You have a new message from John Doe' },
    { title: 'Package Delivered', description: 'Your package has been delivered to your front porch' },
    { title: 'New Update Available', description: 'A new software update is available for your device, click here to install' },
    { title: 'Event Reminder', description: 'Don&#39;t forget, you have a meeting with the marketing team at 2 PM' },
    { title: 'Payment Due', description: 'Your credit card payment is due in 3 days, please make a payment to avoid late fees' },
    { title: 'Flight Update', description: 'Your flight to New York has been delayed by 2 hours, please check your new departure time' },
    { title: 'Breaking News', description: 'A major earthquake has occurred in Japan, stay tuned for updates' }
];

export default notifications;