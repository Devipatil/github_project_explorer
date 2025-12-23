import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { RepositoryCard } from './components/RepositoryCard';
import { NoteModal } from './components/NoteModal';
import { Analytics } from './components/Analytics';
import { useTheme } from './hooks/useTheme';
import { searchRepositories } from './lib/github';
import { supabase } from './lib/supabase';
import { GitHubRepo, TabType, Bookmark, Note } from './types';
import { Loader2 } from 'lucide-react';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('All languages');
  const [sortBy, setSortBy] = useState('stars');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    fetchRepositories();
    fetchBookmarks();
    fetchNotes();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRepositories();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, language, sortBy, sortOrder]);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const lang = language === 'All languages' ? '' : language;
      const result = await searchRepositories(searchQuery, lang, sortBy, sortOrder);
      setRepositories(result.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookmarks:', error);
    } else {
      setBookmarks(data || []);
    }
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
    } else {
      setNotes(data || []);
    }
  };

  const isBookmarked = (repoId: number) => {
    return bookmarks.some((bookmark) => bookmark.repo_id === repoId);
  };

  const toggleBookmark = async (repo: GitHubRepo) => {
    const existingBookmark = bookmarks.find((b) => b.repo_id === repo.id);

    if (existingBookmark) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', existingBookmark.id);

      if (!error) {
        setBookmarks(bookmarks.filter((b) => b.id !== existingBookmark.id));
      }
    } else {
      const { data, error } = await supabase.from('bookmarks').insert({
        repo_id: repo.id,
        repo_name: repo.full_name,
        repo_url: repo.html_url,
        description: repo.description || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || '',
        topics: repo.topics || [],
      }).select().single();

      if (!error && data) {
        setBookmarks([data, ...bookmarks]);
      }
    }
  };

  const openNoteModal = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setNoteModalOpen(true);
  };

  const saveNote = async (content: string) => {
    if (!selectedRepo) return;

    const bookmark = bookmarks.find((b) => b.repo_id === selectedRepo.id);

    if (!bookmark) {
      await toggleBookmark(selectedRepo);
      const { data: newBookmark } = await supabase
        .from('bookmarks')
        .select()
        .eq('repo_id', selectedRepo.id)
        .single();

      if (newBookmark) {
        const { data, error } = await supabase.from('notes').insert({
          bookmark_id: newBookmark.id,
          content,
        }).select().single();

        if (!error && data) {
          setNotes([data, ...notes]);
        }
      }
    } else {
      const existingNote = notes.find((n) => n.bookmark_id === bookmark.id);

      if (existingNote) {
        const { data, error } = await supabase
          .from('notes')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('id', existingNote.id)
          .select()
          .single();

        if (!error && data) {
          setNotes(notes.map((n) => (n.id === data.id ? data : n)));
        }
      } else {
        const { data, error } = await supabase.from('notes').insert({
          bookmark_id: bookmark.id,
          content,
        }).select().single();

        if (!error && data) {
          setNotes([data, ...notes]);
        }
      }
    }
  };

  const getBookmarkedRepos = (): GitHubRepo[] => {
    return bookmarks.map((bookmark) => ({
      id: bookmark.repo_id,
      name: bookmark.repo_name.split('/')[1],
      full_name: bookmark.repo_name,
      owner: {
        login: bookmark.repo_name.split('/')[0],
        avatar_url: `https://github.com/${bookmark.repo_name.split('/')[0]}.png`,
      },
      html_url: bookmark.repo_url,
      description: bookmark.description,
      stargazers_count: bookmark.stars,
      forks_count: bookmark.forks,
      open_issues_count: 0,
      language: bookmark.language,
      topics: bookmark.topics,
      updated_at: bookmark.created_at,
      created_at: bookmark.created_at,
    }));
  };

  const displayedRepos = activeTab === 'bookmarks' ? getBookmarkedRepos() : repositories;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {activeTab !== 'analytics' && <Hero />}

      {activeTab === 'analytics' ? (
        <Analytics repositories={repositories} />
      ) : (
        <>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            language={language}
            onLanguageChange={setLanguage}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            resultCount={displayedRepos.length}
          />

          <div className="max-w-7xl mx-auto px-6 pb-12">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayedRepos.map((repo) => (
                  <RepositoryCard
                    key={repo.id}
                    repo={repo}
                    isBookmarked={isBookmarked(repo.id)}
                    onToggleBookmark={() => toggleBookmark(repo)}
                    onAddNote={() => openNoteModal(repo)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <NoteModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSave={saveNote}
        repoName={selectedRepo?.full_name || ''}
        initialContent={
          selectedRepo
            ? notes.find(
                (n) =>
                  n.bookmark_id ===
                  bookmarks.find((b) => b.repo_id === selectedRepo.id)?.id
              )?.content || ''
            : ''
        }
      />
    </div>
  );
}

export default App;
