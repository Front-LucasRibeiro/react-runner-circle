import Background from '../components/layout/Background'
import SplitLayout from '../components/layout/SplitLayout'
import RegisterForm from '../components/forms/RegisterForm'
import RegisterImageSection from '../components/layout/RegisterImageSection'

function Register({ onNavigateToLogin }) {
  return (
    <Background>
      <SplitLayout
        leftContent={<RegisterForm onNavigateToLogin={onNavigateToLogin} />}
        rightContent={<RegisterImageSection />}
      />
    </Background>
  )
}

export default Register