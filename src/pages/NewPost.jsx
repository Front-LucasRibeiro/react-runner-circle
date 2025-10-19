import { useMutation } from "@apollo/client";
import { ADD_FEED_POST } from "../../database/graphql/mutation/feed";
import {
  GET_FEED,
  GET_FEED_BY_CATEGORY,
} from "../../database/graphql/query/feed";
import NewPostForm from "../components/forms/NewPostForm";
import BottomNavigation from "../components/layout/BottomNavigation";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function NewPost({ onNavigateToFeed }) {
  /* 
    Atualizando o registro diretamente no cache com a funcão update disponivel pelo useMutation
    atualiza após uma mutation ser completa



  */

  const [addFeedPost, { loading: savingPost }] = useMutation(ADD_FEED_POST, {
    refetchQueries: [{ query: GET_FEED }, { query: GET_FEED_BY_CATEGORY }],
    update: (cache, {data: { createFeed } }) => {
      try {
        // retorna um boolean se existe ou não o cache para essa query
        const existingFeed = cache.readQuery({ query: GET_FEED });

        if(existingFeed) {
          // atualiza o cache com o novo post adicionado
          cache.writeQuery({
            query: GET_FEED,
            data: {
              feed: [createFeed, ...existingFeed.feed],
            },
          });
        }
      } catch (error) {
        console.log('Cache update error:', error);
      }

      try {
        // Lendo a categoria nova que foi adicionada, para verificar se existe uma query com está categoria no cache
				const existingCategoryFeed = cache.readQuery({
					query: GET_FEED_BY_CATEGORY,
					variables: { category: createFeed.category },
				});
				if (existingCategoryFeed) {
					cache.writeQuery({
						query: GET_FEED_BY_CATEGORY,
						variables: { category: createFeed.category },
						data: {
							feedByCategory: [createFeed, ...existingCategoryFeed.feedByCategory],
						},
					});
				}
			} catch (error) {
				console.log('Category cache update error:', error);
			}
    },
  });

  const handleSubmit = async (formData) => {
    // criando estrutura do objeto que será postado pela mutation
    try {
      const formParam = {
        user: {
          id: 1,
          name: "Pedro Mello",
        },
        time: parseInt(formData.tempo) * 60,
        stats: {
          distance: formData.distancia + " Km",
          calories: formData.calorias,
          heartRate: formData.bpm + " BPM",
        },
        category: formData.tipoTreino,
        description: formData.descricao,
        timestamp: new Date().toISOString(),
      };

      await addFeedPost({ variables: formParam });
    } catch (error) {
      console.error("Erro ao salvar treino:", error);
    }
    onNavigateToFeed?.();
  };

  const handleCancel = () => {
    onNavigateToFeed?.();
  };

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
              loading={savingPost}
            />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeItem="feed" />
    </div>
  );
}

export default NewPost;
