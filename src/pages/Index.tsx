import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  author: string;
  views: number;
  duration: string;
  thumbnail: string;
  category: string;
  uploadTime: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  likes: number;
  timestamp: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Захватывающее путешествие в горы',
    author: 'Александр Петров',
    views: 4160,
    duration: '8:42',
    thumbnail: '/img/383cf7a5-da77-412a-b58f-9ee325c39998.jpg',
    category: 'Путешествия',
    uploadTime: '2 дня назад'
  },
  {
    id: '2',
    title: 'Основы React в 2024 году',
    author: 'Код Мастер',
    views: 12500,
    duration: '15:30',
    thumbnail: '/img/06461ee1-c092-439f-bc3d-98566a62cedb.jpg',
    category: 'Технологии',
    uploadTime: '1 неделю назад'
  },
  {
    id: '3',
    title: 'Новая игра 2024: Полное прохождение',
    author: 'GamePro',
    views: 8900,
    duration: '12:15',
    thumbnail: '/img/9c355632-c4a5-46bd-8774-3d65bbd58c33.jpg',
    category: 'Игры',
    uploadTime: '3 дня назад'
  },
  {
    id: '4',
    title: 'Кулинарные секреты от шефа',
    author: 'Кухня Pro',
    views: 6780,
    duration: '10:22',
    thumbnail: '/img/383cf7a5-da77-412a-b58f-9ee325c39998.jpg',
    category: 'Кулинария',
    uploadTime: '5 дней назад'
  },
  {
    id: '5',
    title: 'Фитнес дома: эффективные упражнения',
    author: 'Здоровый образ',
    views: 3420,
    duration: '18:45',
    thumbnail: '/img/06461ee1-c092-439f-bc3d-98566a62cedb.jpg',
    category: 'Спорт',
    uploadTime: '1 день назад'
  },
  {
    id: '6',
    title: 'Музыкальный обзор новинок',
    author: 'Музыка Today',
    views: 5600,
    duration: '7:33',
    thumbnail: '/img/9c355632-c4a5-46bd-8774-3d65bbd58c33.jpg',
    category: 'Музыка',
    uploadTime: '4 дня назад'
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Иван Сидоров',
    text: 'Отличное видео! Очень познавательно и качественно снято.',
    likes: 24,
    timestamp: '2 часа назад'
  },
  {
    id: '2',
    author: 'Мария Козлова',
    text: 'Спасибо за такой подробный разбор темы. Жду продолжения!',
    likes: 15,
    timestamp: '4 часа назад'
  },
  {
    id: '3',
    author: 'Дмитрий Николаев',
    text: 'Классный контент, подписался на канал 👍',
    likes: 8,
    timestamp: '6 часов назад'
  }
];

const categories = ['Все', 'Технологии', 'Игры', 'Путешествия', 'Кулинария', 'Спорт', 'Музыка'];

export default function Index() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1240);

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}М`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}К`;
    return views.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Icon name="Menu" size={24} />
              </Button>
              <h1 className="text-2xl font-bold text-primary">VideoTube</h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-12 bg-secondary border-border"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  <Icon name="Search" size={20} />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Icon name="Upload" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarFallback>ПЛ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 min-h-screen bg-secondary/50 border-r border-border">
          <nav className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Home" size={20} className="mr-3" />
              Главная
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="TrendingUp" size={20} className="mr-3" />
              В тренде
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="User" size={20} className="mr-3" />
              Подписки
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Clock" size={20} className="mr-3" />
              История
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="PlaySquare" size={20} className="mr-3" />
              Ваши видео
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="ThumbsUp" size={20} className="mr-3" />
              Понравившиеся
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {selectedVideo ? (
            /* Video Player View */
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Video Player */}
                  <div className="aspect-video bg-black rounded-lg mb-4 relative overflow-hidden">
                    <img 
                      src={selectedVideo.thumbnail} 
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Button size="icon" className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary">
                        <Icon name="Play" size={32} className="ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{selectedVideo.title}</h1>
                    
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{selectedVideo.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{selectedVideo.author}</p>
                          <p className="text-sm text-muted-foreground">1.2М подписчиков</p>
                        </div>
                        <Button variant="outline">Подписаться</Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={isLiked ? "default" : "outline"}
                          onClick={handleLike}
                          className="space-x-2"
                        >
                          <Icon name="ThumbsUp" size={16} />
                          <span>{formatViews(likeCount)}</span>
                        </Button>
                        <Button variant="outline">
                          <Icon name="Share" size={16} className="mr-2" />
                          Поделиться
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Комментарии ({mockComments.length})</h3>
                    
                    <div className="flex space-x-3 mb-6">
                      <Avatar>
                        <AvatarFallback>Я</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Добавить комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                          >
                            Отправить
                          </Button>
                          <Button variant="ghost" size="sm">Отмена</Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {mockComments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <Avatar>
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm mb-2">{comment.text}</p>
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm" className="p-1">
                                <Icon name="ThumbsUp" size={16} className="mr-1" />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1">
                                <Icon name="ThumbsDown" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-xs">
                                Ответить
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar with related videos */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Рекомендуемые видео</h3>
                  {mockVideos.filter(v => v.id !== selectedVideo.id).slice(0, 8).map((video) => (
                    <Card 
                      key={video.id} 
                      className="cursor-pointer hover:bg-accent/10 transition-colors"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <CardContent className="p-3">
                        <div className="flex space-x-3">
                          <div className="relative w-40 aspect-video">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-full object-cover rounded"
                            />
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                              {video.duration}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                            <p className="text-xs text-muted-foreground mb-1">{video.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatViews(video.views)} просмотров • {video.uploadTime}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Video Grid View */
            <div className="container mx-auto px-4 py-6">
              {/* Categories */}
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-accent"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <Card 
                    key={video.id} 
                    className="group cursor-pointer hover:bg-accent/5 transition-all duration-200 hover:shadow-lg"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex space-x-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="text-xs">{video.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                              {video.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-1">{video.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatViews(video.views)} просмотров • {video.uploadTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Видео не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить поисковый запрос или категорию</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}