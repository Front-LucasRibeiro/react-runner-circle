import Background from '../components/layout/Background'
import SplitLayout from '../components/layout/SplitLayout'
import LoginForm from '../components/forms/LoginForm'
import ImageSection from '../components/layout/ImageSection'

function Login({ onNavigateToRegister, onNavigateToFeed }) {
  return (
    <Background>
      <SplitLayout
        leftContent={<LoginForm onNavigateToRegister={onNavigateToRegister} onNavigateToFeed={onNavigateToFeed} />}
        rightContent={<ImageSection />}
      />
    </Background>
  )
}

export default Login