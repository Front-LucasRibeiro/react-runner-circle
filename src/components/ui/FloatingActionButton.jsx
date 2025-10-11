import AddIcon from '@mui/icons-material/Add'

function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 md:bottom-6 right-6 w-14 h-14 bg-brand-green-lime text-brand-graphite rounded-full shadow-lg hover:shadow-xl hover:bg-brand-green-medium transition-all duration-200 flex items-center justify-center z-50"
    >
      <AddIcon className="w-6 h-6" />
    </button>
  )
}

export default FloatingActionButton