import { User, Content, Movie, Series, Recommendation, RecommendationCriteria, ProcessedPreferences } from '../models';

export class RecommendationService {
  // Gerar recomendações para um usuário específico
  static generateRecommendationsForUser(user: User): Recommendation[] {
    const criteria = new RecommendationCriteria();
    const processedPreferences = this.processUserPreferences(user);
    
    // Exemplo simples de recomendação baseada em gêneros preferidos
    const recommendations: Recommendation[] = [];
    
    // Aqui você adicionaria a lógica real de recomendação
    // Este é apenas um exemplo básico
    user.viewingHistory.forEach(history => {
      const content = history.content;
      
      // Recomendar conteúdo similar baseado em gêneros
      content.genres.forEach(genre => {
        // Simulando a busca de conteúdo por gênero
        // Em um caso real, isso viria de um banco de dados
        const similarContent = this.findContentByGenre(genre.name);
        
        if (similarContent && !this.hasUserWatched(user, similarContent)) {
          const recommendation = new Recommendation(
            user,
            similarContent,
            0.85, // score simulado
            `Recomendado porque você assistiu conteúdo do gênero ${genre.name}`
          );
          
          recommendations.push(recommendation);
        }
      });
    });
    
    return recommendations;
  }
  
  // Processar preferências do usuário
  private static processUserPreferences(user: User): ProcessedPreferences {
    const preferences = new ProcessedPreferences();
    
    // Processar gêneros preferidos
    user.preference.genres.forEach(genre => {
      preferences.genreWeights.set(genre.genreId, 1.0);
    });
    
    // Processar atores preferidos
    user.preference.actors.forEach(actor => {
      preferences.actorAffinities.set(actor.actorId, 1.0);
    });
    
    return preferences;
  }
  
  // Método simulado para encontrar conteúdo por gênero
  private static findContentByGenre(genreName: string): Content | null {
    // Simulação - em um caso real, isso viria do banco de dados
    const mockMovie = new Movie(
      "Filme Recomendado",
      "Um filme baseado no seu gênero preferido",
      new Date(),
      120,
      4.5,
      "Estúdio Exemplo",
      1000000
    );
    
    return mockMovie;
  }
  
  // Verificar se o usuário já assistiu o conteúdo
  private static hasUserWatched(user: User, content: Content): boolean {
    return user.viewingHistory.some(history => 
      history.content.contentId === content.contentId
    );
  }
} 