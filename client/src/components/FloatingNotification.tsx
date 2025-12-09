import { useEffect, useState } from 'react';
import { TrendingUp, X } from 'lucide-react';

export interface Notification {
  id: string;
  name: string;
  scoreIncrease: number;
  timeAgo?: string;
}

interface FloatingNotificationProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

/**
 * FloatingNotification Component
 * Design: Futuristic glassmorphism with neon effects
 * Displays floating notifications of score increases
 */
export default function FloatingNotification({ notifications, onRemove }: FloatingNotificationProps) {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 space-y-3 pointer-events-none z-50">
      {notifications.map((notification, index) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

interface NotificationCardProps {
  notification: Notification;
  index: number;
  onRemove: (id: string) => void;
}

function NotificationCard({ notification, index, onRemove }: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(notification.id), 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  return (
    <div
      className={`glass rounded-lg p-4 border border-green-400/50 shadow-2xl pointer-events-auto transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : 'opacity-0 translate-x-full translate-y-4'
      }`}
      style={{
        animation: isVisible ? `slideInRight 0.4s ease-out 0.${index * 100}s both` : 'none',
        background: 'rgba(0, 255, 136, 0.05)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 mt-1">
            <TrendingUp className="w-5 h-5 text-green-400 glow-green animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-300">
              {notification.name}
            </p>
            <p className="text-xs text-green-300/70 mt-1">
              +{notification.scoreIncrease} pontos no Score
            </p>
            {notification.timeAgo && (
              <p className="text-xs text-green-300/50 mt-0.5">
                {notification.timeAgo}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(notification.id), 300);
          }}
          className="flex-shrink-0 text-green-400/60 hover:text-green-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 animate-pulse" />
      </div>
    </div>
  );
}
