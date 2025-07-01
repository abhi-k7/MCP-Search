'use client';

import { useState, useTransition } from 'react';
import { Star } from 'lucide-react';
import { toggleLike } from '@/actions/like.actions';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface LikeButtonProps {
  serverId: string;
  isLiked: boolean;
}

export function LikeButton({ serverId, isLiked: initialLiked }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = async () => {
    setIsLiked(!isLiked); // optimistic update
    startTransition(async () => {
      try {
        await toggleLike({ serverId });
      } catch (error) {
        setIsLiked(initialLiked); // rollback on failure
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 cursor-pointer"
      aria-label={isLiked ? 'Unlike server' : 'Like server'}
    >
      <Star
        className={cn(
          'w-6 h-6',
          isLiked && 'fill-yellow-400 text-yellow-400'
        )}
      />
    </button>
  );
}
