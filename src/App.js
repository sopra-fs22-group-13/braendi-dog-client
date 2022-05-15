import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import ErrorDisplay from "components/views/ErrorDisplay";
import AspectRatioChecker from "components/ui/AspectRatioChecker";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
      <AppRouter/>
      <ErrorDisplay/>
      <AspectRatioChecker/>
    </div>
  );
};

export default App;
