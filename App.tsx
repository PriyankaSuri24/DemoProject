import { AuthProvider } from './android/app/src/context/authContext';
import RootNavigator from './android/app/src/navigation/RootNavigator';


export default function App() {
  return (
    <AuthProvider >
      <RootNavigator />
    </AuthProvider>
  );
}

