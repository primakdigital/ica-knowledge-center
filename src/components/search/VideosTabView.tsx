"use client";

import * as React from "react";

interface VideoResult {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  source: string;
  date?: string;
  views?: number;
  instructor?: string;
}

interface VideosTabViewProps {
  results: VideoResult[];
  isLoading?: boolean;
  onVideoClick: (id: string) => void;
}

export function VideosTabView({ results, isLoading, onVideoClick }: VideosTabViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🎬</span>
        </div>
        <h3 className="font-mono text-lg font-bold text-gray-900 mb-2">
          לא נמצאו סרטונים
        </h3>
        <p className="font-mono text-sm text-gray-500">
          נסה לחפש במילות מפתח אחרות
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {results.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoClick(video.id)}
        />
      ))}
    </div>
  );
}

interface VideoCardProps {
  video: VideoResult;
  onClick: () => void;
}

function VideoCard({ video, onClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group w-full text-start bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-gray-400 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
            <span className="text-5xl opacity-50">🎬</span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <span className="text-2xl mr-[-4px]">▶</span>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded font-mono text-xs">
          {video.duration}
        </div>

        {/* Source Badge */}
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded font-mono text-xs text-gray-700">
          {video.source}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-mono text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-700 transition-colors">
          {video.title}
        </h3>

        <p className="font-mono text-xs text-gray-600 line-clamp-2 mb-2">
          {video.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            {video.instructor && (
              <span>👤 {video.instructor}</span>
            )}
            {video.date && (
              <span>{video.date}</span>
            )}
          </div>

          {video.views && (
            <span>👁️ {video.views.toLocaleString()}</span>
          )}
        </div>
      </div>
    </button>
  );
}

// Featured video card (larger)
export function FeaturedVideoCard({ video, onClick }: VideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-start bg-white border-2 border-gray-300 rounded-2xl overflow-hidden transition-all hover:border-purple-400 hover:shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Thumbnail */}
        <div className="relative aspect-video md:aspect-auto bg-gray-100">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
              <span className="text-6xl opacity-50">🎬</span>
            </div>
          )}

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <span className="text-3xl mr-[-4px]">▶</span>
            </div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1.5 rounded-lg font-mono text-sm">
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-center">
          <span className="inline-block w-fit mb-3 bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-mono text-xs font-bold">
            סרטון מומלץ
          </span>

          <h3 className="font-mono text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
            {video.title}
          </h3>

          <p className="font-mono text-sm text-gray-600 mb-4 line-clamp-3">
            {video.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
            {video.instructor && (
              <span className="flex items-center gap-1">
                <span>👤</span> {video.instructor}
              </span>
            )}
            <span className="flex items-center gap-1">
              <span>📺</span> {video.source}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default VideosTabView;
