import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import BottomNavigation from '../components/layout/BottomNavigation'
import NewPostForm from '../components/forms/NewPostForm'

function NewPost({ onNavigateToFeed }) {
  const handleSubmit = (formData) => {
    console.log('Nova postagem:', formData)
    // Aqui seria onde salvaria os dados no backend
    // Por enquanto, só navega de volta ao feed
    onNavigateToFeed?.()
  }

  const handleCancel = () => {
    onNavigateToFeed?.()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar activeItem="feed" />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-4xl mx-auto">
            <NewPostForm 
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeItem="feed" />
    </div>
  )
}

export default NewPost