import { useApp } from '../context/AppContext';

export default function LinkIcon({ iconUrl, name, fallbackIcon = '🔗' }) {
  const { theme } = useApp();
  
  // Adjust icon color based on theme
  const getIconUrl = () => {
    if (!iconUrl) return null;
    
    // If the URL already has a color parameter, return as is
    if (iconUrl.includes('?') || !iconUrl.includes('simpleicons.org')) {
      return iconUrl;
    }
    
    // For simple icons, adjust color based on theme
    const parts = iconUrl.split('/');
    const lastPart = parts[parts.length - 1];
    
    // If already has a color, keep it
    if (lastPart && lastPart !== parts[parts.length - 2]) {
      return iconUrl;
    }
    
    // Add theme-appropriate color
    const color = theme === 'dark' ? 'white' : '000000';
    return `${iconUrl}/${color}`;
  };

  const finalIconUrl = getIconUrl();

  return (
    <>
      {finalIconUrl && (
        <img 
          src={finalIconUrl}
          alt={name}
          className="link-icon-img"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = 'block';
            }
          }}
        />
      )}
      <span 
        className="link-icon-fallback" 
        style={{ display: finalIconUrl ? 'none' : 'block' }}
      >
        {fallbackIcon}
      </span>
    </>
  );
}

// Made with Bob
