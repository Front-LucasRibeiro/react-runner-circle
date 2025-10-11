import FeedIcon from '@mui/icons-material/Feed'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

function BottomNavigation({ activeItem = 'feed', onItemClick }) {
  const getIcon = (iconId) => {
    const iconProps = { className: "w-6 h-6" }
    switch (iconId) {
      case 'feed': return <FeedIcon {...iconProps} />
      case 'profile': return <PersonIcon {...iconProps} />
      case 'logout': return <LogoutIcon {...iconProps} />
      default: return null
    }
  }

  const menuItems = [
    { id: 'feed', label: 'Feed' },
    { id: 'profile', label: 'Perfil' },
    { id: 'logout', label: 'Logout' }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-graphite text-white border-t border-gray-700">
      <div className="flex items-center justify-around py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`flex flex-col items-center py-2 px-4 ${
              activeItem === item.id 
                ? 'text-brand-green-lime' 
                : 'text-gray-400'
            }`}
          >
            <div className="mb-1">{getIcon(item.id)}</div>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation