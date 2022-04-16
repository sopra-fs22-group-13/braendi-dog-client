import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import ErrorDisplay from "components/views/ErrorDisplay";

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
    </div>
  );
};

export default App;
