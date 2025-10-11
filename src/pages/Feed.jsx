import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_FEED,
  GET_FEED_BY_CATEGORY,
} from "../../database/graphql/query/feed";
import BottomNavigation from "../components/layout/BottomNavigation";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Dropdown from "../components/ui/Dropdown";
import FloatingActionButton from "../components/ui/FloatingActionButton";
import WorkoutCard from "../components/ui/WorkoutCard";
import ErrorMessage from "../components/ui/ErrorMessage";

function Feed({ onNavigateToNewPost, onNavigateToProfile, onLogout }) {
  const [activeItem, setActiveItem] = useState("feed");
  const [workouts, setWorkouts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // recebendo os estados da requisição e dados
  // mapeamento se for GET_FEED_BY_CATEGORY envia parametros, se for GET_FEED envia vazio
  const { loading, error, data } = useQuery(
    selectedCategory ? GET_FEED_BY_CATEGORY : GET_FEED,
    {
      variables: selectedCategory ? { category: selectedCategory } : {},
    }
  );

  const categoryOptions = [
    { value: "", label: "Todos" },
    { value: "corrida", label: "Corrida" },
    { value: "caminhada", label: "Caminhada" },
  ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);
    console.log("Menu clicked:", itemId);

    if (itemId === "profile") {
      onNavigateToProfile?.();
    } else if (itemId === "logout") {
      onLogout?.();
    }
  };

  useEffect(() => {
    if (data?.allFeeds) {
      const fetchWorkouts = async () => {
        const normalizedWorkouts = data.allFeeds.map((item) => {
          if (item.workout) {
            return {
              id: item.id,
              ...item.workout,
            };
          }
          return item;
        });
        setWorkouts(normalizedWorkouts);
      };

      fetchWorkouts();
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="md:flex">
        {/* Desktop Sidebar */}
        <Sidebar activeItem={activeItem} onItemClick={handleMenuClick} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-brand-graphite mb-6 hidden md:block">
              Feed de Treinos
            </h1>

            <Dropdown
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Selecione uma categoria"
              className="mb-6"
            />

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Carregando treinos...</div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <ErrorMessage
                message="Erro ao carregar os treinos"
                error={error.message}
              />
            )}

            {/* Workout Cards Grid */}
            {!loading && !error && workouts && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeItem={activeItem} onItemClick={handleMenuClick} />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={onNavigateToNewPost} />
    </div>
  );
}

export default Feed;
