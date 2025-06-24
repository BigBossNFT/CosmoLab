
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  read_time: number;
  published: boolean;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  author_name: string;
  created_at: string;
  updated_at: string;
}

const BlogAdmin = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const categories = [
    'ИИ Технологии',
    'Блокчейн',
    'О проекте',
    'Кейсы',
    'Маркетинг',
    'Безопасность',
    'Исследования',
    'Новости',
    'Аналитика',
    'Будущее ИИ'
  ];

  const [formData, setFormData] = useState<Partial<BlogArticle>>({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'ИИ Технологии',
    read_time: 5,
    published: false,
    featured: false,
    meta_title: '',
    meta_description: '',
    tags: [],
    author_name: 'CosmoLab Team'
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить статьи",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zа-я0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSave = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    try {
      const slug = generateSlug(formData.title!);
      const articleData = {
        ...formData,
        slug,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt
      };

      let result;
      if (editingArticle) {
        result = await supabase
          .from('blog_articles')
          .update(articleData)
          .eq('id', editingArticle.id);
      } else {
        result = await supabase
          .from('blog_articles')
          .insert([articleData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Успех",
        description: editingArticle ? "Статья обновлена" : "Статья создана"
      });

      setEditingArticle(null);
      setShowCreateForm(false);
      resetForm();
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить статью",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Статья удалена"
      });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить статью",
        variant: "destructive"
      });
    }
  };

  const togglePublished = async (article: BlogArticle) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update({ published: !article.published })
        .eq('id', article.id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: `Статья ${!article.published ? 'опубликована' : 'снята с публикации'}`
      });
      fetchArticles();
    } catch (error) {
      console.error('Error toggling published:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус публикации",
        variant: "destructive"
      });
    }
  };

  const generateMassArticles = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-articles', {
        body: { count: 100 }
      });

      if (error) throw error;

      toast({
        title: "Успех",
        description: `Создано ${data.count} статей`
      });
      fetchArticles();
    } catch (error) {
      console.error('Error generating articles:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать статьи",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: 'ИИ Технологии',
      read_time: 5,
      published: false,
      featured: false,
      meta_title: '',
      meta_description: '',
      tags: [],
      author_name: 'CosmoLab Team'
    });
  };

  const startEdit = (article: BlogArticle) => {
    setFormData(article);
    setEditingArticle(article);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Загрузка...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold neon-text">Управление блогом</h1>
        <div className="space-x-4">
          <Button
            onClick={generateMassArticles}
            disabled={isGenerating}
            className="bg-gradient-to-r from-neon-purple to-neon-blue"
          >
            {isGenerating ? 'Генерация...' : 'Сгенерировать 100 статей'}
          </Button>
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple">
                <Plus className="w-4 h-4 mr-2" />
                Новая статья
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect">
              <DialogHeader>
                <DialogTitle>Создать статью</DialogTitle>
              </DialogHeader>
              <ArticleForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                onSave={handleSave}
                onCancel={() => {
                  setShowCreateForm(false);
                  resetForm();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Все статьи ({articles.length})</TabsTrigger>
          <TabsTrigger value="published">
            Опубликованные ({articles.filter(a => a.published).length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Черновики ({articles.filter(a => !a.published).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ArticlesList
            articles={articles}
            onEdit={startEdit}
            onDelete={handleDelete}
            onTogglePublished={togglePublished}
          />
        </TabsContent>

        <TabsContent value="published">
          <ArticlesList
            articles={articles.filter(a => a.published)}
            onEdit={startEdit}
            onDelete={handleDelete}
            onTogglePublished={togglePublished}
          />
        </TabsContent>

        <TabsContent value="drafts">
          <ArticlesList
            articles={articles.filter(a => !a.published)}
            onEdit={startEdit}
            onDelete={handleDelete}
            onTogglePublished={togglePublished}
          />
        </TabsContent>
      </Tabs>

      {editingArticle && (
        <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect">
            <DialogHeader>
              <DialogTitle>Редактировать статью</DialogTitle>
            </DialogHeader>
            <ArticleForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSave={handleSave}
              onCancel={() => {
                setEditingArticle(null);
                resetForm();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface ArticlesListProps {
  articles: BlogArticle[];
  onEdit: (article: BlogArticle) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (article: BlogArticle) => void;
}

const ArticlesList = ({ articles, onEdit, onDelete, onTogglePublished }: ArticlesListProps) => {
  return (
    <div className="grid gap-6">
      {articles.map((article) => (
        <Card key={article.id} className="glass-effect">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-xl text-neon-blue mb-2">
                  {article.title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <Badge variant="outline">{article.category}</Badge>
                  <span>{article.read_time} мин</span>
                  <span>{new Date(article.created_at).toLocaleDateString('ru-RU')}</span>
                  {article.featured && <Badge className="bg-neon-purple">Рекомендуемое</Badge>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onTogglePublished(article)}
                >
                  {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(article)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(article.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{article.excerpt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface ArticleFormProps {
  formData: Partial<BlogArticle>;
  setFormData: (data: Partial<BlogArticle>) => void;
  categories: string[];
  onSave: () => void;
  onCancel: () => void;
}

const ArticleForm = ({ formData, setFormData, categories, onSave, onCancel }: ArticleFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Заголовок *</Label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Введите заголовок статьи"
          />
        </div>
        <div>
          <Label htmlFor="category">Категория</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Краткое описание *</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Краткое описание статьи"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="content">Содержание *</Label>
        <Textarea
          id="content"
          value={formData.content || ''}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Полный текст статьи"
          rows={10}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image_url">URL изображения</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <Label htmlFor="read_time">Время чтения (мин)</Label>
          <Input
            id="read_time"
            type="number"
            value={formData.read_time || 5}
            onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.published || false}
            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
          />
          <Label>Опубликовать</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.featured || false}
            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
          />
          <Label>Рекомендуемое</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={onSave} className="bg-gradient-to-r from-neon-blue to-neon-purple">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default BlogAdmin;
